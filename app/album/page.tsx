"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { hasAccessCookie } from "@/lib/clientAccess";

type Lang = "uk" | "en";

export default function AlbumPage() {
  const router = useRouter();
  const [lang, setLang] = useState<Lang>("uk");
  const t = (uk: string, en: string) => (lang === "uk" ? uk : en);

  useEffect(() => {
    if (!hasAccessCookie()) {
      router.replace("/gate");
    }
  }, [router]);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 flex flex-col">
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur sticky top-0 z-10">
        <div className="max-w-5xl mx-auto flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-cyan-400 to-emerald-500" />
            <div className="flex flex-col leading-tight">
              <span className="font-semibold text-sm text-emerald-300">
                {t("Фотоальбом родини", "Family photo album")}
              </span>
              <span className="text-[11px] text-slate-400">
                {t(
                  "сторінка в підготовці, згодом тут будуть сімейні фото",
                  "page under construction, family photos will appear here later"
                )}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/"
              className="px-3 py-1 rounded-full border border-slate-700 bg-slate-900 text-[11px] text-slate-200 hover:border-cyan-400 hover:text-cyan-200 transition cursor-pointer"
            >
              {t("На головну", "Home")}
            </a>
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
        </div>
      </header>

      <section className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="max-w-md text-center border border-slate-800 bg-slate-900/70 rounded-2xl p-6">
          <p className="text-sm text-slate-200 mb-2">
            {t(
              "Фотоальбом ще порожній.",
              "The photo album is still empty."
            )}
          </p>
          <p className="text-[11px] text-slate-400">
            {t(
              "Поступово ми збиратимемо та завантажуватимемо сюди сімейні фотографії — із села Фридрихівка, Волочиська, США та інших місць, де жили Налуцишини.",
              "Over time we will collect and upload family photos here — from Frydrykhivka, Volochysk, the USA and other places where the Nalutsyshyn family lived."
            )}
          </p>
        </div>
      </section>
    </main>
  );
}
