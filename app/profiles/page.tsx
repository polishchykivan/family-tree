"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { hasAccessCookie } from "@/lib/clientAccess";
import { familyMembers, type FamilyMember } from "@/lib/familyData";

type Lang = "uk" | "en";

export default function ProfilesPage() {
  const router = useRouter();
  const [lang, setLang] = useState<Lang>("uk");
  const [highlightedId, setHighlightedId] = useState<string | null>(null);

  const t = (uk: string, en: string) => (lang === "uk" ? uk : en);

  // Захист паролем
  useEffect(() => {
    if (!hasAccessCookie()) {
      router.replace("/gate");
    }
  }, [router]);

  // Читаємо ?id=...
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    setHighlightedId(params.get("id"));
  }, []);

  const selectedMember: FamilyMember | null = useMemo(() => {
    if (!highlightedId) return null;
    return familyMembers.find((m) => m.id === highlightedId) || null;
  }, [highlightedId]);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 flex flex-col">
      {/* Верхня панель */}
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur sticky top-0 z-10">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500" />
            <div className="flex flex-col leading-tight">
              <span className="font-semibold text-sm text-emerald-300">
                {t("Профілі родини", "Family profiles")}
              </span>
              <span className="text-[11px] text-slate-400">
                {t(
                  "детальна інформація про кожного члена сімʼї",
                  "detailed information about each family member"
                )}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Навігація як кнопки-чіпи */}
            <div className="flex items-center gap-2 text-[11px]">
              <a
                href="/tree-graph"
                className="px-3 py-1 rounded-full border border-slate-700 bg-slate-900 text-slate-200 hover:border-emerald-400 hover:text-emerald-200 transition cursor-pointer"
              >
                {t("До дерева", "Back to tree")}
              </a>
              <a
                href="/"
                className="px-3 py-1 rounded-full border border-slate-700 bg-slate-900 text-slate-200 hover:border-cyan-400 hover:text-cyan-200 transition cursor-pointer"
              >
                {t("На головну", "Home")}
              </a>
            </div>

            {/* Мова */}
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

      {/* Контент */}
      <section className="flex-1 px-4 py-6">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Обраний профіль зверху */}
          {selectedMember && (
            <div className="border border-emerald-400 rounded-2xl bg-slate-900/80 shadow-lg shadow-emerald-500/25 p-3">
              <h2 className="text-xs font-semibold text-emerald-300 uppercase tracking-[0.2em] mb-2 text-center">
                {t("Обраний профіль", "Selected profile")}
              </h2>
              <div className="max-w-xl mx-auto">
                <ProfileCard
                  member={selectedMember}
                  lang={lang}
                  highlighted={true}
                />
              </div>
            </div>
          )}

          {/* Список усіх профілів */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {familyMembers.map((m) => (
              <ProfileCard
                key={m.id}
                member={m}
                lang={lang}
                highlighted={highlightedId === m.id}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function ProfileCard(props: {
  member: FamilyMember;
  lang: Lang;
  highlighted: boolean;
}) {
  const { member, lang, highlighted } = props;

  const t = (uk?: string, en?: string) =>
    lang === "uk" ? uk || "" : en || uk || "";

  const fullName =
    lang === "uk"
      ? `${member.firstName} ${
          member.middleName ? member.middleName + " " : ""
        }${member.lastName}`
      : `${member.firstNameEn || member.firstName} ${
          member.middleNameEn ? member.middleNameEn + " " : ""
        }${member.lastNameEn || member.lastName}`;

  const years =
    member.birthDate || member.deathDate
      ? `${member.birthDate || "?"} – ${member.deathDate || ""}`
      : "";

  const birthPlace = t(member.birthPlace, member.birthPlaceEn);
  const deathPlace = t(member.deathPlace, member.deathPlaceEn);
  const burialPlace = t(member.burialPlace, member.burialPlaceEn);
  const occupation = t(member.occupationUk, member.occupationEn);
  const education = t(member.educationUk, member.educationEn);

  const cardClass =
    "border bg-slate-900/70 rounded-2xl overflow-hidden flex flex-col shadow-lg shadow-black/40 " +
    (highlighted
      ? "border-emerald-400 ring-2 ring-emerald-400/60"
      : "border-slate-800");

  const burialCoordsIsUrl =
    member.burialCoords && member.burialCoords.startsWith("http");

  return (
    <article className={cardClass}>
      {/* Фото */}
      <div className="relative w-full pt-[70%] bg-slate-800 overflow-hidden">
        {member.photo ? (
          <img
            src={member.photo}
            alt={fullName}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-slate-500 text-xs">
            {t("Немає фото", "No photo")}
          </div>
        )}
      </div>

      {/* Тіло картки */}
      <div className="p-4 flex-1 flex flex-col">
        <h2 className="text-sm font-semibold mb-0.5">{fullName}</h2>
        <p className="text-[10px] text-slate-500 mb-0.5">
          ID: {member.id}
        </p>
        {years && (
          <p className="text-[11px] text-emerald-300 mb-0.5">{years}</p>
        )}

        {birthPlace && (
          <p className="text-[11px] text-slate-400">
            {t("Місце народження", "Place of birth")}:{" "}
            <span className="text-slate-200">{birthPlace}</span>
          </p>
        )}
        {deathPlace && (
          <p className="text-[11px] text-slate-400">
            {t("Місце смерті", "Place of death")}:{" "}
            <span className="text-slate-200">{deathPlace}</span>
          </p>
        )}

        {burialPlace && (
          <p className="text-[11px] text-slate-400">
            {t("Місце поховання", "Burial place")}:{" "}
            <span className="text-slate-200">{burialPlace}</span>
          </p>
        )}
        {member.burialCoords && (
          <p className="text-[11px] text-slate-400">
            {t("Координати поховання", "Burial coordinates")}:{" "}
            {burialCoordsIsUrl ? (
              <a
                href={member.burialCoords}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-300 hover:text-emerald-200 underline"
              >
                {t("відкрити на мапі", "open in map")}
              </a>
            ) : (
              <span className="text-slate-200">
                {member.burialCoords}
              </span>
            )}
          </p>
        )}

        {occupation && (
          <p className="text-[11px] text-slate-400 mt-1">
            {t("Рід занять", "Occupation")}:{" "}
            <span className="text-slate-200">{occupation}</span>
          </p>
        )}
        {education && (
          <p className="text-[11px] text-slate-400">
            {t("Освіта", "Education")}:{" "}
            <span className="text-slate-200">{education}</span>
          </p>
        )}

        {member.shortBioUk && (
          <p className="text-xs text-slate-200 mt-2 whitespace-pre-line">
            {t(member.shortBioUk, member.shortBioEn)}
          </p>
        )}
        {member.storyUk && (
          <p className="text-[11px] text-slate-300 mt-2 whitespace-pre-line">
            {t(member.storyUk, member.storyEn)}
          </p>
        )}
        {member.notesUk && (
          <p className="text-[11px] text-slate-400 mt-2 whitespace-pre-line">
            {t(member.notesUk, member.notesEn)}
          </p>
        )}
      </div>
    </article>
  );
}

