import { createBrowserClient } from "@supabase/ssr";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}

export function createServer() {
  let cookieStore = null;
  try {
    cookieStore = cookies();
  } catch {
    cookieStore = null;
  }

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get(name) {
          try {
            const result = cookieStore?.get?.(name);
            if (typeof result === "string") return result;
            return result?.value;
          } catch {
            // ignore
          }
          if (
            typeof document !== "undefined" &&
            typeof document.cookie === "string"
          ) {
            const match = document.cookie.match(
              new RegExp("(^|; )" + encodeURIComponent(name) + "=([^;]*)")
            );
            return match ? decodeURIComponent(match[2]) : undefined;
          }
          return undefined;
        },
        set(name, value, options) {
          try {
            if (typeof cookieStore?.set === "function") {
              cookieStore.set({ name, value, ...options });
              return;
            }
          } catch {
            // ignore
          }
          if (typeof document !== "undefined") {
            let cookie = `${encodeURIComponent(name)}=${encodeURIComponent(
              value
            )}; path=/`;
            if (options?.maxAge) cookie += `; Max-Age=${options.maxAge}`;
            if (options?.expires)
              cookie += `; Expires=${new Date(options.expires).toUTCString()}`;
            if (options?.domain) cookie += `; Domain=${options.domain}`;
            if (options?.sameSite) cookie += `; SameSite=${options.sameSite}`;
            if (options?.secure) cookie += `; Secure`;
            if (options?.httpOnly) cookie += `; HttpOnly`;
            document.cookie = cookie;
          }
        },
        remove(name, options) {
          try {
            if (typeof cookieStore?.delete === "function") {
              cookieStore.delete(name);
              return;
            }
            if (typeof cookieStore?.set === "function") {
              cookieStore.set({ name, value: "", ...options });
              return;
            }
          } catch {
            // ignore
          }
          if (typeof document !== "undefined") {
            document.cookie = `${encodeURIComponent(name)}=; Max-Age=0; path=/`;
          }
        },
      },
    }
  );
}
