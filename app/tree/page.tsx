"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { hasAccessCookie } from "@/lib/clientAccess";
import { familyMembers, type FamilyMember } from "@/lib/familyData";
import { relations } from "@/lib/familyRelations";

type Lang = "uk" | "en";

type MemberWithRelations = FamilyMember & {
  parents: FamilyMember[];
  children: FamilyMember[];
  spouses: FamilyMember[];
  generation: number;
  birthYearNum: number | null;
};

export default function TreePage() {
  const router = useRouter();
  const [lang, setLang] = useState<Lang>("uk");
  const t = (uk: string, en: string) => (lang === "uk" ? uk : en);

  // Захист паролем
  useEffect(() => {
    if (!hasAccessCookie()) {
      router.replace("/gate");
    }
  }, [router]);

  const membersWithRelations = useMemo<MemberWithRelations[]>(() => {
    const byId: Record<string, FamilyMember> = {};
    familyMembers.forEach((m) => {
      byId[m.id] = m;
    });

    const result: Record<string, MemberWithRelations> = {};
    familyMembers.forEach((m) => {
      let birthYearNum: number | null = null;
      if (m.birthDate) {
        const match = m.birthDate.match(/^(\d{4})/);
        if (match) {
          birthYearNum = Number(match[1]);
        }
      }

      result[m.id] = {
        ...m,
        parents: [],
        children: [],
        spouses: [],
        generation: 0,
        birthYearNum,
      };
    });

    // Наповнюємо parents / children / spouses
    relations.forEach((r) => {
      if (r.type === "spouse") {
        const a = result[r.a];
        const b = result[r.b];
        if (a && b) {
          if (!a.spouses.some((s) => s.id === b.id)) a.spouses.push(b);
          if (!b.spouses.some((s) => s.id === a.id)) b.spouses.push(a);
        }
      } else if (r.type === "parent") {
        const parent = result[r.parent];
        const child = result[r.child];
        if (parent && child) {
          if (!child.parents.some((p) => p.id === parent.id))
            child.parents.push(parent);
          if (!parent.children.some((c) => c.id === child.id))
            parent.children.push(child);
        }
      }
    });

    // ---------- Визначення поколінь з root-ом ----------
    const rootIds = ["p101"]; // Йосип як головний предок
    const queue: MemberWithRelations[] = [];

    rootIds.forEach((id) => {
      const root = result[id];
      if (root) {
        root.generation = 1;
        queue.push(root);
      }
    });

    if (queue.length === 0) {
      Object.values(result).forEach((m) => {
        if (m.parents.length === 0) {
          m.generation = 1;
          queue.push(m);
        }
      });
    }

    while (queue.length > 0) {
      const current = queue.shift()!;
      const childGen = (current.generation || 1) + 1;
      current.children.forEach((child) => {
        const c = result[child.id];
        if (c && (c.generation === 0 || c.generation > childGen)) {
          c.generation = childGen;
          queue.push(c);
        }
      });
    }

    // Вирівнюємо покоління подружжя
    Object.values(result).forEach((m) => {
      m.spouses.forEach((spouse) => {
        const s = result[spouse.id];
        if (!s) return;

        if (
          m.generation > 0 &&
          (s.generation === 0 || s.generation > m.generation)
        ) {
          s.generation = m.generation;
        }
        if (
          s.generation > 0 &&
          (m.generation === 0 || m.generation > s.generation)
        ) {
          m.generation = s.generation;
        }
      });
    });

    Object.values(result).forEach((m) => {
      if (m.generation === 0) m.generation = 1;
    });

    return Object.values(result);
  }, []);

  // Групування по поколіннях, сортування за старшинством
  const generations = useMemo(() => {
    const groups: Record<number, MemberWithRelations[]> = {};
    membersWithRelations.forEach((m) => {
      const g = m.generation || 1;
      if (!groups[g]) groups[g] = [];
      groups[g].push(m);
    });

    Object.values(groups).forEach((arr) =>
      arr.sort((a, b) => {
        if (a.birthYearNum !== null && b.birthYearNum !== null) {
          if (a.birthYearNum !== b.birthYearNum) {
            return a.birthYearNum - b.birthYearNum; // старший лівіше
          }
        }
        if (a.birthYearNum !== null && b.birthYearNum === null) return -1;
        if (a.birthYearNum === null && b.birthYearNum !== null) return 1;

        return (a.lastName + (a.middleName || "") + a.firstName).localeCompare(
          b.lastName + (b.middleName || "") + b.firstName
        );
      })
    );

    return groups;
  }, [membersWithRelations]);

  const maxGen = Math.max(...membersWithRelations.map((m) => m.generation));

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 flex flex-col">
      {/* Верхня панель */}
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur sticky top-0 z-10">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500" />
            <div className="flex flex-col leading-tight">
              <span className="font-semibold text-sm text-emerald-300">
                {t("Список поколінь", "Generation list")}
              </span>
              <span className="text-[11px] text-slate-400">
                {t(
                  "табличний вигляд: усі люди, розбиті по поколіннях",
                  "tabular view: all people grouped by generations"
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
                {t("Графічне дерево", "Graph tree")}
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
        <div className="max-w-6xl mx-auto border border-slate-800 bg-slate-900/70 rounded-2xl p-4">
          <p className="text-sm text-slate-300 mb-4 text-center">
            {t(
              "Кожен блок — це покоління. Всередині блоків люди впорядковані від старшого до молодшого.",
              "Each block is a generation. Inside, people are ordered from older to younger."
            )}
          </p>

          <div className="flex flex-col gap-6">
            {Array.from({ length: maxGen }, (_, i) => i + 1).map((gen) => {
              const members = generations[gen] || [];
              if (members.length === 0) return null;

              return (
                <div
                  key={gen}
                  className="border border-slate-800 bg-slate-900 rounded-2xl p-3"
                >
                  <h2 className="text-xs font-semibold mb-2 text-emerald-300 uppercase tracking-[0.2em] text-center">
                    {t("Покоління", "Generation")} {gen}
                  </h2>
                  <div className="flex flex-wrap justify-center gap-3">
                    {members.map((m) => (
                      <MemberBlock key={m.id} member={m} lang={lang} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}

function MemberBlock({
  member,
  lang,
}: {
  member: MemberWithRelations;
  lang: Lang;
}) {
  const router = useRouter();
  const t = (uk: string, en: string) => (lang === "uk" ? uk : en);

  const fullNameUk = `${member.firstName}${
    member.middleName ? " " + member.middleName : ""
  } ${member.lastName}`.trim();

  const fullNameEn = `${member.firstNameEn || member.firstName}${
    member.middleNameEn ? " " + member.middleNameEn : ""
  } ${member.lastNameEn || member.lastName}`.trim();

  const fullName = lang === "uk" ? fullNameUk : fullNameEn;

  const years =
    member.birthDate || member.deathDate
      ? `${member.birthDate || "?"} – ${member.deathDate || ""}`
      : "";

  const parentsLabel =
    member.parents.length > 0
      ? member.parents
          .map((p) =>
            lang === "uk"
              ? `${p.firstName}${
                  p.middleName ? " " + p.middleName : ""
                } ${p.lastName}`
              : `${p.firstNameEn || p.firstName}${
                  p.middleNameEn ? " " + p.middleNameEn : ""
                } ${p.lastNameEn || p.lastName}`
          )
          .join(", ")
      : t("немає даних", "no data");

  const childrenLabel =
    member.children.length > 0
      ? member.children
          .map((c) =>
            lang === "uk"
              ? `${c.firstName}${
                  c.middleName ? " " + c.middleName : ""
                } ${c.lastName}`
              : `${c.firstNameEn || c.firstName}${
                  c.middleNameEn ? " " + c.middleNameEn : ""
                } ${c.lastNameEn || c.lastName}`
          )
          .join(", ")
      : t("немає даних", "no data");

  const spousesLabel =
    member.spouses.length > 0
      ? member.spouses
          .map((s) =>
            lang === "uk"
              ? `${s.firstName}${
                  s.middleName ? " " + s.middleName : ""
                } ${s.lastName}`
              : `${s.firstNameEn || s.firstName}${
                  s.middleNameEn ? " " + s.middleNameEn : ""
                } ${s.lastNameEn || s.lastName}`
          )
          .join(", ")
      : t("немає даних", "no data");

  const occupation =
    member.occupationUk || member.occupationEn
      ? lang === "uk"
        ? member.occupationUk || member.occupationEn
        : member.occupationEn || member.occupationUk
      : "";

  const maiden =
    member.maidenName && member.maidenName.trim().length > 0
      ? lang === "uk"
        ? `дівоче: ${member.maidenName}`
        : `maiden: ${member.maidenNameEn || member.maidenName}`
      : "";

  function handleClick() {
    router.push(`/profiles?id=${encodeURIComponent(member.id)}`);
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="w-[260px] border bg-slate-950 rounded-xl px-3 py-2 text-[11px] shadow shadow-black/40 flex flex-col gap-1 text-left hover:border-emerald-400 hover:bg-slate-900 transition border-slate-700"
    >
      <div>
        <div className="font-semibold text-slate-50">{fullName}</div>
        <div className="text-[10px] text-slate-500">ID: {member.id}</div>
        {maiden && (
          <div className="text-[10px] text-slate-400">{maiden}</div>
        )}
        {years && (
          <div className="text-[10px] text-emerald-300">{years}</div>
        )}
        {occupation && (
          <div className="text-[10px] text-slate-400">{occupation}</div>
        )}
      </div>

      <div className="border-t border-slate-800 pt-1 mt-1 space-y-0.5">
        <div>
          <span className="font-semibold text-slate-200">
            {t("Батьки:", "Parents:")}{" "}
          </span>
          <span className="text-slate-300">{parentsLabel}</span>
        </div>
        <div>
          <span className="font-semibold text-slate-200">
            {t("Діти:", "Children:")}{" "}
          </span>
          <span className="text-slate-300">{childrenLabel}</span>
        </div>
        <div>
          <span className="font-semibold text-slate-200">
            {t("Подружжя:", "Spouses:")}{" "}
          </span>
          <span className="text-slate-300">{spousesLabel}</span>
        </div>
      </div>
    </button>
  );
}
