// @ts-nocheck
// lib/familyData.ts

export type FamilyMember = {
  id: string;

  // ПІБ українською
  firstName: string;
  middleName?: string;
  lastName: string;

  // ПІБ латиницею
  firstNameEn?: string;
  middleNameEn?: string;
  lastNameEn?: string;

  // Дошлюбне прізвище
  maidenName?: string;
  maidenNameEn?: string;

  gender?: "male" | "female" | "other";

  // Дати
  birthDate?: string;
  deathDate?: string;

  // Місця (народження/смерті)
  birthPlace?: string;
  birthPlaceEn?: string;
  deathPlace?: string;
  deathPlaceEn?: string;

  // Поховання
  burialPlace?: string;      // місце поховання (укр)
  burialPlaceEn?: string;    // місце поховання (en)
  burialCoords?: string;     // координати або URL на мапу

  // Фото
  photo?: string;
  gallery?: string[];

  // Освіта, професія
  occupationUk?: string;
  occupationEn?: string;
  educationUk?: string;
  educationEn?: string;

  // Біографія
  shortBioUk?: string;
  shortBioEn?: string;
  storyUk?: string;
  storyEn?: string;

  // Додаткові нотатки
  notesUk?: string;
  notesEn?: string;
};

// Ручний список людей. Далі будеш розширювати цим самим форматом.

export const familyMembers: FamilyMember[] = [
  {
  id: "p101",

  // Українською
  firstName: "Йосип",
  middleName: "Григорович",
  lastName: "Налуцишин",

  // Латиницею (транслітерація)
  firstNameEn: "Yosyp",
  middleNameEn: "Hryhorovych",
  lastNameEn: "Nalutsyshyn",

  maidenName: "",
  maidenNameEn: "",

  gender: "male",

  // Дати
  birthDate: "невідомо",
  deathDate: "невідомо",

  // Місця
  birthPlace: "село Фридрихівка",
  birthPlaceEn: "Frydrykhivka village",
  deathPlace: "невідомо",
  deathPlaceEn: "unknown",

  // Поховання
  burialPlace: "невідомо",
  burialPlaceEn: "unknown",
  burialCoords: "невідомо",

  // Фото
  photo: "",
  gallery: [],

  // Професія, освіта
  occupationUk: "відставний (побілетний) унтер офіцер",
  occupationEn: "retired non-commissioned officer",
  educationUk: "невідомо",
  educationEn: "unknown",

  // Біографія
  shortBioUk: "невідомо",
  shortBioEn: "unknown",
  storyUk: "невідомо",
  storyEn: "unknown",

  // Нотатки
  notesUk: "невідомо",
  notesEn: "unknown",
},
  {
  id: "p102",

  // Українською
  firstName: "Стефанія",
  middleName: "Михайлівна",
  lastName: "Налуцишина",

  // Дівоче прізвище
  maidenName: "Іваньків",
  maidenNameEn: "Ivankiv",

  // Латиницею (транслітерація)
  firstNameEn: "Stefaniia",
  middleNameEn: "Mykhailivna",
  lastNameEn: "Nalutsyshyna",

  gender: "female",

  // Дати
  birthDate: "1860-04-22",          // можна так; якщо хочеш, можеш змінити формат
  deathDate: "невідомо",

  // Місця
  birthPlace: "містечко Волочиськ",
  birthPlaceEn: "Volochysk town",
  deathPlace: "невідомо",
  deathPlaceEn: "unknown",

  // Поховання
  burialPlace: "невідомо",
  burialPlaceEn: "unknown",
  burialCoords: "невідомо",

  // Фото
  photo: "",
  gallery: [],

  // Професія, освіта
  occupationUk: "невідомо",
  occupationEn: "unknown",
  educationUk: "невідомо",
  educationEn: "unknown",

  // Біографія
  shortBioUk: "невідомо",
  shortBioEn: "unknown",
  storyUk: "невідомо",
  storyEn: "unknown",

  // Нотатки
  notesUk: "невідомо",
  notesEn: "unknown",
},
{
  id: "p103",

  // Українською
  firstName: "Наталія",
  middleName: "Йосипівна",
  lastName: "Дука",

  // Дівоче прізвище
  maidenName: "Налуцишина",
  maidenNameEn: "Nalutsyshyna",

  // Латиницею (транслітерація)
  firstNameEn: "Natalia",
  middleNameEn: "Yosypivna",
  lastNameEn: "Duka",

  gender: "female",

  // Дати
  birthDate: "1879-08-26",          // 26 Сер 1879 року
  deathDate: "невідомо",

  // Місця
  birthPlace: "село Фридрихівка",
  birthPlaceEn: "Frydrykhivka village",
  deathPlace: "невідомо",
  deathPlaceEn: "unknown",

  // Поховання
  burialPlace: "невідомо",
  burialPlaceEn: "unknown",
  burialCoords: "невідомо",

  // Фото
  photo: "",
  gallery: [],

  // Професія, освіта
  occupationUk: "невідомо",
  occupationEn: "unknown",
  educationUk: "невідомо",
  educationEn: "unknown",

  // Біографія
  shortBioUk: "невідомо",
  shortBioEn: "unknown",
  storyUk: "невідомо",
  storyEn: "unknown",

  // Нотатки
  notesUk: "невідомо",
  notesEn: "unknown",
},
{
  id: "p104",

  // Українською
  firstName: "Василь",
  middleName: "Йосипович",
  lastName: "Налуцишин",

  // Латиницею
  firstNameEn: "Vasyl",
  middleNameEn: "Yosypovych",
  lastNameEn: "Nalutsyshyn",

  gender: "male",

  // Дати
  birthDate: "1882-04-05",          // 5 квітня 1882 року
  deathDate: "невідомо",

  // Місця
  birthPlace: "село Фридрихівка",
  birthPlaceEn: "Frydrykhivka village",
  deathPlace: "невідомо",
  deathPlaceEn: "unknown",

  // Поховання
  burialPlace: "невідомо",
  burialPlaceEn: "unknown",
  burialCoords: "невідомо",

  // Фото
  photo: "",
  gallery: [],

  // Професія, освіта
  occupationUk: "невідомо",
  occupationEn: "unknown",
  educationUk: "невідомо",
  educationEn: "unknown",

  // Біографія
  shortBioUk: "невідомо",
  shortBioEn: "unknown",
  storyUk: "невідомо",
  storyEn: "unknown",

  // Нотатки
  notesUk: "невідомо",
  notesEn: "unknown",
},
{
  id: "p105",

  // Українською
  firstName: "Павло",
  middleName: "Йосипович",
  lastName: "Налуцишин",

  // Латиницею (транслітерація)
  firstNameEn: "Pavlo",
  middleNameEn: "Yosypovych",
  lastNameEn: "Nalutsyshyn",

  gender: "male",

  // Дати
  birthDate: "1887-11-04",          // 4 Лис 1887 року
  deathDate: "1965-01",             // Січень 1965 року (можна так залишити)

  // Місця
  birthPlace: "село Фридрихівка",
  birthPlaceEn: "Frydrykhivka village",
  deathPlace: "Hamtramck, Wayne, Michigan, United States",
  deathPlaceEn: "Hamtramck, Wayne, Michigan, United States",

  // Поховання
  burialPlace: "невідомо",
  burialPlaceEn: "unknown",
  burialCoords: "невідомо",

  // Фото
  photo: "",
  gallery: [],

  // Професія, освіта
  occupationUk: "невідомо",
  occupationEn: "unknown",
  educationUk: "невідомо",
  educationEn: "unknown",

  // Біографія
  shortBioUk: "невідомо",
  shortBioEn: "unknown",
  storyUk: "невідомо",
  storyEn: "unknown",

  // Нотатки
  notesUk: "Імміграція 1913 року до США. Інші деталі – невідомо.",
  notesEn: "Immigrated to the USA in 1913. Other details unknown.",
},
{
  id: "p106",

  // Українською
  firstName: "Феодосія",
  middleName: "Йосипівна",
  lastName: "Бараболя",       // теперішнє прізвище

  // Дівоче прізвище
  maidenName: "Налуцишина",
  maidenNameEn: "Nalutsyshyna",

  // Латиницею (транслітерація)
  firstNameEn: "Feodosiia",
  middleNameEn: "Yosypivna",
  lastNameEn: "Barabolia",

  gender: "female",

  // Дати
  birthDate: "1890",          // рік 1890
  deathDate: "1960",          // рік 1960

  // Місця
  birthPlace: "село Фридрихівка",
  birthPlaceEn: "Frydrykhivka village",
  deathPlace: "невідомо",
  deathPlaceEn: "unknown",

  // Поховання
  burialPlace: "невідомо",
  burialPlaceEn: "unknown",
  burialCoords: "невідомо",

  // Фото
  photo: "",
  gallery: [],

  // Професія, освіта
  occupationUk: "невідомо",
  occupationEn: "unknown",
  educationUk: "невідомо",
  educationEn: "unknown",

  // Біографія
  shortBioUk: "невідомо",
  shortBioEn: "unknown",
  storyUk: "невідомо",
  storyEn: "unknown",

  // Нотатки
  notesUk: "невідомо",
  notesEn: "unknown",
},
{
  id: "p107",

  // Українською
  firstName: "Пелагія",
  middleName: "Йосипівна",
  lastName: "Налуцишина",

  // Латиницею (транслітерація)
  firstNameEn: "Pelahiia",
  middleNameEn: "Yosypivna",
  lastNameEn: "Nalutsyshyna",

  gender: "female",

  // Дати
  birthDate: "1890-04-28",          // 28 квітня 1890 року
  deathDate: "невідомо",

  // Місця
  birthPlace: "село Фридрихівка",
  birthPlaceEn: "Frydrykhivka village",
  deathPlace: "невідомо",
  deathPlaceEn: "unknown",

  // Поховання
  burialPlace: "невідомо",
  burialPlaceEn: "unknown",
  burialCoords: "невідомо",

  // Фото
  photo: "",
  gallery: [],

  // Професія, освіта
  occupationUk: "невідомо",
  occupationEn: "unknown",
  educationUk: "невідомо",
  educationEn: "unknown",

  // Біографія
  shortBioUk: "невідомо",
  shortBioEn: "unknown",
  storyUk: "невідомо",
  storyEn: "unknown",

  // Нотатки
  notesUk: "невідомо",
  notesEn: "unknown",
},
{
  id: "p108",

  // Українською
  firstName: "Агафія (Гапка)",
  middleName: "Йосипівна",
  lastName: "Стасюк",          // теперішнє прізвище

  // Дівоче прізвище
  maidenName: "Налуцишина",
  maidenNameEn: "Nalutsyshyna",

  // Латиницею (транслітерація)
  firstNameEn: "Ahafiia (Hapka)",
  middleNameEn: "Yosypivna",
  lastNameEn: "Stasiuk",

  gender: "female",

  // Дати (роки приблизні)
  birthDate: "1894?",          // знак питання залишаємо як у тебе
  deathDate: "невідомо",

  // Місця
  birthPlace: "село Фридрихівка",
  birthPlaceEn: "Frydrykhivka village",
  deathPlace: "невідомо",
  deathPlaceEn: "unknown",

  // Поховання
  burialPlace: "невідомо",
  burialPlaceEn: "unknown",
  burialCoords: "невідомо",

  // Фото
  photo: "",
  gallery: [],

  // Професія, освіта
  occupationUk: "невідомо",
  occupationEn: "unknown",
  educationUk: "невідомо",
  educationEn: "unknown",

  // Біографія
  shortBioUk: "невідомо",
  shortBioEn: "unknown",
  storyUk: "невідомо",
  storyEn: "unknown",

  // Нотатки
  notesUk: "невідомо",
  notesEn: "unknown",
},
{
  id: "p109",

  // Українською
  firstName: "Марта (Матрйона)",
  middleName: "Йосипівна",
  lastName: "Андрійчук",        // теперішнє прізвище

  // Дівоче прізвище
  maidenName: "Налуцишина",
  maidenNameEn: "Nalutsyshyna",

  // Латиницею (транслітерація)
  firstNameEn: "Marta (Matryona)",
  middleNameEn: "Yosypivna",
  lastNameEn: "Andriichuk",

  gender: "female",

  // Дати
  birthDate: "1897-04-07",          // 7 квітня 1897 року
  deathDate: "1966-05-12",          // 12 травня 1966

  // Місця
  birthPlace: "село Фридрихівка",
  birthPlaceEn: "Frydrykhivka village",
  deathPlace: "Vassar, Tuscola, Michigan, United States",
  deathPlaceEn: "Vassar, Tuscola, Michigan, United States",

  // Поховання
  burialPlace: "Vassar, Tuscola, Michigan, United States of America",
  burialPlaceEn: "Vassar, Tuscola, Michigan, United States of America",
  burialCoords: "невідомо",

  // Фото
  photo: "",
  gallery: [],

  // Професія, освіта
  occupationUk: "невідомо",
  occupationEn: "unknown",
  educationUk: "невідомо",
  educationEn: "unknown",

  // Біографія
  shortBioUk: "Імміграція до США у 1912 році (штат Вермонт). Інші деталі біографії – невідомо.",
  shortBioEn: "Immigrated to the USA in 1912 (Vermont). Other biographical details are unknown.",
  storyUk: "невідомо",
  storyEn: "unknown",

  // Нотатки
  notesUk: "невідомо",
  notesEn: "unknown",
},
{
  id: "p110",

  // Українською
  firstName: "Тетяна",
  middleName: "Муйсеївна",
  lastName: "Налуцишин",

  // Дівоче прізвище (якщо дізнаєшся — оновиш)
  maidenName: "невідомо",
  maidenNameEn: "unknown",

  // Латиницею (транслітерація)
  firstNameEn: "Tetiana",
  middleNameEn: "Muiseivna",
  lastNameEn: "Nalutsyshyn",

  gender: "female",

  // Дати (відомі тільки роки)
  birthDate: "1885",
  deathDate: "1959",

  // Місця
  birthPlace: "невідомо",
  birthPlaceEn: "unknown",
  deathPlace: "місто Волочиськ",
  deathPlaceEn: "Volochysk town",

  // Поховання
  burialPlace: "місто Волочиськ",
  burialPlaceEn: "Volochysk town",
  burialCoords: "невідомо",

  // Фото
  photo: "",
  gallery: [],

  // Професія, освіта
  occupationUk: "невідомо",
  occupationEn: "unknown",
  educationUk: "невідомо",
  educationEn: "unknown",

  // Біографія
  shortBioUk: "Дружина Василя Йосиповича Налуцишина. Інші деталі біографії невідомі.",
  shortBioEn: "Wife of Vasyl Yosypovych Nalutsyshyn. Other biographical details are unknown.",
  storyUk: "невідомо",
  storyEn: "unknown",

  // Нотатки
  notesUk: "невідомо",
  notesEn: "unknown",
},
{
  id: "p111",

  // Українською
  firstName: "Петро",
  middleName: "Васильович",
  lastName: "Налуцишин",

  // Дівоче прізвище не актуальне (чоловік)
  maidenName: "",
  maidenNameEn: "",

  // Латиницею (транслітерація)
  firstNameEn: "Petro",
  middleNameEn: "Vasylovych",
  lastNameEn: "Nalutsyshyn",

  gender: "male",

  // Дати
  birthDate: "1902-12-12", // 12 грудня 1902
  deathDate: "1944-08-21", // 21 серпня 1944

  // Місця
  birthPlace: "село Фридрихівка",
  birthPlaceEn: "Frydrykhivka village",
  deathPlace: "Польща, Краківське воєводство, село Гровля",
  deathPlaceEn: "Grewla village, Kraków Voivodeship, Poland",
  burialPlace: "Польща, Краківське воєводство, село Гровля",
  burialPlaceEn: "Grewla village, Kraków Voivodeship, Poland",
  burialCoords: "невідомо",

  // Фото
  photo: "",
  gallery: [],

  // Професія, освіта
  occupationUk: "невідомо",
  occupationEn: "unknown",
  educationUk: "невідомо",
  educationEn: "unknown",

  // Біографія
  shortBioUk: "Син Василя Йосиповича та Тетяни Муйсеївни Налуцишиних. Інші деталі біографії невідомі.",
  shortBioEn: "Son of Vasyl Yosypovych and Tetiana Muiseivna Nalutsyshyn. Other biographical details are unknown.",
  storyUk: "невідомо",
  storyEn: "unknown",

  // Нотатки
  notesUk: "невідомо",
  notesEn: "unknown",
},
{
  id: "p112",

  // Українською
  firstName: "Афанасія",
  middleName: "Василівна",
  lastName: "Налуцишин",      // теперішнє прізвище (по чоловіку)

  // Дівоче прізвище
  maidenName: "Трачук",
  maidenNameEn: "Trachuk",

  // Латиницею (транслітерація)
  firstNameEn: "Afanasiia",
  middleNameEn: "Vasylivna",
  lastNameEn: "Nalutsyshyn",

  gender: "female",

  // Дати
  birthDate: "1902",            // тільки рік відомий
  deathDate: "1960-11-27",      // 27 листопада 1960 року

  // Місця
  birthPlace: "невідомо",
  birthPlaceEn: "unknown",
  deathPlace: "місто Волочиськ",
  deathPlaceEn: "Volochysk town",

  // Поховання
  burialPlace: "місто Волочиськ",
  burialPlaceEn: "Volochysk town",
  burialCoords: "невідомо",

  // Фото
  photo: "",
  gallery: [],

  // Професія, освіта
  occupationUk: "невідомо",
  occupationEn: "unknown",
  educationUk: "невідомо",
  educationEn: "unknown",

  // Біографія
  shortBioUk: "Дружина Петра Васильовича Налуцишина. Інші деталі біографії невідомі.",
  shortBioEn: "Wife of Petro Vasylovych Nalutsyshyn. Other biographical details are unknown.",
  storyUk: "невідомо",
  storyEn: "unknown",

  // Нотатки
  notesUk: "невідомо",
  notesEn: "unknown",
},
{
  id: "p113",

  // Українською
  firstName: "Дем'ян",
  middleName: "Петрович",
  lastName: "Налуцишин",

  // Дівоче прізвище не актуальне (чоловік)
  maidenName: "",
  maidenNameEn: "",

  // Латиницею
  firstNameEn: "Demian",
  middleNameEn: "Petrovych",
  lastNameEn: "Nalutsyshyn",

  gender: "male",

  // Дати
  birthDate: "1922",           // тільки рік
  deathDate: "невідомо",

  // Місця
  birthPlace: "село Фридрихівка",
  birthPlaceEn: "Frydrykhivka village",
  deathPlace: "місто Волочиськ",
  deathPlaceEn: "Volochysk town",

  // Поховання
  burialPlace: "місто Волочиськ",
  burialPlaceEn: "Volochysk town",
  burialCoords: "невідомо",

  // Фото
  photo: "",
  gallery: [],

  // Професія, освіта
  occupationUk: "невідомо",
  occupationEn: "unknown",
  educationUk: "невідомо",
  educationEn: "unknown",

  // Біографія
  shortBioUk: "Старший син Петра Васильовича та Афанасії Василівни Налуцишиних. Інші деталі біографії невідомі.",
  shortBioEn: "Eldest son of Petro Vasylovych and Afanasiia Vasylivna Nalutsyshyn. Other biographical details are unknown.",
  storyUk: "невідомо",
  storyEn: "unknown",

  // Нотатки
  notesUk: "невідомо",
  notesEn: "unknown",
},
{
  id: "p114",

  // Українською
  firstName: "Іван",
  middleName: "Петрович",
  lastName: "Налуцишин",

  // Дівоче прізвище не актуальне (чоловік)
  maidenName: "",
  maidenNameEn: "",

  // Латиницею
  firstNameEn: "Ivan",
  middleNameEn: "Petrovych",
  lastNameEn: "Nalutsyshyn",

  gender: "male",

  // Дати
  birthDate: "1924",           // тільки рік
  deathDate: "1953-09-30",     // 30 вересня 1953

  // Місця
  birthPlace: "село Фридрихівка",
  birthPlaceEn: "Frydrykhivka village",
  deathPlace: "місто Волочиськ",
  deathPlaceEn: "Volochysk town",

  // Поховання
  burialPlace: "місто Волочиськ",
  burialPlaceEn: "Volochysk town",
  burialCoords: "невідомо",

  // Фото
  photo: "",
  gallery: [],

  // Професія, освіта
  occupationUk: "невідомо",
  occupationEn: "unknown",
  educationUk: "невідомо",
  educationEn: "unknown",

  // Біографія
  shortBioUk: "Син Петра Васильовича та Афанасії Василівни Налуцишиних. Інші деталі біографії невідомі.",
  shortBioEn: "Son of Petro Vasylovych and Afanasiia Vasylivna Nalutsyshyn. Other biographical details are unknown.",
  storyUk: "невідомо",
  storyEn: "unknown",

  // Нотатки
  notesUk: "невідомо",
  notesEn: "unknown",
},
{
  id: "p115",

  // Українською
  firstName: "Юрій",
  middleName: "Петрович",
  lastName: "Налуцишин",

  // Дівоче прізвище не актуальне (чоловік)
  maidenName: "",
  maidenNameEn: "",

  // Латиницею
  firstNameEn: "Yurii",
  middleNameEn: "Petrovych",
  lastNameEn: "Nalutsyshyn",

  gender: "male",

  // Дати
  birthDate: "1932",      // тільки рік
  deathDate: "1987",      // тільки рік

  // Місця
  birthPlace: "село Фридрихівка",
  birthPlaceEn: "Frydrykhivka village",
  deathPlace: "місто Волочиськ",
  deathPlaceEn: "Volochysk town",

  // Поховання
  burialPlace: "місто Волочиськ",
  burialPlaceEn: "Volochysk town",
  burialCoords: "невідомо",

  // Фото
  photo: "",
  gallery: [],

  // Професія, освіта
  occupationUk: "невідомо",
  occupationEn: "unknown",
  educationUk: "невідомо",
  educationEn: "unknown",

  // Біографія
  shortBioUk: "Син Петра Васильовича та Афанасії Василівни Налуцишиних. Інші деталі біографії невідомі.",
  shortBioEn: "Son of Petro Vasylovych and Afanasiia Vasylivna Nalutsyshyn. Other biographical details are unknown.",
  storyUk: "невідомо",
  storyEn: "unknown",

  // Нотатки
  notesUk: "невідомо",
  notesEn: "unknown",
},
{
  id: "p116",

  // Українською
  firstName: "Василь",
  middleName: "Петрович",
  lastName: "Налуцишин",

  // Дівоче прізвище не актуальне (чоловік)
  maidenName: "",
  maidenNameEn: "",

  // Латиницею
  firstNameEn: "Vasyl",
  middleNameEn: "Petrovych",
  lastNameEn: "Nalutsyshyn",

  gender: "male",

  // Дати
  birthDate: "1942",        // тільки рік
  deathDate: "невідомо",

  // Місця
  birthPlace: "село Фридрихівка",
  birthPlaceEn: "Frydrykhivka village",
  deathPlace: "невідомо",
  deathPlaceEn: "unknown",

  // Поховання
  burialPlace: "невідомо",
  burialPlaceEn: "unknown",
  burialCoords: "невідомо",

  // Фото
  photo: "",
  gallery: [],

  // Професія, освіта
  occupationUk: "невідомо",
  occupationEn: "unknown",
  educationUk: "невідомо",
  educationEn: "unknown",

  // Біографія
  shortBioUk: "Син Петра Васильовича та Афанасії Василівни Налуцишиних. Інші деталі біографії невідомі.",
  shortBioEn: "Son of Petro Vasylovych and Afanasiia Vasylivna Nalutsyshyn. Other biographical details are unknown.",
  storyUk: "невідомо",
  storyEn: "unknown",

  // Нотатки
  notesUk: "невідомо",
  notesEn: "unknown",
},
{
  id: "p117",

  // Українською
  firstName: "Володимир",
  middleName: "Петрович",
  lastName: "Налуцишин",

  // Дівоче прізвище не актуальне (чоловік)
  maidenName: "",
  maidenNameEn: "",

  // Латиницею
  firstNameEn: "Volodymyr",
  middleNameEn: "Petrovych",
  lastNameEn: "Nalutsyshyn",

  gender: "male",

  // Дати
  birthDate: "невідомо",
  deathDate: "невідомо",

  // Місця
  birthPlace: "село Фридрихівка",
  birthPlaceEn: "Frydrykhivka village",
  deathPlace: "невідомо",
  deathPlaceEn: "unknown",

  // Поховання
  burialPlace: "невідомо",
  burialPlaceEn: "unknown",
  burialCoords: "невідомо",

  // Фото
  photo: "",
  gallery: [],

  // Професія, освіта
  occupationUk: "невідомо",
  occupationEn: "unknown",
  educationUk: "невідомо",
  educationEn: "unknown",

  // Біографія
  shortBioUk: "Син Петра Васильовича та Афанасії Василівни Налуцишиних. Інші деталі біографії невідомі.",
  shortBioEn: "Son of Petro Vasylovych and Afanasiia Vasylivna Nalutsyshyn. Other biographical details are unknown.",
  storyUk: "невідомо",
  storyEn: "unknown",

  // Нотатки
  notesUk: "невідомо",
  notesEn: "unknown",
},
{
  id: "p118",

  // Українською
  firstName: "Петро",
  middleName: "Петрович",
  lastName: "Налуцишин",

  // Дівоче прізвище не актуальне (чоловік)
  maidenName: "",
  maidenNameEn: "",

  // Латиницею
  firstNameEn: "Petro",
  middleNameEn: "Petrovych",
  lastNameEn: "Nalutsyshyn",

  gender: "male",

  // Дати
  birthDate: "невідомо",
  deathDate: "невідомо",

  // Місця
  birthPlace: "село Фридрихівка",
  birthPlaceEn: "Frydrykhivka village",
  deathPlace: "невідомо",
  deathPlaceEn: "unknown",

  // Поховання
  burialPlace: "невідомо",
  burialPlaceEn: "unknown",
  burialCoords: "невідомо",

  // Фото
  photo: "",
  gallery: [],

  // Професія, освіта
  occupationUk: "невідомо",
  occupationEn: "unknown",
  educationUk: "невідомо",
  educationEn: "unknown",

  // Біографія
  shortBioUk: "Син Петра Васильовича та Афанасії Василівни Налуцишиних. Інші деталі біографії невідомі.",
  shortBioEn: "Son of Petro Vasylovych and Afanasiia Vasylivna Nalutsyshyn. Other biographical details are unknown.",
  storyUk: "невідомо",
  storyEn: "unknown",

  // Нотатки
  notesUk: "невідомо",
  notesEn: "unknown",
},
{
  id: "p119",

  // Українською
  firstName: "Наталія",
  middleName: "", // по батькові невідоме
  lastName: "Налуцишина", // теперішнє прізвище по чоловікові

  // Дівоче прізвище
  maidenName: "Седорчук",
  maidenNameEn: "Sedorchuk",

  // Латиницею (транслітерація)
  firstNameEn: "Nataliia",
  middleNameEn: "",
  lastNameEn: "Nalutsyshyna",

  gender: "female",

  // Дати
  birthDate: "1888-08-23",     // 23 серпня 1888
  deathDate: "1978",           // тільки рік

  // Місця
  birthPlace: "село Фридрихівка",
  birthPlaceEn: "Frydrykhivka village",
  deathPlace: "Center Line, Macomb, Michigan, United States",
  deathPlaceEn: "Center Line, Macomb, Michigan, United States",

  // Поховання
  burialPlace: "",
  burialPlaceEn: "",
  burialCoords: "",

  // Фото
  photo: "",
  gallery: [],

  // Професія, освіта
  occupationUk: "невідомо",
  occupationEn: "unknown",
  educationUk: "невідомо",
  educationEn: "unknown",

  // Біографія
  shortBioUk:
    "Дружина Петра Йосиповича Налуцишина. Іммігрувала до США у 1924 році. Одруження орієнтовно 1906 року. Інші деталі біографії невідомі.",
  shortBioEn:
    "Wife of Petro Yosypovych Nalutsyshyn. Immigrated to the USA in 1924. Marriage around 1906. Other biographical details are unknown.",
  storyUk: "невідомо",
  storyEn: "unknown",

  // Нотатки
  notesUk: "невідомо",
  notesEn: "unknown",
},
{
  id: "p120",

  // Українською
  firstName: "Ніканор",
  middleName: "",
  lastName: "Бараболя",

  // Дівоче прізвище не актуальне (чоловік)
  maidenName: "",
  maidenNameEn: "",

  // Латиницею (транслітерація)
  firstNameEn: "Nikanor",
  middleNameEn: "",
  lastNameEn: "Barabolia",

  gender: "male",

  // Дати
  birthDate: "невідомо",
  deathDate: "невідомо",

  // Місця
  birthPlace: "невідомо",
  birthPlaceEn: "unknown",
  deathPlace: "невідомо",
  deathPlaceEn: "unknown",

  // Поховання
  burialPlace: "невідомо",
  burialPlaceEn: "unknown",
  burialCoords: "невідомо",

  // Фото
  photo: "",
  gallery: [],

  // Професія, освіта
  occupationUk: "невідомо",
  occupationEn: "unknown",
  educationUk: "невідомо",
  educationEn: "unknown",

  // Біографія
  shortBioUk: "Чоловік Феодосії Йосипівни Бараболі (Налуцишиної). Інші деталі біографії невідомі.",
  shortBioEn:
    "Husband of Feodosiia Yosypivna Barabolia (Nalutsyshyna). Other biographical details are unknown.",
  storyUk: "невідомо",
  storyEn: "unknown",

  // Нотатки
  notesUk: "невідомо",
  notesEn: "unknown",
},
{
  id: "p121",

  // Українською
  firstName: "Ольга",
  middleName: "Ніканорівна",
  lastName: "Налуцишина", // теперішнє прізвище (по чоловіку, якщо одружена; поки беремо так)

  // Дівоче прізвище
  maidenName: "Бараболя",
  maidenNameEn: "Barabolia",

  // Латиницею
  firstNameEn: "Olha",
  middleNameEn: "Nikanorivna",
  lastNameEn: "Nalutsyshyna",

  gender: "female",

  // Дати
  birthDate: "невідомо",
  deathDate: "невідомо",

  // Місця
  birthPlace: "невідомо",
  birthPlaceEn: "unknown",
  deathPlace: "невідомо",
  deathPlaceEn: "unknown",

  // Поховання
  burialPlace: "невідомо",
  burialPlaceEn: "unknown",
  burialCoords: "невідомо",

  // Фото
  photo: "",
  gallery: [],

  // Професія, освіта
  occupationUk: "невідомо",
  occupationEn: "unknown",
  educationUk: "невідомо",
  educationEn: "unknown",

  // Біографія
  shortBioUk:
    "Донька Феодосії Йосипівни Бараболі (Налуцишиної) та Ніканора Бараболі. Інші деталі біографії невідомі.",
  shortBioEn:
    "Daughter of Feodosiia Yosypivna Barabolia (Nalutsyshyna) and Nikanor Barabolia. Other biographical details are unknown.",
  storyUk: "невідомо",
  storyEn: "unknown",

  // Нотатки
  notesUk: "невідомо",
  notesEn: "unknown",
},
{
  id: "p122",

  // Українською
  firstName: "Микола",
  middleName: "",
  lastName: "Налуцишин",

  // Дівоче прізвище не актуальне (чоловік)
  maidenName: "",
  maidenNameEn: "",

  // Латиницею (транслітерація)
  firstNameEn: "Mykola",
  middleNameEn: "",
  lastNameEn: "Nalutsyshyn",

  gender: "male",

  // Дати
  birthDate: "невідомо",
  deathDate: "невідомо",

  // Місця
  birthPlace: "невідомо",
  birthPlaceEn: "unknown",
  deathPlace: "невідомо",
  deathPlaceEn: "unknown",

  // Поховання
  burialPlace: "невідомо",
  burialPlaceEn: "unknown",
  burialCoords: "невідомо",

  // Фото
  photo: "",
  gallery: [],

  // Професія, освіта
  occupationUk: "невідомо",
  occupationEn: "unknown",
  educationUk: "невідомо",
  educationEn: "unknown",

  // Біографія
  shortBioUk:
    "Чоловік Ольги Ніканорівни Налуцишиної (Бараболя). Інші деталі біографії невідомі.",
  shortBioEn:
    "Husband of Olha Nikanorivna Nalutsyshyna (Barabolia). Other biographical details are unknown.",
  storyUk: "невідомо",
  storyEn: "unknown",

  // Нотатки
  notesUk: "невідомо",
  notesEn: "unknown",
},
{
  id: "p123",

  // Українською
  firstName: "Олександр",
  middleName: "Миколайович",
  lastName: "Налуцишин",

  // Дівоче прізвище не актуальне (чоловік)
  maidenName: "",
  maidenNameEn: "",

  // Латиницею
  firstNameEn: "Oleksandr",
  middleNameEn: "Mykolaiovych",
  lastNameEn: "Nalutsyshyn",

  gender: "male",

  // Дати
  birthDate: "невідомо",
  deathDate: "невідомо",

  // Місця
  birthPlace: "невідомо",
  birthPlaceEn: "unknown",
  deathPlace: "невідомо",
  deathPlaceEn: "unknown",

  // Поховання
  burialPlace: "невідомо",
  burialPlaceEn: "unknown",
  burialCoords: "невідомо",

  // Фото
  photo: "",
  gallery: [],

  // Професія, освіта
  occupationUk: "невідомо",
  occupationEn: "unknown",
  educationUk: "невідомо",
  educationEn: "unknown",

  // Біографія
  shortBioUk:
    "Син Ольги Ніканорівни Налуцишиної (Бараболя) та Миколи Налуцишина. Інші деталі біографії невідомі.",
  shortBioEn:
    "Son of Olha Nikanorivna Nalutsyshyna (Barabolia) and Mykola Nalutsyshyn. Other biographical details are unknown.",
  storyUk: "невідомо",
  storyEn: "unknown",

  // Нотатки
  notesUk: "невідомо",
  notesEn: "unknown",
},
{
  id: "p124",

  // Українською
  firstName: "Анатолій",
  middleName: "Миколайович",
  lastName: "Налуцишин",

  // Дівоче прізвище не актуальне (чоловік)
  maidenName: "",
  maidenNameEn: "",

  // Латиницею
  firstNameEn: "Anatolii",
  middleNameEn: "Mykolaiovych",
  lastNameEn: "Nalutsyshyn",

  gender: "male",

  // Дати
  birthDate: "невідомо",
  deathDate: "невідомо",

  // Місця
  birthPlace: "невідомо",
  birthPlaceEn: "unknown",
  deathPlace: "невідомо",
  deathPlaceEn: "unknown",

  // Поховання
  burialPlace: "невідомо",
  burialPlaceEn: "unknown",
  burialCoords: "невідомо",

  // Фото
  photo: "",
  gallery: [],

  // Професія, освіта
  occupationUk: "невідомо",
  occupationEn: "unknown",
  educationUk: "невідомо",
  educationEn: "unknown",

  // Біографія
  shortBioUk:
    "Син Ольги Ніканорівни Налуцишиної (Бараболя) та Миколи Налуцишина. Інші деталі біографії невідомі.",
  shortBioEn:
    "Son of Olha Nikanorivna Nalutsyshynа (Barabolia) and Mykola Nalutsyshyn. Other biographical details are unknown.",
  storyUk: "невідомо",
  storyEn: "unknown",

  // Нотатки
  notesUk: "невідомо",
  notesEn: "unknown",
},
{
  id: "p125",

  // Українською
  firstName: "невідомо",
  middleName: "",
  lastName: "Налуцишина",

  // Дівоче прізвище невідоме
  maidenName: "невідомо",
  maidenNameEn: "unknown",

  // Латиницею
  firstNameEn: "unknown",
  middleNameEn: "",
  lastNameEn: "Nalutsyshyna",

  gender: "female",

  // Дати
  birthDate: "невідомо",
  deathDate: "невідомо",

  // Місця
  birthPlace: "невідомо",
  birthPlaceEn: "unknown",
  deathPlace: "невідомо",
  deathPlaceEn: "unknown",

  // Поховання
  burialPlace: "невідомо",
  burialPlaceEn: "unknown",
  burialCoords: "невідомо",

  // Фото
  photo: "",
  gallery: [],

  // Професія, освіта
  occupationUk: "невідомо",
  occupationEn: "unknown",
  educationUk: "невідомо",
  educationEn: "unknown",

  // Біографія
  shortBioUk:
    "Дружина Анатолія Миколайовича Налуцишина. Імʼя та інші деталі біографії невідомі.",
  shortBioEn:
    "Wife of Anatolii Mykolaiovych Nalutsyshyn. Name and other biographical details are unknown.",
  storyUk: "невідомо",
  storyEn: "unknown",

  // Нотатки
  notesUk: "невідомо",
  notesEn: "unknown",
},
{
  id: "p126",

  // Українською
  firstName: "Фред",
  middleName: "", // по батькові невідоме
  lastName: "Андрійчук",

  // Дівоче прізвище не актуальне (чоловік)
  maidenName: "",
  maidenNameEn: "",

  // Латиницею (можеш потім підправити, якщо хочеш інший варіант)
  firstNameEn: "Fred",
  middleNameEn: "",
  lastNameEn: "Andriichuk",

  gender: "male",

  // Дати
  birthDate: "1888-04-06",          // 6 квітня 1888 року
  deathDate: "1978-07-29",          // 29 липня 1978 року

  // Місця
  birthPlace: "містечко Волочиськ",
  birthPlaceEn: "Volochysk town",
  deathPlace: "Vassar, Tuscola, Michigan, United States",
  deathPlaceEn: "Vassar, Tuscola, Michigan, United States",

  // Поховання
  burialPlace: "",
  burialPlaceEn: "",
  burialCoords: "",

  // Фото
  photo: "",
  gallery: [],

  // Професія, освіта (якщо дізнаєшся — оновиш)
  occupationUk: "невідомо",
  occupationEn: "unknown",
  educationUk: "невідомо",
  educationEn: "unknown",

  // Біографія
  shortBioUk: "Чоловік Марти (Матрьони) Йосипівни Андрійчук (Налуцишина). Іммігрував до США 16 лютого 1909 року. Інші деталі біографії невідомі.",
  shortBioEn: "Husband of Marta (Matryona) Yosypivna Andriichuk (Nalutsyshyna). Immigrated to the USA on 16 February 1909. Other biographical details are unknown.",
  storyUk: "невідомо",
  storyEn: "unknown",

  // Нотатки
  notesUk: "невідомо",
  notesEn: "unknown",
},
{
  id: "p127",

  // Українською
  firstName: "Алекс",
  middleName: "", // по батькові невідоме
  lastName: "Андрійчук",

  // Дівоче прізвище не актуальне (чоловік)
  maidenName: "",
  maidenNameEn: "",

  // Латиницею (можеш скоригувати при потребі)
  firstNameEn: "Alex",
  middleNameEn: "",
  lastNameEn: "Andriichuk",

  gender: "male",

  // Дати
  birthDate: "1914-12-05", // 5 December 1914
  deathDate: "2007-04-11", // 11 April 2007

  // Місця
  birthPlace: "Hamtramck, Wayne, Michigan, United States",
  birthPlaceEn: "Hamtramck, Wayne, Michigan, United States",
  deathPlace: "Frankenmuth, Saginaw, Michigan, United States",
  deathPlaceEn: "Frankenmuth, Saginaw, Michigan, United States",

  // Поховання
  burialPlace: "",
  burialPlaceEn: "",
  burialCoords: "",

  // Фото
  photo: "",
  gallery: [],

  // Професія, освіта (поки немає даних)
  occupationUk: "невідомо",
  occupationEn: "unknown",
  educationUk: "невідомо",
  educationEn: "unknown",

  // Біографія
  shortBioUk:
    "Син Марти (Матрьони) Йосипівни Андрійчук (Налуцишина) та Фреда Андрійчука. Інші деталі біографії невідомі.",
  shortBioEn:
    "Son of Marta (Matryona) Yosypivna Andriichuk (Nalutsyshyna) and Fred Andriichuk. Other biographical details are unknown.",
  storyUk: "невідомо",
  storyEn: "unknown",

  // Нотатки
  notesUk: "невідомо",
  notesEn: "unknown",
},

{
  id: "p129",

  firstName: "Теодор",
  middleName: "",
  lastName: "Андрійчук",

  maidenName: "",
  maidenNameEn: "",

  firstNameEn: "Theodore",
  middleNameEn: "",
  lastNameEn: "Andriichuk",

  gender: "male",

  birthDate: "1916-12-01",
  deathDate: "1980-08-01",

  birthPlace: "Michigan, United States",
  birthPlaceEn: "Michigan, United States",
  deathPlace: "Michigan, United States",
  deathPlaceEn: "Michigan, United States",

  burialPlace: "",
  burialPlaceEn: "",
  burialCoords: "",

  photo: "",
  gallery: [],

  occupationUk: "невідомо",
  occupationEn: "unknown",
  educationUk: "невідомо",
  educationEn: "unknown",

  shortBioUk:
    "Син Марти (Матрьони) Йосипівни Андрійчук (Налуцишина) та Фреда Андрійчука. Інші деталі біографії невідомі.",
  shortBioEn:
    "Son of Marta (Matryona) Yosypivna Andriichuk (Nalutsyshyna) and Fred Andriichuk. Other biographical details are unknown.",
  storyUk: "невідомо",
  storyEn: "unknown",

  notesUk: "невідомо",
  notesEn: "unknown",
},
{
  id: "p130",

  // Українською
  firstName: "Стефанія Стелла",
  middleName: "", // по батькові невідоме
  lastName: "Андрійчук",

  // Дівоче / теперішнє прізвище – поки не розділяємо, якщо дізнаєшся, що після шлюбу змінювала прізвище,
  // можна буде зробити lastName = нове, maidenName = Андрійчук
  maidenName: "",
  maidenNameEn: "",

  // Латиницею
  firstNameEn: "Stephanie Stella",
  middleNameEn: "",
  lastNameEn: "Andreychuk",

  gender: "female",

  // Дати
  // дату народження краще нормалізувати до формату YYYY-MM-DD
  birthDate: "1925-02-18", // 2/18/1925
  deathDate: "2022-07-21", // 21 July 2022

  // Місця
  birthPlace: "Hamtramck, Wayne, Michigan, United States",
  birthPlaceEn: "Hamtramck, Wayne, Michigan, United States",
  deathPlace: "Sebring, Highlands, Florida, United States",
  deathPlaceEn: "Sebring, Highlands, Florida, United States",

  // Поховання
  burialPlace: "",
  burialPlaceEn: "",
  burialCoords: "",

  // Фото
  photo: "",
  gallery: [],

  // Професія, освіта
  occupationUk: "невідомо",
  occupationEn: "unknown",
  educationUk: "невідомо",
  educationEn: "unknown",

  // Біографія
  shortBioUk:
    "Донька Марти (Матрьони) Йосипівни Андрійчук (Налуцишина) та Фреда Андрійчука. Інші деталі біографії невідомі.",
  shortBioEn:
    "Daughter of Marta (Matryona) Yosypivna Andriichuk (Nalutsyshyna) and Fred Andriichuk. Other biographical details are unknown.",
  storyUk: "невідомо",
  storyEn: "unknown",

  // Нотатки
  notesUk: "невідомо",
  notesEn: "unknown",
},
{
  id: "p131",

  // Українською
  firstName: "Девід Ніколас",
  middleName: "", // по батькові невідоме
  lastName: "Андрійчук",

  // Дівоче прізвище не актуальне (чоловік)
  maidenName: "",
  maidenNameEn: "",

  // Латиницею
  firstNameEn: "David Nicholas",
  middleNameEn: "",
  lastNameEn: "Andreychuk",

  gender: "male",

  // Дати
  birthDate: "1927-03-10", // March 10, 1927
  deathDate: "1983-07-03", // July 3, 1983

  // Місця
  birthPlace: "",              // невідомо
  birthPlaceEn: "",
  deathPlace: "Saginaw, Saginaw, Michigan, United States",
  deathPlaceEn: "Saginaw, Saginaw, Michigan, United States",

  // Поховання
  burialPlace: "",
  burialPlaceEn: "",
  burialCoords: "",

  // Фото
  photo: "",
  gallery: [],

  // Професія, освіта
  occupationUk: "невідомо",
  occupationEn: "unknown",
  educationUk: "невідомо",
  educationEn: "unknown",

  // Біографія
  shortBioUk:
    "Син Марти (Матрьони) Йосипівни Андрійчук (Налуцишина) та Фреда Андрійчука. Інші деталі біографії невідомі.",
  shortBioEn:
    "Son of Marta (Matryona) Yosypivna Andriichuk (Nalutsyshyna) and Fred Andriichuk. Other biographical details are unknown.",
  storyUk: "невідомо",
  storyEn: "unknown",

  // Нотатки
  notesUk: "невідомо",
  notesEn: "unknown",
},
{
  id: "p132",

  // Українською
  firstName: "Надія",
  middleName: "Пилипівна",
  lastName: "Налуцишина",   // теперішнє прізвище по чоловіку

  // Дівоче прізвище
  maidenName: "Кригульська",
  maidenNameEn: "Kryhulska",

  // Латиницею
  firstNameEn: "Nadiia",
  middleNameEn: "Pylypivna",
  lastNameEn: "Nalutsyshyna",

  gender: "female",          // у твоєму описі було "чоловіча" – це, очевидно, описка

  // Дати — поки невідомі
  birthDate: "невідомо",
  deathDate: "невідомо",

  // Місця
  birthPlace: "невідомо",
  birthPlaceEn: "unknown",
  deathPlace: "місто Волочиськ",
  deathPlaceEn: "Volochysk town",

  // Поховання
  burialPlace: "місто Волочиськ",
  burialPlaceEn: "Volochysk town",
  burialCoords: "невідомо",

  // Фото
  photo: "",
  gallery: [],

  // Професія, освіта
  occupationUk: "невідомо",
  occupationEn: "unknown",
  educationUk: "невідомо",
  educationEn: "unknown",

  // Біографія
  shortBioUk: "Дружина Юрія Петровича Налуцишина. Інші деталі біографії невідомі.",
  shortBioEn: "Wife of Yurii Petrovych Nalutsyshyn. Other biographical details are unknown.",
  storyUk: "невідомо",
  storyEn: "unknown",

  // Нотатки
  notesUk: "",
  notesEn: "",
},
{
  id: "p133",

  // Українською
  firstName: "Тетяна",
  middleName: "Юріївна",
  lastName: "Поліщук", // теперішнє прізвище

  // Дівоче прізвище
  maidenName: "Налуцишина",
  maidenNameEn: "Nalutsyshyna",

  // Латиницею
  firstNameEn: "Tetiana",
  middleNameEn: "Yuriivna",
  lastNameEn: "Polishchuk",

  gender: "female",

  // Дати
  birthDate: "1961-09-27", // 27 Вер 1961
  deathDate: "",           // жива

  // Місця
  birthPlace: "місто Волочиськ",
  birthPlaceEn: "Volochysk town",
  deathPlace: "",
  deathPlaceEn: "",

  // Поховання
  burialPlace: "",
  burialPlaceEn: "",
  burialCoords: "невідомо",

  // Фото
  photo: "",
  gallery: [],

  // Професія, освіта
  occupationUk: "невідомо",
  occupationEn: "unknown",
  educationUk: "невідомо",
  educationEn: "unknown",

  // Біографія
  shortBioUk:
    "Донька Юрія Петровича Налуцишина та Надії Пилипівни Налуцишиної (Кригульської). Інші деталі біографії поки не внесені.",
  shortBioEn:
    "Daughter of Yurii Petrovych Nalutsyshyn and Nadiia Pylypivna Nalutsyshyna (Kryhulska). Other biographical details are not yet provided.",
  storyUk: "",
  storyEn: "",

  // Нотатки
  notesUk: "",
  notesEn: "",
},
{
  id: "p134",

  // Українською
  firstName: "Іван",
  middleName: "Юрійович",
  lastName: "Налуцишин",

  // Дівоче прізвище не актуальне (чоловік)
  maidenName: "",
  maidenNameEn: "",

  // Латиницею
  firstNameEn: "Ivan",
  middleNameEn: "Yuriiovych",
  lastNameEn: "Nalutsyshyn",

  gender: "male",

  // Дати
  birthDate: "1961-09-27", // 27 Вер 1961 року
  deathDate: "",           // жива людина

  // Місця
  birthPlace: "місто Волочиськ",
  birthPlaceEn: "Volochysk town",
  deathPlace: "",
  deathPlaceEn: "",

  // Поховання
  burialPlace: "",
  burialPlaceEn: "",
  burialCoords: "невідомо",

  // Фото
  photo: "",
  gallery: [],

  // Професія, освіта
  occupationUk: "невідомо",
  occupationEn: "unknown",
  educationUk: "невідомо",
  educationEn: "unknown",

  // Біографія
  shortBioUk:
    "Син Юрія Петровича Налуцишина та Надії Пилипівни Налуцишиної (Кригульської). Інші деталі біографії поки не внесені.",
  shortBioEn:
    "Son of Yurii Petrovych Nalutsyshyn and Nadiia Pylypivna Nalutsyshyna (Kryhulska). Other biographical details are not yet provided.",
  storyUk: "",
  storyEn: "",

  // Нотатки
  notesUk: "Місто Ногінськ, Росія.",
  notesEn: "Noginsk, Russia.",
},
{
  id: "p135",

  // Українською
  firstName: "Віктор",
  middleName: "Павлович",
  lastName: "Поліщук",

  // Дівоче прізвище не актуальне (чоловік)
  maidenName: "",
  maidenNameEn: "",

  // Латиницею
  firstNameEn: "Viktor",
  middleNameEn: "Pavlovych",
  lastNameEn: "Polishchuk",

  gender: "male",

  // Дати
  birthDate: "1961-03-02", // 02 Бер 1961 року
  deathDate: "",           // жива людина

  // Місця
  birthPlace: "місто Волочиськ",
  birthPlaceEn: "Volochysk town",
  deathPlace: "",
  deathPlaceEn: "",

  // Поховання
  burialPlace: "",
  burialPlaceEn: "",
  burialCoords: "",

  // Фото
  photo: "",
  gallery: [],

  // Професія, освіта
  occupationUk: "невідомо",
  occupationEn: "unknown",
  educationUk: "невідомо",
  educationEn: "unknown",

  // Біографія
  shortBioUk:
    "Чоловік Тетяни Юріївни Поліщук (Налуцишина). Інші деталі біографії поки не внесені.",
  shortBioEn:
    "Husband of Tetiana Yuriyivna Polishchuk (Nalutsyshyna). Other biographical details are not yet provided.",
  storyUk: "",
  storyEn: "",

  // Нотатки
  notesUk: "",
  notesEn: "",
},




];

