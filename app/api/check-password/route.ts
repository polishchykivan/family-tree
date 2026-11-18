// @ts-nocheck
// app/api/check-password/route.ts

import { NextRequest, NextResponse } from "next/server";

const FAMILY_PASSWORD = "family2026"; // ЗМІНИ ТУТ НА СВІЙ ПАРОЛЬ

export async function POST(req: NextRequest) {
  const { password } = await req.json();

  if (password !== FAMILY_PASSWORD) {
    return NextResponse.json(
      { error: "Невірний пароль" },
      { status: 401 }
    );
  }

  const res = NextResponse.json({ success: true });

  // httpOnly cookie (для сервера, якщо знадобиться)
  res.cookies.set("family_access", "ok", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 30 * 24 * 60 * 60,
    path: "/",
  });

  // Клієнтська cookie для JS
  res.cookies.set("family_access_client", "ok", {
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 30 * 24 * 60 * 60,
    path: "/",
  });

  return res;
}
