"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { hasAccessCookie } from "@/lib/clientAccess";
import { familyMembers } from "@/lib/familyData";
import { relations } from "@/lib/familyRelations";

type Lang = "uk" | "en";

type FormState = {
  // ПІБ українською
  firstName: string;
  middleName: string;
  lastName: string;

  gender: string;

  birthDate: string;
  birthPlace: string;
  deathDate: string;
  deathPlace: string;
  burialPlace: string;
  burialCoords: string;

  occupationUk: string;
  occupationEn: string;

  shortBioUk: string;
  shortBioEn: string;

  notesUk: string;
  notesEn: string;

  // контакт для зворотнього зв’язку
  contact: string;
};

export default function HomePage() {
  const router = useRouter();
  const [lang, setLang] = useState<Lang>("uk");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const t = (uk: string, en: string): string => (lang === "uk" ? uk : en);

  const approxRanges: Record<number, string> = {
    1: "≈ 1860–1920",
    2: "≈ 1880–1950",
    3: "≈ 1900–1980",
    4: "≈ 1930–2000",
    5: "≈ 1960–2025",
  };

  useEffect(() => {
    if (!hasAccessCookie()) {
      router.replace("/gate");
    }
  }, [router]);

  const stats = useMemo(() => {
    const total = familyMembers.length;

    const withGender = familyMembers.filter((m) => m.gender).length;
    const males = familyMembers.filter((m) => m.gender === "male").length;
    const females = familyMembers.filter((m) => m.gender === "female").length;

    const withBirthYear = familyMembers.filter(
      (m) => m.birthDate && /^\d{4}/.test(m.birthDate)
    ).length;

    const withDeathYear = familyMembers.filter(
      (m) => m.deathDate && /^\d{4}/.test(m.deathDate)
    ).length;

    const withPhoto = familyMembers.filter((m) => m.photo && m.photo !== "")
      .length;

    const immigrants = familyMembers.filter((m) =>
      ((m.notesUk || "") +
        (m.notesEn || "") +
        (m.shortBioUk || "") +
        (m.shortBioEn || ""))
        .toLowerCase()
        .includes("іммігра")
    ).length;

    type GenNode = {
      id: string;
      parents: string[];
      children: string[];
      generation: number;
    };

    const genById: Record<string, GenNode> = {};
    familyMembers.forEach((m) => {
      genById[m.id] = {
        id: m.id,
        parents: [],
        children: [],
        generation: 0,
      };
    });

    relations.forEach((r) => {
      if (r.type === "parent") {
        const parent = genById[r.parent];
        const child = genById[r.child];
        if (parent && child) {
          if (!child.parents.includes(parent.id)) child.parents.push(parent.id);
          if (!parent.children.includes(child.id)) parent.children.push(child.id);
        }
      }
    });

    const rootId = "p101";
    if (genById[rootId]) {
      genById[rootId].generation = 1;
      const queue: GenNode[] = [genById[rootId]];
      while (queue.length > 0) {
        const current = queue.shift()!;
        const childGen = (current.generation || 1) + 1;
        current.children.forEach((childId) => {
          const child = genById[childId];
          if (!child) return;
          if (child.generation === 0 || child.generation > childGen) {
            child.generation = childGen;
            queue.push(child);
          }
        });
      }
    }

    Object.values(genById).forEach((n) => {
      if (n.generation === 0) n.generation = 1;
    });

    const generationCounts: Record<number, number> = {};
    Object.values(genById).forEach((n) => {
      const g = n.generation || 1;
      generationCounts[g] = (generationCounts[g] || 0) + 1;
    });

    const generationsList = Object.entries(generationCounts)
      .sort((a, b) => Number(a[0]) - Number(b[0]))
      .map(([gen, count]) => ({ gen: Number(gen), count }));

    return {
      total,
      withGender,
      males,
      females,
      withBirthYear,
      withDeathYear,
      withPhoto,
      immigrants,
      generationsList,
    };
  }, []);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 flex flex-col">
      {/* Верхня панель */}
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur sticky top-0 z-10">
        <div className="max-w-5xl mx-auto flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500" />
            <div className="flex flex-col leading-tight">
              <span className="font-semibold text-sm tracking-wide uppercase text-emerald-300">
                {t("Генеалогічне дерево", "Family Tree")}
              </span>
              <span className="text-xs text-slate-400">
                {t("Налуцишиних", "Nalutsyshyn family")}
              </span>
            </div>
          </div>

          {/* Перемикач мови */}
          <div className="flex items-center gap-1 text-xs bg-slate-800 rounded-full p-1">
            <button
              onClick={() => setLang("uk")}
              className={`px-3 py-1 rounded-full transition ${
                lang === "uk"
                  ? "bg-emerald-400 text-slate-900 font-semibold"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              UA
            </button>
            <button
              onClick={() => setLang("en")}
              className={`px-3 py-1 rounded-full transition ${
                lang === "en"
                  ? "bg-emerald-400 text-slate-900 font-semibold"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              EN
            </button>
          </div>
        </div>
      </header>

      {/* Контент */}
      <section className="flex-1 flex items-stretch md:items-center">
        <div className="max-w-5xl mx-auto px-4 py-10 grid md:grid-cols-2 gap-10 items-start md:items-center">
          {/* Текстовий блок */}
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-emerald-300 mb-3">
              {t("Родинний проєкт", "Family project")}
            </p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight mb-4">
              {t(
                "Генеалогічне дерево родини Налуцишиних з Фридрихівки",
                "Genealogical tree of the Nalutsyshyn family from Frydrykhivka"
              )}
            </h1>
            <p className="text-slate-300 text-sm md:text-base mb-6 max-w-xl whitespace-pre-line">
              {t(
                "Сайт для нашої родини: дерево до шести поколінь, розгорнуті профілі з фотографіями, датами, історіями.\nДоступ лише за сімейним паролем.",
                "A website for our family: a six-generation tree, detailed profiles with photos, dates and stories.\nAccess only with a shared family password."
              )}
            </p>

            {/* Кнопки */}
            <div className="flex flex-col gap-3">
              <Link
                href="/tree-graph"
                className="px-6 py-3 rounded-full bg-emerald-400 text-slate-900 font-semibold text-sm shadow-lg shadow-emerald-500/25 hover:bg-emerald-300 transition text-center"
              >
                {t("Переглянути дерево", "View family tree")}
              </Link>

              <div className="flex flex-wrap justify-center gap-3">
                <Link
                  href="/profiles"
                  className="min-w-[140px] px-4 py-2.5 rounded-full border border-slate-600 text-slate-100 text-sm hover:border-emerald-400 hover:text-emerald-200 transition text-center"
                >
                  {t("Профілі родини", "Family profiles")}
                </Link>
                <Link
                  href="/album"
                  className="min-w-[140px] px-4 py-2.5 rounded-full border border-slate-700 text-slate-200 text-sm hover:border-cyan-400 hover:text-cyan-200 transition text-center"
                >
                  {t("Фотоальбом", "Photo album")}
                </Link>
                <Link
                  href="/tree"
                  className="min-w-[140px] px-4 py-2.5 rounded-full border border-slate-700 text-slate-200 text-sm hover:border-slate-400 hover:text-slate-100 transition text-center"
                >
                  {t("Список поколінь", "Generation list")}
                </Link>
              </div>

              {/* Кнопка відкриття форми */}
              <div className="mt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  className="inline-flex items-center px-4 py-2 rounded-full bg-slate-800 text-slate-100 text-xs border border-slate-600 hover:border-emerald-400 hover:text-emerald-200 transition"
                >
                  {t(
                    "Додати / уточнити дані про людину",
                    "Add / correct information about a person"
                  )}
                </button>
                <p className="text-[10px] text-slate-500 mt-1 max-w-xs">
                  {t(
                    "Якщо ви бачите неточності або хочете додати своїх родичів — надішліть нам ці дані.",
                    "If you see inaccuracies or want to add relatives, send us the data."
                  )}
                </p>
              </div>
            </div>

            <p className="mt-6 text-xs text-slate-500 max-w-md">
              {t(
                "Основне дерево доступне у вигляді схеми з лініями. Додатково є список поколінь, профілі з історіями та фотоальбом.",
                "The main tree is shown as a diagram with lines. Additionally, there is a generation list, detailed profiles, and a photo album."
              )}
            </p>
          </div>

          {/* Блок статистики */}
          <div className="relative">
            <div className="absolute inset-0 bg-emerald-500/20 blur-3xl -z-10" />
            <div className="rounded-3xl border border-slate-800 bg-slate-900/60 backdrop-blur p-5 shadow-2xl shadow-black/40">
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs font-medium text-slate-300">
                  {t("Статистика родини", "Family statistics")}
                </span>
                <span className="text-[10px] px-2 py-1 rounded-full bg-slate-800 text-slate-300">
                  {t("на основі внесених профілів", "based on entered profiles")}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-[11px] text-slate-200 mb-4">
                <StatBox
                  label={t("Загалом людей", "Total people")}
                  value={String(stats.total)}
                  accent="emerald"
                />
                <StatBox
                  label={t("Стать відома", "Gender known")}
                  value={`${stats.withGender}/${stats.total}`}
                  sub={t(
                    `Чол: ${stats.males}, Жін: ${stats.females}`,
                    `M: ${stats.males}, F: ${stats.females}`
                  )}
                  accent="cyan"
                />
                <StatBox
                  label={t("Є рік нар.", "Birth year set")}
                  value={`${stats.withBirthYear}/${stats.total}`}
                  accent="slate"
                />
                <StatBox
                  label={t("Є рік смерті", "Death year set")}
                  value={`${stats.withDeathYear}/${stats.total}`}
                  accent="slate"
                />
                <StatBox
                  label={t("Є фото", "With photo")}
                  value={`${stats.withPhoto}/${stats.total}`}
                  accent="emerald"
                />
                <StatBox
                  label={t("Мають згадку про імміграцію", "Mention immigration")}
                  value={String(stats.immigrants)}
                  accent="cyan"
                />
              </div>

              <div className="mt-2 border-t border-slate-800 pt-2">
                <div className="text-[10px] text-slate-400 mb-1">
                  {t(
                    "Розподіл людей по поколіннях (від кореня p101)",
                    "People per generation (from root p101)"
                  )}
                </div>
                <ul className="text-[11px] text-slate-200 space-y-0.5">
                  {stats.generationsList.map((g) => (
                    <li
                      key={g.gen}
                      className="flex justify-between gap-2 border-b border-slate-800/40 pb-0.5 last:border-b-0"
                    >
                      <span>
                        {t("Покоління", "Generation")} {g.gen}
                        {approxRanges[g.gen]
                          ? ` — ${approxRanges[g.gen]}`
                          : ""}
                      </span>
                      <span className="text-slate-400">×{g.count}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <p className="mt-4 text-[10px] text-slate-500">
                {t(
                  "Ці цифри автоматично оновлюються, коли ви додаєте нові профілі або доповнюєте існуючі.",
                  "These numbers update automatically as you add or enrich profiles."
                )}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Футер з контактами адміністратора */}
      <footer className="border-t border-slate-800 py-3 text-[11px] text-slate-500">
        <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row items-start justify-between gap-2">
          <span>
            {t(
              "Цей сайт приватний. Пароль та посилання не варто публікувати відкрито.",
              "This website is private. Please do not publish the link and password publicly."
            )}
          </span>

          <div className="text-slate-400 text-[11px]">
            <div className="font-semibold text-slate-300">
              {t("Звʼязок з адміністратором сайту", "Contact the site admin")}
            </div>
            <div>
              Email:{" "}
              <a
                href="mailto:polishchyk.ivan@gmail.com"
                className="text-emerald-300 hover:text-emerald-200 hover:underline"
              >
                polishchyk.ivan@gmail.com
              </a>
            </div>
            <div>
              WhatsApp:{" "}
              <a
                href="https://wa.me/380978406006"
                target="_blank"
                rel="noreferrer"
                className="text-emerald-300 hover:text-emerald-200 hover:underline"
              >
                +380 97 840 6006
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Модальне вікно форми */}
      <ContributeModal open={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </main>
  );
}

function StatBox({
  label,
  value,
  sub,
  accent,
}: {
  label: string;
  value: string;
  sub?: string;
  accent: "emerald" | "cyan" | "slate";
}) {
  const accentColor =
    accent === "emerald"
      ? "text-emerald-300"
      : accent === "cyan"
      ? "text-cyan-300"
      : "text-slate-200";

  return (
    <div className="border border-slate-800 rounded-2xl bg-slate-950/70 px-3 py-2">
      <div className="text-[10px] text-slate-400 mb-1">{label}</div>
      <div className={`text-sm font-semibold ${accentColor}`}>{value}</div>
      {sub && <div className="text-[10px] text-slate-500 mt-0.5">{sub}</div>}
    </div>
  );
}

/* Модалка з двомовною формою без ПІБ латиницею */
function ContributeModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [form, setForm] = useState<FormState>({
    firstName: "",
    middleName: "",
    lastName: "",

    gender: "",

    birthDate: "",
    birthPlace: "",
    deathDate: "",
    deathPlace: "",
    burialPlace: "",
    burialCoords: "",

    occupationUk: "",
    occupationEn: "",

    shortBioUk: "",
    shortBioEn: "",

    notesUk: "",
    notesEn: "",

    contact: "",
  });

  // Закриття по ESC
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  const handleChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  > = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit: React.FormEventHandler = (e) => {
    e.preventDefault();

    // Мінімальна валідація
    if (!form.firstName.trim() || !form.lastName.trim()) {
      alert(
        "Будь ласка, вкажіть хоча б імʼя та прізвище.\n" +
          "Please provide at least first and last name."
      );
      return;
    }

    if (!form.contact.trim()) {
      alert(
        "Будь ласка, вкажіть контакт для зворотнього звʼязку (email або телефон).\n" +
          "Please provide a contact (email or phone) so we can reply."
      );
      return;
    }

    console.log("Family data submission:", form);

    alert(
      "Дякуємо! Дані надіслані. Ми опрацюємо їх і, за можливості, додамо до дерева.\nThank you! Your data has been submitted and will be reviewed."
    );

    onClose();
  };

  const dialogTitleId = "contribute-modal-title";

  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center bg-black/70"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="relative w-full max-w-3xl mx-4 max-h-[90vh] overflow-y-auto rounded-2xl bg-slate-950 border border-slate-800 shadow-2xl shadow-black/70 p-4 sm:p-6 text-sm text-slate-100"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby={dialogTitleId}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-2 right-2 text-slate-400 hover:text-white text-xs"
          aria-label="Закрити модальне вікно / Close dialog"
        >
          ✕
        </button>

        <h2
          id={dialogTitleId}
          className="text-lg font-semibold text-slate-50 mb-3"
        >
          Доповнити / уточнити дані про людину
          <span className="block text-xs text-slate-400">
            Provide or correct information about a person
          </span>
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* ПІБ українською */}
          <div>
            <div className="font-medium mb-1">
              Імʼя, по батькові, прізвище (укр) / Full name (Ukrainian)
            </div>
            <div className="grid sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs text-slate-400 mb-1">
                  Імʼя / First name (UA)
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  className="w-full rounded-md bg-slate-800 border border-slate-700 px-2 py-1"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1">
                  По батькові / Middle (patronymic, UA)
                </label>
                <input
                  type="text"
                  name="middleName"
                  value={form.middleName}
                  onChange={handleChange}
                  className="w-full rounded-md bg-slate-800 border border-slate-700 px-2 py-1"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1">
                  Прізвище / Last name (UA)
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  className="w-full rounded-md bg-slate-800 border border-slate-700 px-2 py-1"
                />
              </div>
            </div>
          </div>

          {/* Стать, дати, місця */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-slate-400 mb-1">
                Стать / Gender
              </label>
              <select
                name="gender"
                value={form.gender}
                onChange={handleChange}
                className="w-full rounded-md bg-slate-800 border border-slate-700 px-2 py-1"
              >
                <option value="">обрати / select</option>
                <option value="male">чоловіча / male</option>
                <option value="female">жіноча / female</option>
                <option value="other">інше / unknown</option>
              </select>

              <label className="block text-xs text-slate-400 mb-1 mt-3">
                Дата народження / Birth date
              </label>
              <input
                type="text"
                name="birthDate"
                value={form.birthDate}
                onChange={handleChange}
                placeholder="напр. 1901-05-12 або 1901"
                className="w-full rounded-md bg-slate-800 border border-slate-700 px-2 py-1"
              />

              <label className="block text-xs text-slate-400 mb-1 mt-3">
                Місце народження / Birth place
              </label>
              <input
                type="text"
                name="birthPlace"
                value={form.birthPlace}
                onChange={handleChange}
                placeholder="село/місто, країна / town, country"
                className="w-full rounded-md bg-slate-800 border border-slate-700 px-2 py-1"
              />
            </div>

            <div>
              <label className="block text-xs text-slate-400 mb-1">
                Дата смерті / Death date
              </label>
              <input
                type="text"
                name="deathDate"
                value={form.deathDate}
                onChange={handleChange}
                placeholder="напр. 1978 або 1978-02"
                className="w-full rounded-md bg-slate-800 border border-slate-700 px-2 py-1"
              />

              <label className="block text-xs text-slate-400 mb-1 mt-3">
                Місце смерті / Death place
              </label>
              <input
                type="text"
                name="deathPlace"
                value={form.deathPlace}
                onChange={handleChange}
                placeholder="місто, країна / city, country"
                className="w-full rounded-md bg-slate-800 border border-slate-700 px-2 py-1"
              />

              <label className="block text-xs text-slate-400 mb-1 mt-3">
                Місце поховання / Burial place
              </label>
              <input
                type="text"
                name="burialPlace"
                value={form.burialPlace}
                onChange={handleChange}
                placeholder="цвинтар, місто, країна / cemetery, town, country"
                className="w-full rounded-md bg-slate-800 border border-slate-700 px-2 py-1"
              />

              <label className="block text-xs text-slate-400 mb-1 mt-3">
                Координати поховання / Burial coordinates or map link
              </label>
              <input
                type="text"
                name="burialCoords"
                value={form.burialCoords}
                onChange={handleChange}
                placeholder="GPS або посилання на мапу / GPS or map link"
                className="w-full rounded-md bg-slate-800 border border-slate-700 px-2 py-1"
              />
            </div>
          </div>

          {/* Рід занять */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-slate-400 mb-1">
                Рід занять (укр) / Occupation (UA)
              </label>
              <input
                type="text"
                name="occupationUk"
                value={form.occupationUk}
                onChange={handleChange}
                placeholder="напр. вчитель, агроном..."
                className="w-full rounded-md bg-slate-800 border border-slate-700 px-2 py-1"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">
                Occupation (EN)
              </label>
              <input
                type="text"
                name="occupationEn"
                value={form.occupationEn}
                onChange={handleChange}
                placeholder="e.g. teacher, engineer..."
                className="w-full rounded-md bg-slate-800 border border-slate-700 px-2 py-1"
              />
            </div>
          </div>

          {/* Коротка біографія */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-slate-400 mb-1">
                Коротка біографія (укр) / Short bio (UA)
              </label>
              <textarea
                name="shortBioUk"
                value={form.shortBioUk}
                onChange={handleChange}
                rows={3}
                className="w-full rounded-md bg-slate-800 border border-slate-700 px-2 py-1"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">
                Short bio (EN)
              </label>
              <textarea
                name="shortBioEn"
                value={form.shortBioEn}
                onChange={handleChange}
                rows={3}
                className="w-full rounded-md bg-slate-800 border border-slate-700 px-2 py-1"
              />
            </div>
          </div>

          {/* Додаткові нотатки */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-slate-400 mb-1">
                Додаткові нотатки (укр) / Extra notes (UA)
              </label>
              <textarea
                name="notesUk"
                value={form.notesUk}
                onChange={handleChange}
                rows={3}
                className="w-full rounded-md bg-slate-800 border border-slate-700 px-2 py-1"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">
                Extra notes (EN)
              </label>
              <textarea
                name="notesEn"
                value={form.notesEn}
                onChange={handleChange}
                rows={3}
                className="w-full rounded-md bg-slate-800 border border-slate-700 px-2 py-1"
              />
            </div>
          </div>

          {/* Контакт для зворотнього звʼязку */}
          <div>
            <label className="block text-xs text-slate-400 mb-1">
              Контакт для зворотнього звʼязку (обовʼязково) / Contact for reply
              (required)
            </label>
            <input
              type="text"
              name="contact"
              value={form.contact}
              onChange={handleChange}
              placeholder="Email або телефон / Email or phone"
              className="w-full rounded-md bg-slate-800 border border-slate-700 px-2 py-1"
              required
            />
            <p className="text-[10px] text-slate-500 mt-1">
              Ми використаємо цей контакт лише для уточнення деталей, він не
              буде показаний на сайті. / We will use this only to clarify
              details, it will not be shown on the website.
            </p>
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 rounded-full border border-slate-600 text-slate-200 text-xs hover:border-slate-400 transition"
            >
              Закрити / Close
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 rounded-full bg-emerald-400 text-slate-900 text-xs font-semibold hover:bg-emerald-300 transition"
            >
              Надіслати / Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
