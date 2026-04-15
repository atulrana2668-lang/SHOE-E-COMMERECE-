"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode
} from "react";

type SessionUser = {
  id: string;
  name: string;
  email: string;
};

type StoredUser = SessionUser & {
  passwordHash: string;
};

type AuthContextValue = {
  isReady: boolean;
  user: SessionUser | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
};

const ACCOUNTS_KEY = "stride-studio.accounts";
const SESSION_KEY = "stride-studio.session";

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

async function hashSecret(value: string) {
  if (typeof window === "undefined" || !window.crypto?.subtle) {
    return value;
  }

  const bytes = new TextEncoder().encode(value);
  const digest = await window.crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

function readAccounts() {
  if (typeof window === "undefined") {
    return [] as StoredUser[];
  }

  const raw = window.localStorage.getItem(ACCOUNTS_KEY);
  if (!raw) {
    return [] as StoredUser[];
  }

  try {
    return JSON.parse(raw) as StoredUser[];
  } catch {
    return [] as StoredUser[];
  }
}

function writeAccounts(accounts: StoredUser[]) {
  window.localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<SessionUser | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const raw = window.localStorage.getItem(SESSION_KEY);
    if (raw) {
      try {
        setUser(JSON.parse(raw) as SessionUser);
      } catch {
        window.localStorage.removeItem(SESSION_KEY);
      }
    }

    setIsReady(true);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      isReady,
      user,
      async login(email, password) {
        const normalizedEmail = email.trim().toLowerCase();
        const accounts = readAccounts();
        const passwordHash = await hashSecret(password);
        const existing = accounts.find(
          (account) =>
            account.email.toLowerCase() === normalizedEmail &&
            account.passwordHash === passwordHash
        );

        if (!existing) {
          throw new Error("We could not match that email and password.");
        }

        const sessionUser = {
          id: existing.id,
          name: existing.name,
          email: existing.email
        };

        window.localStorage.setItem(SESSION_KEY, JSON.stringify(sessionUser));
        setUser(sessionUser);
      },
      async register(name, email, password) {
        const cleanName = name.trim();
        const normalizedEmail = email.trim().toLowerCase();
        const accounts = readAccounts();
        const alreadyExists = accounts.some(
          (account) => account.email.toLowerCase() === normalizedEmail
        );

        if (alreadyExists) {
          throw new Error("That email is already registered.");
        }

        const passwordHash = await hashSecret(password);
        const newUser: StoredUser = {
          id: `user-${Date.now()}`,
          name: cleanName,
          email: normalizedEmail,
          passwordHash
        };

        const nextAccounts = [...accounts, newUser];
        writeAccounts(nextAccounts);

        const sessionUser = {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email
        };

        window.localStorage.setItem(SESSION_KEY, JSON.stringify(sessionUser));
        setUser(sessionUser);
      },
      logout() {
        window.localStorage.removeItem(SESSION_KEY);
        setUser(null);
      }
    }),
    [isReady, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider.");
  }

  return context;
}
