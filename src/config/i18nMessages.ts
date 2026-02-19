export const messages = {
  sr: {
    words: {
      hello: "Zdravo Svete!",
      home: "Početna",
      chooseLanguage: "Izaberi jezik",
      install: "Instaliraj",
      notNow: "Ne sad",
      refresh: "Osveži",
      save: "Sačuvaj",
      cancel: "Otkaži",
      update: "Ažuriraj",
      updated: "Ažurirano",
      edit: "Izmeni",
      delete: "Izbriši",
      deleted: "Izbrisan",
      copyLink: "Kopiraj link",
      linkCopied: "Link kopiran",
      hideButton: "Skloni dugme",
      restore: "Povrati",
      later: "Kasnije",
      send: "Pošalji",
    },
    meta: {
      description: "Webdak Vue3 PWA šablon",
    },
    toasts: {
      upToDateToastGroup: {
        success: {
          summary: "Aplikacija je ažurirana",
          detail: "Već imate najnoviju verziju.",
        },
      },
      notificationsToastGroup: {
        danger1: {
          summary: "Nije moguće omogućiti obaveštenja.",
          detail1: "Service Worker nije podržan.",
          detail2: "Push Manager nije podržan.",
        },
        warn1: {
          summary: "Obaveštenja su blokirana.",
          detail:
            "Obaveštenja su blokirana u pretraživaču. Otvorite podešavanja sajta i ponovo ih omogućite. Ili ih resetujte pa opet kliknite na ovo isto dugme u aplikaciji.",
        },
        warn2: {
          summary: "Pokušajte ponovo.",
          detail:
            "Dozvola nije izabrana. Kliknite ponovo i odaberite 'Dozvoli' ili 'Allow'.",
        },
        warn3: {
          summary: "Obaveštenja blokirana.",
          detail: "Dozvola za obaveštenja nije odobrena.",
        },
        danger2: {
          summary: "VAPID public key nije postavljen.",
        },
        danger3: {
          summary: "Neuspešno omogućavanje obaveštenja.",
        },
        success: {
          summary: "Obaveštenja su omogućena.",
        },
      },
      installToastGroup: {
        secondary: {
          summary: "Instalirajte aplikaciju",
          detail:
            "Možete instalirati aplikaciju na svoj uređaj kako biste imali brži pristup i više mogućnosti.",
        },
        success: {
          summary: "Instalacija u toku...",
          detail:
            "Aplikacija će biti instalirana za par trenutaka i nakon toga je možete otvoriti sa početnog ekrana.",
        },
      },
      offlineToastGroup: {
        success: {
          summary: "Online",
          detail: "Ponovo ste povezani na mrežu.",
        },
        warn: {
          summary: "Offline",
          detail:
            "Trenutno niste na mreži, srećom aplikacija može da radi offline s tim što neke funkcionalnosti možda neće biti moguće dok se ponovo ne povežete na mrežu.",
        },
      },
      updatePwaToastGroup: {
        warn: {
          summary: "Nova verzija aplikacije je dostupna",
          detail:
            "Ažurirajte odmah klikom na dugme ispod (završite trenutnu radnju jer će se aplikacija sama zatvoriti i ponovo pokrenuti) ili kasnije klikom na dugme na vrhu.",
        },
        success: {
          summary: "Aplikacija je ažurirana.",
          detail: "",
        },
      },
      screenWakeLockToastGroup: {
        success: {
          summary: "Svetlo uključeno",
          detail: "Displej će sada biti osvetljen konstanto.",
        },
        error: {
          summary: "Nažalost...",
          detail:
            "Na ovom uređaju nije moguće uključiti konstanto osvetljenje.",
        },
      },
      group: {
        success: {
          summary: "",
          detail: "",
        },
      },
    },
    dialogs: {
      installFailed: {
        header: "Instalacija nije moguća u trenutnom pretraživaču.",
        text1:
          "Da biste instalirali aplikaciju na svoj uređaj, otvorite link u Google Chrome pretraživaču a zatim kliknite na {0} dugme.",
        text2:
          "Klikom na dugme ispod možete kopirate link aplikacije a zatim ga zalepiti u Google Chrome pretraživač.",
        text3:
          'Svakako možete nastaviti da koristite aplikaciju i bez instaliranja. Ako želite, klikom na dugme ispod, možete skloniti "Instaliraj" dugme.',
      },
      updateDialogConfirm: {
        header: "Ažuriranje dostupno",
        message:
          "Da li želite da ažurirate aplikaciju? Pre toga završite trenutnu radnju jer će se aplikacija sama zatvoriti i ponovo pokrenuti.",
        reject: "Kasnije",
        accept: "Ažuriraj",
      },
    },
    api: {
      noRecords: "Nema zapisa",
      noDeletedRecords: "Nema obrisanih zapisa",
      loadingFailed: "Učitavanje nije uspelo",
      changeSaved: "Izmene sačuvane",
      changeFailed: "Čuvanje izmene nije uspelo",
      deleteSuccess: "Obrisano (soft delete)",
      deleteFailed: "Brisanje nije uspelo",
      readFromIDB: "Učitaj iz IndexedDB",
      readFromSB: "Učitaj iz Supabase",
      recordRestored: "Zapis je vraćen",
      recordRestoreFailed: "Vraćanje nije uspelo",
      showDeleted: "Prikaži obrisane",
      syncOnReconnect: "Auto-sinhronizacija pri ponovnom povezivanju",
      syncDb: "Sinhronizuj bazu",
      syncSuccess: "Sinhronizacija završena.",
      syncFailed: "Sinhronizacija nije uspela.",
      writeToIDB: "Sačuvaj u IndexedDB",
      writeToIDBSuccess: "Sačuvano u IndexedDB",
      writeToSB: "Sačuvaj u Supabase",
      writeToSBSuccess: "Sačuvano u Supabase",
      writeToDBFailed: "Čuvanje nije uspelo",
      writeLocallySuccess: "Sačuvano lokalno, čeka sinhronizaciju",
    },
    form: {
      test: {
        fields: {
          title: "Naslov",
          body: "Poruka",
          url: "link",
          button: "Pošalji",
        },
        message: {
          success: "Push obaveštenje poslato.",
          error: "Slanje push obaveštenja nije uspelo.",
        },
      },
      validation: {
        titleRequired: "Naslov je obavezan.",
        usernameRequired: "Korisničko ime je obavezno.",
      },
    },
    aboutTitle: "Pomoć",
    aboutAppInstall: {
      title: "Instaliranje aplikacije",
      text1:
        "Za najbolje moguće korisničko iskustvo, bržu i stabilniju aplikaciju - potrebno je instalirati aplikaciju kroz Google Chrome pretraživač.",
      text2:
        "Da biste instalirali aplikaciju na svoj uređaj, otvorite link u Google Chrome pretraživaču a zatim kliknite na {0} dugme. Kada se pojavi prozor u kome se traži dozvola za instaliranje aplikacije, potrebno je da potvrdite (Potvrdi / Dozvoli / Allow / Install). Ukoliko odbijete, postupak možete ponoviti.",
      text3:
        "Klikom na dugme ispod možete kopirate link aplikacije a zatim ga zalepiti u Google Chrome pretraživač.",
      text4:
        'Ukoliko nemate Chrome pretraživač, aplikaciju možete instalirati ili dodati ikonicu/prečicu na početni ekran, i koristeći druge pretraživače (Firefox, Opera, Edge, i drugo). Potrebno je klikom na tri tačke/crtice otvoriti meni i pronaći opciju "Instaliraj" ili nešto kao "Dodaj aplikaciju/prečicu na početni ekran".',
      text5:
        'iOS: Ukoliko gore navedeni postupak ne uspe na iOS uređaju, otvorite aplikaciju u Safari pretraživaču, tapnite na dugme za deljenje (Share) i izaberite "Add to Home Screen" / "Dodaj na početni ekran".',
      text6:
        "Svakako možete nastaviti da koristite aplikaciju i bez instaliranja.",
    },
    aboutNotifications: {
      title: "Obaveštenja",
      text1:
        "Kao i svaka druga, i ova aplikacija može slati obaveštenja na vaš uređaj, ali je neophodno da to prvo odobrite klikom na ikonicu obaveštenja",
      text2:
        'potom će se pojaviti prozor u kome se traži dozvola, potrebno je da odobrite klikom na "Dozvoli" ili "Approve" ili slično.',
      text3:
        "Ukoliko su obaveštenja odbijena, možete resetovati podešavanja sajta u pretraživaču: Podešavanja > Privatnost/Bezbednost > Podešavanja sajta > {0} > Resetujte dozvole.",
      selectAppUrl: "izaberite url ove aplikacije",
    },
    aboutOffline: {
      title: "Offline režim",
      text1:
        "Aplikacije može da radi i kada nemate interneta, sve što uradite biće sačuvano na vašem uređaju a kada ponovo uspostavite vezu sa internetom aplikacija će se automatski sinhronizovati sa cloud-om.",
      text2: "Kada uđete u offline režim, pojaviće se indikator",
      text3: "koji će vam to signalizirati.",
    },
    aboutApp: {
      title: "O aplikaciji",
      text1: "Izrada PWA i web aplikacije",
    },
  },
  en: {
    words: {
      hello: "Hello World!",
      home: "Home",
      chooseLanguage: "Choose language",
      install: "Install",
      notNow: "Not now",
      refresh: "Refresh",
      save: "Save",
      cancel: "Cancel",
      update: "Update",
      updated: "Updated",
      edit: "Edit",
      delete: "Delete",
      deleted: "Deleted",
      copyLink: "Copy link",
      linkCopied: "Link copied",
      hideButton: "Hide button",
      restore: "Restore",
      later: "Later",
      send: "Send",
    },
    meta: {
      description: "Reusable Vue3 PWA template by Webdak",
    },
    toasts: {
      upToDateToastGroup: {
        success: {
          summary: "Application is updated",
          detail: "You already have the latest version.",
        },
      },
      notificationsToastGroup: {
        danger1: {
          summary: "Unable to enable notifications.",
          detail1: "Service Worker not supported.",
          detail2: "Push Manager not supported.",
        },
        warn1: {
          summary: "Notifications are blocked.",
          detail:
            "Notifications are blocked in the browser. Open the site settings and re-enable them. Or reset them and click this same button in the app again.",
        },
        warn2: {
          summary: "Try again.",
          detail:
            "Permission not selected. Click again and select 'Allow' or 'Approve'.",
        },
        warn3: {
          summary: "Notifications are blocked.",
          detail: "Notification permission not granted.",
        },
        danger2: {
          summary: "VAPID public key not set.",
        },
        danger3: {
          summary: "Failed to enable notifications.",
        },
        success: {
          summary: "Notifications are enabled.",
        },
      },
      installToastGroup: {
        secondary: {
          summary: "Install the app",
          detail:
            "You can install the app on your device for faster access and more features.",
        },
        success: {
          summary: "Installation in progress...",
          detail:
            "The application will be installed in a few moments and after that you can open it from the home screen.",
        },
      },
      offlineToastGroup: {
        success: {
          summary: "Online",
          detail: "You are reconnected to the network.",
        },
        warn: {
          summary: "Offline",
          detail:
            "You are currently offline, fortunately the app can work offline, however some functionality may not be available until you reconnect.",
        },
      },
      updatePwaToastGroup: {
        warn: {
          summary: "A new version of the app is available",
          detail:
            "Update now by clicking the button below (finish the current action as the app will close and restart itself) or later by clicking the button at the top.",
        },
        success: {
          summary: "Application is updated",
          detail: "",
        },
      },
      screenWakeLockToastGroup: {
        success: {
          summary: "Light on",
          detail: "The display will now be lit constantly.",
        },
        error: {
          summary: "Unfortunately...",
          detail:
            "It is not possible to turn on constant lighting on this device.",
        },
      },
      group: {
        success: {
          summary: "",
          detail: "",
        },
      },
    },
    dialogs: {
      installFailed: {
        header: "Installation is not possible in the current browser.",
        text1:
          "To install the application on your device, open the link in the Google Chrome browser and then click the {0} button.",
        text2:
          "By clicking the button below, you can copy the application link and then paste it into the Google Chrome browser.",
        text3:
          'You can certainly continue to use the application without installing it. If you want, you can hide the "Install" button by clicking the button below.',
      },
      updateDialogConfirm: {
        header: "Update available",
        message:
          "Do you want to update the app? Before that, finish the current action because the application will close and restart itself.",
        reject: "Later",
        accept: "Update",
      },
    },
    api: {
      noRecords: "No records",
      noDeletedRecords: "No deleted records",
      loadingFailed: "Loading failed",
      changeSaved: "Changes saved",
      changeFailed: "Failed to save changes",
      deleteSuccess: "Deleted (soft delete)",
      deleteFailed: "Deletion failed",
      readFromIDB: "Read from IndexedDB",
      readFromSB: "Read from Supabase",
      recordRestored: "Record restored",
      recordRestoreFailed: "Failed to restore record",
      showDeleted: "Show deleted",
      syncOnReconnect: "Auto-sync on reconnect",
      syncDb: "Sync DB",
      syncSuccess: "Sync successful",
      syncFailed: "Sync failed",
      writeToIDB: "Save in IndexedDB",
      writeToIDBSuccess: "Saved in IndexedDB",
      writeToSB: "Save in Supabase",
      writeToSBSuccess: "Saved in Supabase",
      writeToDBFailed: "Saving failed",
      writeLocallySuccess: "Saved locally, waiting for sync",
    },
    form: {
      test: {
        fields: {
          title: "Title",
          body: "Message",
          url: "Link",
          button: "Send",
        },
        message: {
          success: "Push notification sent.",
          error: "Failed to send push notification.",
        },
      },
      validation: {
        titleRequired: "Title is required.",
        usernameRequired: "Username is required.",
      },
    },
    aboutTitle: "Help",
    aboutAppInstall: {
      title: "Installing the application",
      text1:
        "For the best possible user experience, a faster and more stable application - it is necessary to install the application through the Google Chrome browser.",
      text2:
        "To install the application on your device, open the link in the Google Chrome browser and then click the {0} button. When a window appears asking for permission to install the application, you need to confirm (Confirm / Allow / Install). If you refuse, you can repeat the process.",
      text3:
        "By clicking the button below, you can copy the application link and then paste it into the Google Chrome browser.",
      buttonLabelCopy: "Copy link",
      buttonLabelCopied: "Link copied",
      text4:
        'If you don\'t have Chrome browser, you can install the application or add an icon/shortcut to the home screen using other browsers (Firefox, Opera, Edge, etc.). You need to click on the three dots/dashes to open the menu and find the "Install" option or something like "Add application/shortcut to home screen".',
      text5:
        'iOS: If the above procedure does not work on your iOS device, open the app in the Safari browser, tap the Share button, and select "Add to Home Screen".',
      text6:
        "You can certainly continue to use the application without installing it.",
    },
    aboutNotifications: {
      title: "Notifications",
      text1:
        "Like any other application, this application can send notifications to your device, but you must first approve this by clicking on the notification icon",
      text2:
        'then a window will appear asking for permission, you need to approve by clicking "Allow" or "Approve" or similar.',
      text3:
        "If notifications are rejected, you can reset the site settings in your browser: Settings > Privacy/Security > Site Settings > {0} > Reset permissions.",
      selectAppUrl: "select this app's url",
    },
    aboutOffline: {
      title: "Offline mode",
      text1:
        "The application can work even when you don't have internet access, everything you do will be saved on your device and when you reconnect to the internet, the application will automatically sync with the cloud.",
      text2: "When you enter offline mode, an indicator will appear",
      text3: "which will signal this to you.",
    },
    aboutApp: {
      title: "About application",
      text1: "Developing PWAs and web applications by",
    },
  },
};
