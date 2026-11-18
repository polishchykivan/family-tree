// @ts-nocheck
// lib/familyRelations.ts

export type Relation =
  | { type: "spouse"; a: string; b: string }
  | { type: "parent"; parent: string; child: string };

// ПРОСТИЙ НАБІР ЗВʼЯЗКІВ ДЛЯ СТАРТУ
export const relations: Relation[] = [
  // =========================
  // БАЗОВІ ЗВʼЯЗКИ
  // =========================

  // Подружжя
  { type: "spouse", a: "p1", b: "p2" }, // Іван та Юлія
  { type: "spouse", a: "p3", b: "p4" }, // Віктор і Тетяна

  // Батьки -> діти
  { type: "parent", parent: "p3", child: "p1" }, // Віктор батько Івана
  { type: "parent", parent: "p4", child: "p1" }, // Тетяна мати Івана

  // =========================
  // ГІЛКА ЙОСИПА ТА СТЕФАНІЇ
  // =========================
  // p101 – Йосип
  // p102 – Стефанія
  // p103 – Наталія Йосипівна Дука (Налуцишина)
  // p104 – Василь Йосипович Налуцишин
  // p105 – Павло Йосипович Налуцишин
  // p106 – Феодосія Йосипівна Бараболя (Налуцишина)
  // p107 – Пелагія Йосипівна Налуцишина
  // p108 – Агафія (Гапка) Стасюк (Налуцишина)
  // p109 – Марта (Матрйона) Андрійчук (Налуцишина)

  // Подружжя: Йосип (p101) і Стефанія (p102)
  { type: "spouse", a: "p101", b: "p102" },

  // Діти Йосипа й Стефанії (кожна дитина має обох батьків)
  { type: "parent", parent: "p101", child: "p103" },
  { type: "parent", parent: "p102", child: "p103" },

  { type: "parent", parent: "p101", child: "p104" },
  { type: "parent", parent: "p102", child: "p104" },

  { type: "parent", parent: "p101", child: "p105" },
  { type: "parent", parent: "p102", child: "p105" },

  { type: "parent", parent: "p101", child: "p106" },
  { type: "parent", parent: "p102", child: "p106" },

  { type: "parent", parent: "p101", child: "p107" },
  { type: "parent", parent: "p102", child: "p107" },

  { type: "parent", parent: "p101", child: "p108" },
  { type: "parent", parent: "p102", child: "p108" },

  { type: "parent", parent: "p101", child: "p109" },
  { type: "parent", parent: "p102", child: "p109" },

  // =========================
  // ВАСИЛЬ (p104), ЙОГО ДРУЖИНА І ЇХ СИН
  // =========================
  // p104 – Василь Йосипович Налуцишин
  // p110 – Тетяна Муйсеївна Налуцишин (дружина Василя)
  // p111 – Петро Васильович Налуцишин (їхній син)

  // Подружжя: Василь (p104) і Тетяна (p110)
  { type: "spouse", a: "p104", b: "p110" },

  // Дитина Василя і Тетяни: Петро (p111)
  { type: "parent", parent: "p104", child: "p111" },
  { type: "parent", parent: "p110", child: "p111" },

    // Подружжя: Петро (p111) і Афанасія (p112)
  { type: "spouse", a: "p111", b: "p112" },

      // Діти Петра і Афанасії
  { type: "parent", parent: "p111", child: "p113" },
  { type: "parent", parent: "p112", child: "p113" },

  { type: "parent", parent: "p111", child: "p114" },
  { type: "parent", parent: "p112", child: "p114" },

  { type: "parent", parent: "p111", child: "p115" },
  { type: "parent", parent: "p112", child: "p115" },

  { type: "parent", parent: "p111", child: "p116" },
  { type: "parent", parent: "p112", child: "p116" },

  { type: "parent", parent: "p111", child: "p117" },
  { type: "parent", parent: "p112", child: "p117" },

  { type: "parent", parent: "p111", child: "p118" },
  { type: "parent", parent: "p112", child: "p118" },

// Подружжя: Петро (p105) і Наталія (p119)
{ type: "spouse", a: "p105", b: "p119" },

// Подружжя: Феодосія (p106) і Ніканор (p120)
{ type: "spouse", a: "p106", b: "p120" },

// Дитина Феодосії (p106) і Ніканора (p120): Ольга (p121)
{ type: "parent", parent: "p106", child: "p121" },
{ type: "parent", parent: "p120", child: "p121" },

// Подружжя: Ольга (p121) і Микола (p122)
{ type: "spouse", a: "p121", b: "p122" },

// Діти Ольги (p121) і Миколи (p122)
{ type: "parent", parent: "p121", child: "p123" },
{ type: "parent", parent: "p122", child: "p123" },

{ type: "parent", parent: "p121", child: "p124" },
{ type: "parent", parent: "p122", child: "p124" },

// Подружжя: Анатолій (p124) і його дружина (p125)
{ type: "spouse", a: "p124", b: "p125" },

// Подружжя Марта (p109) – Фред (p126)
{ type: "spouse", a: "p109", b: "p126" },

// Діти Марти і Фреда
{ type: "parent", parent: "p109", child: "p127" }, // вже є
{ type: "parent", parent: "p126", child: "p127" },

{ type: "parent", parent: "p109", child: "p129" }, // треба
{ type: "parent", parent: "p126", child: "p129" }, // треба

// Донька Марти (p109) і Фреда (p126): Стефанія Стелла (p130)
{ type: "parent", parent: "p109", child: "p130" },
{ type: "parent", parent: "p126", child: "p130" },

// Син Марти (p109) і Фреда (p126): Девід Ніколас (p131)
{ type: "parent", parent: "p109", child: "p131" },
{ type: "parent", parent: "p126", child: "p131" },

// Подружжя Юрій (p115) – Надія (p132)
{ type: "spouse", a: "p115", b: "p132" },

// Донька Юрія (p115) та Надії (p132): Тетяна (p133)
{ type: "parent", parent: "p115", child: "p133" },
{ type: "parent", parent: "p132", child: "p133" },

// Син Юрія (p115) та Надії (p132): Іван (p134)
{ type: "parent", parent: "p115", child: "p134" },
{ type: "parent", parent: "p132", child: "p134" },

// Подружжя: Тетяна (p133) – Віктор (p135)
{ type: "spouse", a: "p133", b: "p135" },


];
