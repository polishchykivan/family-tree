"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

type Lang = "uk" | "en";

export default function GatePage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [lang, setLang] = useState<Lang>("uk");

  const t = (uk: string, en: string) => (lang === "uk" ? uk : en);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/check-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (!res.ok) {
      let message = t("Невірний пароль", "Incorrect password");
      try {
        const data = await res.json();
        if (data && data.error) message = data.error;
      } catch {}
      setError(message);
      return;
    }

    router.replace("/");
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 flex items-center justify-center px-4">
      <div className="w-full max-w-sm border border-slate-800 bg-slate-900/80 rounded-2xl p-6 shadow-xl shadow-black/40">
        {/* Верхній рядок: заголовок + перемикач мови */}
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-xl font-semibold">
            {t("Вхід на сімейний сайт", "Family site access")}
          </h1>
          <div className="flex items-center gap-1 text-[10px] bg-slate-800 rounded-full p-1">
            <button
              onClick={() => setLang("uk")}
              className={`px-2 py-0.5 rounded-full transition ${
                lang === "uk"
                  ? "bg-emerald-400 text-slate-900 font-semibold"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              UA
            </button>
            <button
              onClick={() => setLang("en")}
              className={`px-2 py-0.5 rounded-full transition ${
                lang === "en"
                  ? "bg-emerald-400 text-slate-900 font-semibold"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              EN
            </button>
          </div>
        </div>

        <p className="text-xs text-slate-400 mb-4 text-center">
          {t(
            "Введіть сімейний пароль, щоб переглядати дерево та профілі.",
            "Enter the family password to view the tree and profiles."
          )}
        </p>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-xs mb-1 text-slate-300">
              {t("Пароль", "Password")}
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full px-3 py-2 pr-14 rounded-lg bg-slate-950 border border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400/60"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={t("Введіть пароль", "Enter password")}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute inset-y-0 right-0 px-3 flex items-center text-slate-400 hover:text-slate-200 text-[10px]"
              >
                {showPassword
                  ? t("Сховати", "Hide")
                  : t("Показати", "Show")}
              </button>
            </div>
          </div>

          {error && (
            <p className="text-xs text-red-400 bg-red-950/40 border border-red-900 rounded-md px-3 py-2">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-emerald-400 text-slate-900 font-semibold text-sm py-2.5 rounded-lg hover:bg-emerald-300 transition shadow-lg shadow-emerald-500/25"
          >
            {t("Увійти", "Enter")}
          </button>
        </form>
      </div>
    </main>
  );
}
