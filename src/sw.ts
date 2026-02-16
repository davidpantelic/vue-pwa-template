/// <reference lib="webworker" />

import { precacheAndRoute } from "workbox-precaching";
import { clientsClaim } from "workbox-core";
import { registerRoute } from "workbox-routing";
import { CacheFirst, NetworkFirst } from "workbox-strategies";
import { ExpirationPlugin } from "workbox-expiration";
import { CacheableResponsePlugin } from "workbox-cacheable-response";

declare let self: ServiceWorkerGlobalScope & {
  __WB_MANIFEST: Array<{
    url: string;
    revision: string | null;
  }>;
};

const BADGE_DB = "webdak-pwa-badge";
const BADGE_STORE = "meta";
const BADGE_KEY = "count";

const openBadgeDb = () =>
  new Promise<IDBDatabase>((resolve, reject) => {
    const request = indexedDB.open(BADGE_DB, 1);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(BADGE_STORE)) {
        db.createObjectStore(BADGE_STORE);
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });

const getBadgeCount = async () => {
  const db = await openBadgeDb();
  return new Promise<number>((resolve) => {
    const tx = db.transaction(BADGE_STORE, "readonly");
    const store = tx.objectStore(BADGE_STORE);
    const req = store.get(BADGE_KEY);
    req.onsuccess = () => resolve(Number(req.result ?? 0));
    req.onerror = () => resolve(0);
  });
};

const setBadgeCount = async (count: number) => {
  const db = await openBadgeDb();
  await new Promise<void>((resolve) => {
    const tx = db.transaction(BADGE_STORE, "readwrite");
    const store = tx.objectStore(BADGE_STORE);
    store.put(count, BADGE_KEY);
    tx.oncomplete = () => resolve();
    tx.onerror = () => resolve();
  });
  const reg = self.registration as ServiceWorkerRegistration & {
    setAppBadge?: (count: number) => Promise<void>;
    clearAppBadge?: () => Promise<void>;
  };
  if (reg.setAppBadge) {
    await reg.setAppBadge(count);
  }
};

const clearBadge = async () => {
  await setBadgeCount(0);
  const reg = self.registration as ServiceWorkerRegistration & {
    clearAppBadge?: () => Promise<void>;
  };
  if (reg.clearAppBadge) {
    await reg.clearAppBadge();
  }
};

const supabaseOrigin = import.meta.env.VITE_SUPABASE_URL
  ? new URL(import.meta.env.VITE_SUPABASE_URL).origin
  : null;

precacheAndRoute(self.__WB_MANIFEST);
clientsClaim();

self.addEventListener("message", (event) => {
  if (event.data?.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
  if (event.data?.type === "CLEAR_BADGE") {
    event.waitUntil(clearBadge());
  }
});

registerRoute(
  ({ request }) => request.destination === "image",
  new CacheFirst({
    cacheName: "images",
    plugins: [
      new ExpirationPlugin({
        maxEntries: 200,
        maxAgeSeconds: 60 * 60 * 24 * 30,
      }),
      new CacheableResponsePlugin({ statuses: [0, 200] }),
    ],
  }),
);

if (supabaseOrigin) {
  registerRoute(
    ({ url }) => url.origin === supabaseOrigin,
    new NetworkFirst({
      cacheName: "api",
      networkTimeoutSeconds: 5,
      plugins: [
        new ExpirationPlugin({
          maxEntries: 100,
          maxAgeSeconds: 60 * 5,
        }),
        new CacheableResponsePlugin({ statuses: [0, 200] }),
      ],
    }),
  );
}

self.addEventListener("push", (event) => {
  event.waitUntil(
    (async () => {
      const data = event.data?.json?.() ?? {};
      const title = data.title ?? "Notification";
      const options: NotificationOptions = {
        body: data.body ?? "",
        icon: data.icon ?? "/webdak_transparent_192.png",
        badge: data.badge ?? "/webdak_badge.png",
        data: {
          url: data.url ?? "/",
        },
      };

      const nextCount = (await getBadgeCount()) + 1;
      await setBadgeCount(nextCount);
      await self.registration.showNotification(title, options);
    })(),
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const url = event.notification.data?.url ?? "/";
  const targetUrl = new URL(url, self.location.origin).href;

  event.waitUntil(
    (async () => {
      await clearBadge();
      const clientsArr = await self.clients.matchAll({
        type: "window",
        includeUncontrolled: true,
      });
      for (const client of clientsArr) {
        if ("focus" in client && client.url === targetUrl) {
          return client.focus();
        }
      }
      return self.clients.openWindow(targetUrl);
    })(),
  );
});
