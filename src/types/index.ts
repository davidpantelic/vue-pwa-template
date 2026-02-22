export type BIPEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

export type FormValues = { username?: string };
export type FormErrors = Record<string, { message: string }[]>;

export type AppRecord = {
  id: string;
  title: string;
  body?: string;
  createdAt: string;
  updatedAt: string;
  syncedAt?: string | null;
  deletedAt?: string | null;
};

export type StorageKind = "local" | "remote";

export type StorageAdapter = {
  kind: StorageKind;
  create: (record: AppRecord) => Promise<void>;
  update: (record: AppRecord) => Promise<void>;
  remove: (id: string) => Promise<void>;
  getById: (id: string) => Promise<AppRecord | null>;
  list: () => Promise<AppRecord[]>;
};

export type QueueOperation = "upsert";

export type QueueItem = {
  id: string;
  type: QueueOperation;
  record: AppRecord;
  createdAt: string;
  retries: number;
};

export type userCredentials = {
  // TODO
};

export type userRegisterCredentials = {
  username: string;
  email: string;
  password: string;
  passwordConfirm?: string;
};

export type userLoginCredentials = {
  email: string;
  password: string;
  passwordConfirm?: string;
};

export type userEditCredentials = {
  username: string;
  email: string;
};

export type passwordResetCredentials = {
  password: string;
  passwordConfirm?: string;
};
