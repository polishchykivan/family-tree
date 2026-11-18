// @ts-nocheck
// lib/clientAccess.ts

export function hasAccessCookie(): boolean {
  if (typeof document === "undefined") return false;
  return document.cookie.includes("family_access_client=ok");
}
