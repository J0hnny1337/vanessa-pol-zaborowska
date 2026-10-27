// Treść strony (teksty, serie, obrazy, wystawy). Zmiany robi się tutaj; data.ts układa to dla komponentów.
import type { ContentPage, HomePage, NavItem, PageHeader, Painting, Photo, Series, ServicePage, SiteSettings } from "./source-types";

const t = (pl: string, en: string) => ({ pl, en });

export const site: SiteSettings = {
  artistName: "Vanessa Pol-Zaborowska",
  tagline: t("Malarstwo · Akwarela · Marynistyka", "Painting · Watercolour · Marine art"),
  portraitPhotoId: "sesja-4",
  exhibitionPhotoIds: Array.from({ length: 13 }, (_, i) => `wydarzenie-${i + 1}`), // do podmiany na zdjęcia z wystaw
  email: "vanessapol.art102@gmail.com",
  phone: "+48 602 489 305",
  social: [
    { label: "Instagram", url: "https://www.instagram.com/vanessapol_art/" },
    { label: "Facebook", url: "https://www.facebook.com/krystyna.kmieciak" },
  ],
  portfolioPdfUrl: undefined,
  bio: [
    t("Ukończyłam Wydział Pedagogiki Artystycznej UAM w Poznaniu. Jestem rzeczoznawcą malarstwa. Maluję akwarelą ilustracje do ćwiczeń i podręczników szkolnych, przygotowałam też zarys podręcznika „Podstawy historii sztuki”. Organizuję konkursy plastyczne, koordynuję projekt Strefa Aktywności, a jako kuratorka przygotowuję wystawy w całej Polsce.",
      "I graduated from the Faculty of Art Education at Adam Mickiewicz University in Poznań and I am a certified painting appraiser. I paint watercolour illustrations for school workbooks and textbooks, and I drafted the outline of a textbook, \"Foundations of Art History\". I organise art competitions, coordinate the Strefa Aktywności (Activity Zone) project, and curate exhibitions across Poland."),
    t("Maluję od ponad 30 lat. Mówią o mnie: kolorystka o cienkiej kresce. W obrazach łączę impresję, czyli zapis chwilowego wrażenia, z realizmem. Nie lubię stać w miejscu: wciąż szukam, odkrywam i zaczynam od nowa.",
      "I have been painting for over 30 years. People call me a colourist with a fine line. In my paintings I bring together impression, the record of a fleeting sensation, and realism. I don't like standing still: I keep searching, discovering and starting anew."),
    t("Inspirują mnie podróże, spotkania z ciekawymi ludźmi, architektura i muzyka. Szkicuję i fotografuję. Słucham muzyki klasycznej, jazzu i bluesa. Piszę też liryki, scenariusze i poezję. Obraz, jak każdy proces twórczy, potrzebuje czasu, refleksji i spokoju. Zanim powstanie, zbieram wrażenia i układam z nich projekt, który dopiero potem przenoszę na płótno.",
      "I am inspired by travel, by meeting interesting people, by architecture and by music. I sketch and take photographs. I listen to classical music, jazz and blues, and I also write lyrics, screenplays and poetry. Like any creative process, a painting needs time, reflection and calm. Before it exists, I gather impressions and shape them into an idea, which only later goes onto the canvas."),
    t("Biorę udział w plenerach i wystawach zbiorowych w całej Polsce, m.in. w Poznaniu, Pile, Koszalinie, Warszawie i Kołobrzegu, i pokazuję swoje prace na wystawach indywidualnych. Za portret Fryderyka Chopina otrzymałam drugą nagrodę w międzynarodowym konkursie Galerii Eclusier w Londynie. Moje obrazy trafiły do zbiorów prywatnych w Polsce i za granicą. Moją sylwetkę zamieszczono w XII i XIII wydaniu encyklopedii „Who is Who”.",
      "I take part in plein-air workshops and group exhibitions across Poland, including Poznań, Piła, Koszalin, Warsaw and Kołobrzeg, and I show my work in solo exhibitions. My portrait of Fryderyk Chopin won second prize in an international competition held by the Eclusier Gallery in London. My paintings are in private collections in Poland and abroad. My profile appears in the 12th and 13th editions of the \"Who is Who\" encyclopaedia."),
  ],
  statement: [
    t("Dziś atakują nas bodźce: hałas, polityka, wydarzenia na świecie. Sztuka skłania do refleksji i otwiera nowe horyzonty. Jest istotna wtedy, kiedy zmienia w nas myślenie, zarówno twórcy, jak i odbiorcy.",
      "Today we are bombarded by stimuli: noise, politics, world events. Art invites reflection and opens new horizons. It matters when it changes the way we think, both the artist's and the viewer's."),
    t("Pracować z pasją to dla mnie mieć trzecią nogę, głowę pełną wyobraźni, oczy dookoła głowy, wrażliwość i kreatywność, a przede wszystkim wenę. Moje obrazy nie mają zakończenia. Dotyczą natury, emocji i wrażeń, i dlatego cykl tworzenia trwa…",
      "To me, working with passion means having a third leg, a head full of imagination, eyes in the back of my head, sensitivity and creativity, and above all inspiration. My paintings have no ending. They are about nature, emotion and impression, and so the cycle of creation goes on…"),
  ],
  // Od najnowszych. Strona pokazuje pierwsze pozycje, resztę po kliknięciu „Pokaż wszystkie”.
  exhibitions: [
    { year: 2025, title: "Ekspozycja stała", place: "Club Golfowy, Gdynia" },
    { year: 2024, title: "Ekspozycja obrazów", place: "Galeria Sztuki Ado-Art, Gdynia, Warszawa" },
    { year: 2024, title: "Spotkanie autorskie literacko-malarskie", place: "Galeria Sztuki Rosen ART, Sopot" },
    { year: 2023, title: "30-lecie pracy twórczej, wydanie tomiku prozy poetyckiej „Druga Strona Ciszy”" },
    { year: 2023, title: "Spotkanie autorskie literacko-malarskie", place: "Super Yachts Club, Gdynia" },
    { year: 2018, title: "Wystawa retrospektywna z okazji 25-lecia pracy artystycznej „Od Paryża do Niepołomic”", place: "Zamek Królewski, Niepołomice" },
    { year: 2018, title: "Wystawa indywidualna z okazji 25-lecia pracy artystycznej „Piękno jest we mnie”", place: "RCK im. Zbigniewa Herberta, Kołobrzeg" },
    { year: 2018, title: "Wystawa ogólnopolska „Mistrz i jego uczeń”", place: "Galeria „N”, Koszalin" },
    { year: 2018, title: "Galeria autorska", place: "Hotel „Senator”, Dźwirzyno" },
    { year: 2017, title: "Ogólnopolska Wystawa Marynistyczna", place: "Galeria „N”, Koszalin" },
    { year: 2017, title: "Wystawa ogólnopolska „Mistrz i jego uczeń”, pod patronatem Prezydenta Miasta Koszalina", place: "Koszalin" },
    { year: 2016, title: "Ogólnopolska Wystawa Zbiorowa „Koszalin i inne zakątki Polski”, z okazji 750-lecia Koszalina", place: "Galeria „N”, Koszalin" },
    { year: 2016, title: "Wystawa ogólnopolska „Mistrz i jego uczeń”, pod patronatem Prezydenta Miasta Koszalina", place: "Koszalin" },
    { year: 2016, title: "Wystawa zbiorowa Stowarzyszenia Artystów Grupy Kołobrzeg", place: "Galeria Współczesna" },
    { year: 2015, title: "Wystawa indywidualna „Akwarela w Sztuce”", place: "redakcja Gazety Poznańskiej" },
    { year: 2015, title: "Salon Wielkopolski, wystawa ogólnopolska", place: "Muzeum Ziemi Czarnkowskiej" },
    { year: 2014, title: "Wystawa indywidualna „Inspiracje”", place: "ul. Śródmiejska, Piła" },
    { year: 2014, title: "Wystawa zbiorowa", place: "Muzeum w Osieku" },
    { year: 2014, title: "Wystawa indywidualna", place: "Galeria „Akwarium”, Piła" },
    { year: 2014, title: "Salon Wielkopolski, wystawa międzynarodowa", place: "Muzeum Ziemi Czarnkowskiej" },
    { year: 2013, title: "Wystawa indywidualna", place: "Zamek w Sławnie" },
    { year: 2013, title: "Wystawa zbiorowa „Galeria na Piętrze”", place: "WSZ w Pile" },
    { year: 2013, title: "Wystawa zbiorowa „Kołobrzeskie Impresje”, Grupa Kołobrzeg", place: "Galeria Sztuki „Akwarium”, Piła" },
    { year: 2013, title: "Wystawa Benefis z okazji XX-lecia pracy artystycznej", place: "Galeria „Pięciu”, Czarnków" },
    { year: 2008, title: "Wystawa jubileuszowa z okazji XV-lecia pracy artystycznej", place: "Galeria „Pięciu”, Czarnków" },
    { year: 2003, title: "Salon Wielkopolski, wystawa międzynarodowa", place: "Muzeum Ziemi Czarnkowskiej" },
    { year: 2003, title: "Wystawa jubileuszowa z okazji X-lecia pracy artystycznej", place: "Galeria „Pięciu”, Czarnków" },
  ],
  collections: ["Polska i za granicą"], // do uzupełnienia o konkretne kraje
  footerNote: t(
    "Obrazy na zamówienie, zajęcia z rysunku i malarstwa, przygotowanie do egzaminów artystycznych.",
    "Paintings on commission, drawing and painting classes, art school exam preparation.",
  ),
  legalLinks: [
    { label: t("Regulamin", "Terms"), href: "#" },
    { label: t("Polityka prywatności", "Privacy policy"), href: "#" },
  ],
  cta: {
    title: t("Zamów portret", "Commission a portrait"),
    buttonLabel: t("Zamów portret", "Order a portrait"),
    href: "mailto:vanessapol.art102@gmail.com",
  },
};

// Szare odcienie dla prostokątów zastępczych, żeby sąsiednie miejsca się odróżniały.
const greys = ["#d9d6d1", "#cfcdc8", "#d6d2cc", "#d4d0c8", "#cdcac4", "#d8d5d0", "#d1cec9"];
const grey = (i: number) => greys[i % greys.length];

export const series: Series[] = [
  { id: "marynistyka", name: t("Marynistyka i żaglowce", "Marine art and tall ships"), years: "", order: 1 },
  { id: "morze-i-plaza", name: t("Morze i plaża", "Sea and beach"), years: "", order: 2 },
  { id: "pejzaze-i-miasta", name: t("Pejzaże i miasta", "Landscapes and cities"), years: "", order: 3 },
  { id: "portrety-i-postacie", name: t("Portrety i postacie", "Portraits and figures"), years: "", order: 4 },
  { id: "kwiaty", name: t("Kwiaty", "Flowers"), years: "", order: 5 },
  { id: "konie-i-zwierzeta", name: t("Konie i zwierzęta", "Horses and animals"), years: "", order: 6 },
  { id: "golf", name: t("Golf", "Golf"), years: "", order: 7 },
  { id: "abstrakcje", name: t("Abstrakcje", "Abstracts"), years: "", order: 8 },
];

// Jeden wpis = jeden plik z folderu "zdjęcia-malarka/Obrazy/<folder>".
// Tytuły robocze wzięte z nazw plików; rok, wymiary i technikę uzupełnimy później.
// Proporcje (szer. / wys.) wzięte z wymiarów zdjęć.
type Row = [id: string, title: string, file: string, w: number, h: number];
const inSeries = (seriesId: string, folder: string, rows: Row[]): Painting[] =>
  rows.map(([id, title, file, w, h], i) => ({
    id, title, seriesId, ratio: `${w} / ${h}`, status: "available", placeholder: grey(i),
    source: `Obrazy/${folder}/${file}`, order: i + 1,
  }));

export const paintings: Painting[] = [
  ...inSeries("marynistyka", "Marynistyka i żaglowce", [
    ["zagle", "Żagle", "czerwiecZagle.jpg", 1935, 1395],
    ["sztorm", "Sztorm", "lutySztorm.jpg", 2126, 1535],
    ["w-porcie", "W porcie", "ListopadwPorcie.jpg", 2098, 1520],
    ["w-porcie-2", "W porcie II", "wPorcieListopad.jpg", 1975, 1420],
    ["baltyk", "Bałtyk", "baltykSierpien.jpg", 2510, 1718],
    ["szkocja", "Szkocja", "wrzesienSzkocja.jpg", 1307, 911],
    ["port", "Port", "PORTlipiec.jpg", 800, 591],
    ["marynistyka", "Marynistyka", "marzecMarynistyka.jpg", 800, 578],
    ["mar-fb", "", "FB_IMG_1750537274076.jpg", 2048, 1314],
    ["mar-2026", "", "20260616_143004.jpg", 3060, 4080],
  ]),
  ...inSeries("morze-i-plaza", "Morze i plaża", [
    ["impresja", "Impresja", "impresjaStyczen.jpg", 11843, 8757],
    ["impresja-2", "Impresja II", "kwiecienImpresja.jpg", 800, 1136],
    ["impresja-3", "Impresja III", "majImpresja2.jpg", 3426, 2865],
    ["morze-fb", "", "FB_IMG_1751661735241.jpg", 1536, 2048],
  ]),
  ...inSeries("pejzaze-i-miasta", "Pejzaże i miasta", [
    ["italia", "Italia", "ItaliaCzerwiec.jpg", 15950, 11080],
    ["grecja", "Grecja", "GrecjaMarzec.jpg", 7006, 9945],
    ["paryz", "Paryż", "paryzLuty.jpg", 1772, 1772],
    ["paryz-2", "Paryż II", "lipiecParyz.jpg", 1772, 1772],
    ["paryz-3", "Paryż III", "sierpienParyz.jpg", 1772, 1772],
    ["paryz-4", "Paryż IV", "paryzPazdziernik.jpg", 1772, 1772],
    ["pejzaz-fb", "", "FB_IMG_1750009376851.jpg", 960, 1280],
  ]),
  ...inSeries("portrety-i-postacie", "Portrety i postacie", [
    ["chopin", "Chopin", "ChopinGrudzien.jpg", 13206, 9716],
    ["chopin-2", "Chopin II", "styczenChopin.jpg", 3761, 3001],
    ["drzewo-zycia", "Drzewo życia", "pazdziernikDzrzewoZycia.jpg", 2331, 3152],
    ["muzycy", "Muzycy", "muzycyWrzesien.jpg", 2480, 1754],
    ["akt", "Akt", "aktKwiecien.JPG", 2126, 1535],
    ["postac-fb", "", "FB_IMG_1751129963038.jpg", 1504, 2015],
    ["postac-wa19", "", "IMG-20250713-WA0019.jpg", 1200, 1600],
    ["postac-wa25", "", "IMG-20250713-WA0025.jpg", 1200, 1600],
  ]),
  ...inSeries("kwiaty", "Kwiaty", [
    ["lilie-wodne", "Lilie wodne", "lilieWodneMaj.jpg", 8903, 8111],
    ["kwiaty-fb", "", "FB_IMG_1744314435555.jpg", 720, 960],
  ]),
  ...inSeries("konie-i-zwierzeta", "Konie i zwierzęta", [
    ["konie-1", "", "20260616_142640.jpg", 3060, 4080],
    ["konie-2", "", "20260616_203536.jpg", 3060, 4080],
    ["konie-fb", "", "FB_IMG_1739215377929.jpg", 1080, 1440],
  ]),
  ...inSeries("golf", "Golf", [
    ["golf-1", "", "20250507_065947.jpg", 3000, 4000],
    ["golf-4", "", "20250522_173328.jpg", 4000, 3000],
    ["golf-5", "", "20250522_173534.jpg", 3000, 4000],
    ["golf-6", "", "20250604_140222.jpg", 3000, 4000],
    ["golf-7", "", "20250604_142946.jpg", 3000, 4000],
    ["golf-8", "", "Resized_IMG-20250507-WA0008.jpeg", 810, 1080],
  ]),
  ...inSeries("abstrakcje", "Abstrakcje", [
    ["euforia", "Euforia", "EuforiaMarzec.jpg", 5871, 7346],
    ["abstrakcja-fb", "", "FB_IMG_1748365051309.jpg", 640, 1316],
  ]),
];

// Zdjęcia z folderu "zdjęcia-malarka/Zdjęcia malarki". Podstrony odwołują się do nich po id.
const photo = (id: string, file: string, w: number, h: number, i = 0): Photo =>
  ({ id, ratio: `${w} / ${h}`, placeholder: grey(i), source: `Zdjęcia malarki/${file}` });

export const photos: Photo[] = [
  photo("sesja-1", "Sesja portretowa/FB_IMG_1739215689431.jpg", 1080, 834, 0),
  photo("sesja-2", "Sesja portretowa/FB_IMG_1739215694881.jpg", 1080, 1529, 1),
  photo("sesja-3", "Sesja portretowa/FB_IMG_1739215706374.jpg", 1080, 1613, 2),
  photo("sesja-4", "Sesja portretowa/FB_IMG_1739215722272.jpg", 1080, 1565, 3),
  photo("sesja-5", "Sesja portretowa/FB_IMG_1739215728830.jpg", 1080, 1531, 4),
  photo("sesja-6", "Sesja portretowa/FB_IMG_1739215733952.jpg", 1080, 1535, 5),
  photo("sesja-7", "Sesja portretowa/FB_IMG_1739215744260.jpg", 1080, 1618, 6),
  photo("sesja-8", "Sesja portretowa/FB_IMG_1751310886861.jpg", 1080, 834, 0),
  photo("edukacja-1", "Edukacja/edukacja-plener.jpg", 509, 678, 1),
  photo("edukacja-2", "Edukacja/edukacja-zajecia.jpg", 452, 338, 2),
  ...[
    ["FB_IMG_1750537266390.jpg", 1366, 2048], ["FB_IMG_1753471457652.jpg", 1440, 960], ["FB_IMG_1753471490826.jpg", 1440, 960],
    ["FB_IMG_1758523641417.jpg", 1080, 1080], ["FB_IMG_1761856127797.jpg", 2000, 1133], ["FB_IMG_1761856137990.jpg", 2000, 1834],
    ["FB_IMG_1761856145690.jpg", 2000, 1476], ["FB_IMG_1761856160927.jpg", 2000, 1583], ["FB_IMG_1761856166111.jpg", 2000, 1580],
    ["FB_IMG_1773326467397.jpg", 1312, 640], ["IMG-20250625-WA0000.jpg", 1600, 1200], ["IMG-20250625-WA0004.jpg", 1600, 1200],
    ["IMG-20250625-WA0007.jpg", 1600, 1200],
  ].map(([file, w, h], i) => photo(`wydarzenie-${i + 1}`, `Wystawa i wydarzenia/${file}`, w as number, h as number, i)),
];

export const home: HomePage = {
  lead: t("Maluję od ponad 30 lat, najchętniej akwarelą. Zapisuję chwilowe wrażenia: morze, żagle, światło miast i twarze ludzi.",
    "I have been painting for over 30 years, most often in watercolour. I record fleeting impressions: the sea, sails, the light of cities and people's faces."),
  stagePaintingIds: ["zagle", "italia", "chopin", "lilie-wodne"],
  letter: [
    t("Mówią o mnie: kolorystka o cienkiej kresce. W obrazach łączę impresję z realizmem.",
      "People call me a colourist with a fine line. In my paintings I bring together impression and realism."),
    t("Inspirują mnie podróże, ludzie, architektura i muzyka. Zanim obraz powstanie, zbieram wrażenia i układam z nich projekt, który dopiero potem przenoszę na płótno.",
      "I am inspired by travel, people, architecture and music. Before a painting exists, I gather impressions and shape them into an idea, which only later goes onto the canvas."),
    t("Sztuka jest dla mnie istotna wtedy, kiedy zmienia w nas myślenie, zarówno twórcy, jak i odbiorcy.",
      "To me, art matters when it changes the way we think, both the artist's and the viewer's."),
  ],
  offers: [
    { title: t("Portret na zamówienie", "Commissioned portrait"), href: "/portrety-energetyczne", linkLabel: t("Jak zamówić portret", "How to commission"),
      text: t("Namaluję portret bliskiej osoby na podstawie zdjęć i rozmowy o niej.", "I paint a portrait of someone close to you from photographs and a conversation about them.") },
    { title: t("Zajęcia z rysunku i malarstwa", "Drawing and painting classes"), href: "/edukacja", linkLabel: t("O zajęciach", "About the classes"),
      text: t("Uczę rysunku, kompozycji i koloru. Przygotowuję do egzaminów do szkół artystycznych.", "I teach drawing, composition and colour, and prepare students for art school exams.") },
    { title: t("Spotkanie autorskie", "Artist talk"), href: "/spotkania-autorskie", linkLabel: t("O spotkaniach", "About the talks"),
      text: t("Przyjadę do galerii, biblioteki, szkoły lub klubu z obrazami i poezją.", "I come to galleries, libraries, schools and clubs with paintings and poetry.") },
  ],
};

// Menu główne. Nowa zakładka = nowy wpis tutaj + folder w src/app/<slug>/page.tsx.
export const navigation: NavItem[] = [
  { label: t("Portfolio", "Portfolio"), href: "/portfolio" },
  { label: t("Portrety", "Portraits"), href: "/portrety-energetyczne" },
  { label: t("O Autorce", "About the artist"), href: "/o-autorce" },
  { label: t("Aktualności", "News"), href: "/aktualnosci" },
  { label: t("Spotkania autorskie", "Artist talks"), href: "/spotkania-autorskie" },
  { label: t("Edukacja", "Education"), href: "/edukacja" },
];

// Nagłówki podstron (klucz = slug w adresie): tytuł i jedno zdanie, co tu jest.
export const pageHeaders: Record<string, PageHeader> = {
  portfolio: { title: t("Portfolio", "Portfolio"),
    lead: t("Obrazy z ośmiu serii: od żaglowców i morza po portrety, kwiaty i abstrakcje. Kliknij obraz, żeby go powiększyć.", "Paintings from eight series. Click a painting to enlarge it.") },
  "o-autorce": { title: t("O Autorce", "About the artist"),
    lead: t("Malarka i akwarelistka. Od ponad 30 lat maluję morze i żaglowce, miasta, portrety i kwiaty.", "Painter and watercolourist for over 30 years.") },
  aktualnosci: { title: t("Aktualności", "News"),
    lead: t("Gdzie teraz można zobaczyć moje obrazy i co nowego w pracowni.", "Where to see my paintings now and what's new in the studio.") },
  "spotkania-autorskie": { title: t("Spotkania autorskie", "Artist talks"),
    lead: t("Spotkania literacko-malarskie: pokazuję obrazy i czytam swoją poezję.", "Literary and painting events: I show my paintings and read my poetry.") },
  edukacja: { title: t("Edukacja", "Education"),
    lead: t("Zajęcia z rysunku i malarstwa oraz przygotowanie do egzaminów do szkół artystycznych.", "Drawing and painting classes and art school exam preparation.") },
  kontakt: { title: t("Kontakt", "Contact"),
    lead: t("Zapraszam do kontaktu w sprawie obrazów, portretów, spotkań autorskich i zajęć. Odpowiadam na każdą wiadomość.", "Get in touch about paintings, portraits, artist talks or classes. I answer every message.") },
};

// Treść prostych podstron (klucz = slug w adresie).
export const contentPages: Record<string, ContentPage> = {
  edukacja: {
    body: [
      t("Jestem pedagogiem z wykształcenia i z zamiłowania. Przygotowuję młodzież do egzaminów do szkół artystycznych: uczę rysunku, kompozycji i pracy z kolorem.",
        "I am a teacher by training and by passion. I prepare young people for art school entrance exams, teaching drawing, composition and working with colour."),
      t("Tworzę akwarelowe ilustracje do ćwiczeń i podręczników szkolnych. Przygotowałam też zarys podręcznika „Podstawy historii sztuki”.",
        "I create watercolour illustrations for school workbooks and textbooks, and I drafted the outline of a textbook, \"Foundations of Art History\"."),
      t("Organizuję konkursy plastyczne i koordynuję projekt Strefa Aktywności.",
        "I organise art competitions and coordinate the Strefa Aktywności (Activity Zone) project."),
    ],
    topics: [
      { title: t("Przygotowanie do egzaminów", "Exam preparation"),
        text: t("Przygotowuję młodzież do egzaminów do szkół artystycznych: uczę rysunku, kompozycji i pracy z kolorem.", "I prepare young people for art school entrance exams.") },
      { title: t("Ilustracje i podręczniki", "Illustrations and textbooks"),
        text: t("Tworzę akwarelowe ilustracje do ćwiczeń i podręczników szkolnych. Przygotowałam też zarys podręcznika „Podstawy historii sztuki”.", "I create watercolour illustrations for school textbooks.") },
      { title: t("Konkursy i Strefa Aktywności", "Competitions and Strefa Aktywności"),
        text: t("Organizuję konkursy plastyczne i koordynuję projekt Strefa Aktywności.", "I organise art competitions and coordinate the Strefa Aktywności project.") },
    ],
    contact: { sentence: t("Zajęcia prowadzę indywidualnie i w grupach, w pracowni i w plenerze.", "Classes for individuals and groups, in the studio and outdoors."),
      question: t("Chcesz umówić lekcje?", "Would you like to book lessons?"), subject: "Zajęcia z rysunku i malarstwa" },
    photoId: "edukacja-2",
    gallery: { title: t("Z zajęć", "From the classes"), photoIds: ["edukacja-2", "edukacja-1"] },
  },
  "spotkania-autorskie": {
    body: [
      t("Maluję i piszę. Na spotkaniach literacko-malarskich pokazuję obrazy i czytam swoją poezję. W 2023 roku, na 30-lecie pracy twórczej, wydałam tomik prozy poetyckiej „Druga Strona Ciszy”.",
        "I paint and I write. At my literary and painting events I show my paintings and read my poetry. In 2023, to mark 30 years of creative work, I published a collection of poetic prose, \"Druga Strona Ciszy\" (The Other Side of Silence)."),
    ],
    listTitle: t("Dotychczasowe spotkania", "Past events"),
    items: [
      { year: 2024, title: t("Spotkanie autorskie literacko-malarskie", "Literary and painting event"), place: "Galeria Sztuki Rosen ART, Sopot" },
      { year: 2023, title: t("Spotkanie autorskie literacko-malarskie", "Literary and painting event"), place: "Super Yachts Club, Gdynia" },
    ],
    contact: { sentence: t("Chętnie przyjadę na spotkanie do galerii, biblioteki, szkoły lub klubu.", "I'm happy to come for a talk at a gallery, library, school or club."),
      question: t("Chcesz zaprosić mnie na spotkanie?", "Would you like to invite me?"), subject: "Spotkanie autorskie" },
    photoId: "wydarzenie-8",
  },
  aktualnosci: {
    body: [],
    items: [
      { year: 2025, title: t("Ekspozycja stała w Club Golfowy", "Permanent display at the Golf Club"), place: "Gdynia",
        text: t("Moje obrazy można oglądać na stałej ekspozycji w Club Golfowy w Gdyni. Zapraszam!", "My paintings are on permanent display at the Golf Club in Gdynia. Do come and see them!") },
      { year: 2024, title: t("Galeria Sztuki Ado-Art", "Ado-Art Gallery"), place: "Gdynia, Warszawa",
        text: t("Moje obrazy pokazuje Galeria Sztuki Ado-Art w Gdyni i w Warszawie.", "My paintings are on show at the Ado-Art Gallery in Gdynia and Warsaw.") },
    ],
    gallery: { title: t("Z wystaw i wydarzeń", "From exhibitions and events"), photoIds: Array.from({ length: 13 }, (_, i) => `wydarzenie-${i + 1}`) },
  },
  kontakt: {
    body: [],
    photoId: "sesja-3",
  },
};

// TEKST PRZYKŁADOWY (do potwierdzenia przez autorkę): opis, kroki i czas realizacji.
export const portraitsPage: ServicePage = {
  slug: "portrety-energetyczne",
  title: t("Portrety na zamówienie", "Commissioned portraits"),
  lead: t("Namaluję portret bliskiej osoby na podstawie zdjęć i rozmowy o niej. To dobry pomysł na prezent i pamiątkę na lata.",
    "I paint a portrait of someone close to you from photographs and a conversation about them."),
  paintingId: "drzewo-zycia",
  body: [
    t("Portrety maluję od ponad 30 lat. Za portret Fryderyka Chopina otrzymałam drugą nagrodę w międzynarodowym konkursie Galerii Eclusier w Londynie.",
      "I have painted portraits for over 30 years. My portrait of Fryderyk Chopin won second prize at the Eclusier Gallery in London."),
    t("Portret nie jest kopią fotografii. Szukam w nim charakteru osoby: jej pasji, ulubionych miejsc i kolorów. Dlatego zanim zacznę malować, chcę tę osobę poznać, choćby z Twojej opowieści.",
      "A portrait is not a copy of a photograph. I look for the person's character: their passions, favourite places and colours."),
  ],
  steps: [
    { title: t("Napisz lub zadzwoń", "Get in touch"),
      text: t("Opowiedz, kogo chcesz sportretować i na jaką okazję. Ustalimy format i technikę.", "Tell me who the portrait is of and for what occasion. We agree the size and technique.") },
    { title: t("Prześlij zdjęcia i kilka słów", "Send photos and a few words"),
      text: t("Kilka zdjęć portretowanej osoby i parę zdań o niej: co lubi, czym się zajmuje.", "A few photographs and a few sentences about the person.") },
    { title: t("Maluję portret", "I paint the portrait"),
      text: t("Gotowy obraz sygnuję i opisuję tytułem oraz datą. Umówimy się na odbiór lub wysyłkę.", "The finished painting is signed, titled and dated. We arrange collection or delivery.") },
  ],
  needs: {
    title: t("Czego potrzebuję", "What I need"),
    items: [
      t("Kilka zdjęć portretowanej osoby", "A few photographs of the person"),
      t("Kilka słów o tej osobie", "A few words about the person"),
      t("Jej zainteresowania i pasje", "Interests, passions"),
      t("Ulubione miejsca i kolory", "Favourite places, colours"),
    ],
  },
  galleryTitle: t("Wybrane portrety", "Selected portraits"),
  galleryPaintingIds: ["chopin", "chopin-2", "drzewo-zycia", "muzycy", "postac-fb", "postac-wa19", "postac-wa25"],
};
