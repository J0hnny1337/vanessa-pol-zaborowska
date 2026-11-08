// Treść strony (teksty, serie, obrazy, wystawy). Zmiany robi się tutaj; data.ts układa to dla komponentów.
import type { ContentPage, HomePage, NavItem, PageHeader, Painting, Photo, PrivacyPolicy, Series, ServicePage, SiteSettings } from "./source-types";

const t = (pl: string, en: string) => ({ pl, en });

export const site: SiteSettings = {
  artistName: "Vanessa Pol-Zaborowska",
  tagline: t("Malarstwo · Akwarela · Marynistyka", "Painting · Watercolour · Marine art"),
  portraitPhotoId: "sesja-4",
  exhibitionPhotoIds: Array.from({ length: 13 }, (_, i) => `wydarzenie-${i + 1}`), // do podmiany na zdjęcia z wystaw
  email: "vanessapol.art102@gmail.com",
  social: [
    { label: "Instagram", url: "https://www.instagram.com/vanessapol_art/" },
    { label: "Facebook", url: "https://www.facebook.com/krystyna.kmieciak" },
  ],
  portfolioPdfUrl: undefined,
  bio: [
    t("Ukończyła Wydział Pedagogiki Artystycznej UAM w Poznaniu, gdzie studiowała malarstwo, rzeźbę, grafikę, architekturę i rysunek. Jest rzeczoznawcą malarstwa.",
      "She graduated from the Faculty of Art Education at Adam Mickiewicz University in Poznań, where she studied painting, sculpture, printmaking, architecture and drawing. She is a certified painting appraiser."),
    t("Maluje od ponad 30 lat. Mówią o niej: kolorystka o cienkiej kresce. W obrazach łączy impresję, czyli zapis chwilowego wrażenia, z realizmem. Maluje akwarelą, piórem i tuszem, akrylem oraz w technikach mieszanych. Nie lubi stać w miejscu: wciąż szuka, odkrywa i zaczyna od nowa.",
      "She has been painting for over 30 years. People call her a colourist with a fine line. In her paintings she brings together impression, the record of a fleeting sensation, and realism. She works in watercolour, pen and ink, acrylic and mixed media. She doesn't like standing still: she keeps searching, discovering and starting anew."),
    t("Inspirują ją podróże, spotkania z ciekawymi ludźmi, architektura i muzyka. Szkicuje i fotografuje. Słucha muzyki klasycznej, jazzu i bluesa. Pisze też liryki, scenariusze i poezję. Obraz, jak każdy proces twórczy, potrzebuje czasu, refleksji i spokoju. Zanim powstanie, artystka zbiera wrażenia i układa z nich projekt, który dopiero potem przenosi na płótno.",
      "She is inspired by travel, by meeting interesting people, by architecture and by music. She sketches and takes photographs. She listens to classical music, jazz and blues, and also writes lyrics, screenplays and poetry. Like any creative process, a painting needs time, reflection and calm. Before it exists, she gathers impressions and shapes them into an idea, which only later goes onto the canvas."),
    t("Bierze udział w plenerach i wystawach zbiorowych w całej Polsce, m.in. w Poznaniu, Pile, Koszalinie, Warszawie i Kołobrzegu, i pokazuje swoje prace na wystawach indywidualnych. Za portret Fryderyka Chopina otrzymała drugą nagrodę w międzynarodowym konkursie Galerii Eclusier w Londynie. Wyróżnienie przyniósł jej też obraz „Ekspresja. Szare jest ok” (akryl na płycie, 70 × 50 cm) na X Poznańskim Salonie ZNP „Robinsonada”. Jej obrazy trafiły do zbiorów prywatnych w Polsce i za granicą. Jej sylwetkę zamieszczono w XII i XIII wydaniu encyklopedii „Who is Who”.",
      "She takes part in plein-air workshops and group exhibitions across Poland, including Poznań, Piła, Koszalin, Warsaw and Kołobrzeg, and shows her work in solo exhibitions. Her portrait of Fryderyk Chopin won second prize in an international competition held by the Eclusier Gallery in London. Her painting \"Ekspresja. Szare jest ok\" (acrylic on board, 70 × 50 cm) received a distinction at the 10th Poznań Salon of the Polish Teachers' Union (ZNP), \"Robinsonada\". Her paintings are in private collections in Poland and abroad. Her profile appears in the 12th and 13th editions of the \"Who is Who\" encyclopaedia."),
  ],
  // Cytaty artystki, zmieniają się po kolei na stronie głównej i na stronie O Autorce.
  quotes: [
    t("Sztuka dla mnie jest istotna wtedy, kiedy zmienia myślenie zarówno twórcy, jak i odbiorcy. Obraz musi być widzialny. Obrazy są otwarte, bo budują wyobraźnię.",
      "To me, art matters when it changes the way both the artist and the viewer think. A painting must be seen. Paintings are open, because they build imagination."),
    t("Kiedy rysuję, wszystko wydaje się bardzo proste. Rysunek to jednocześnie niedoceniona forma wypowiedzi.",
      "When I draw, everything seems very simple. Drawing is also an underrated form of expression."),
    t("Eksploruję swoje pomysły w sztukę.", "I explore my ideas through art."),
    t("Sztuka nie jest tylko luksusem. Oddziałuje na odbiorcę, buduje wyobraźnię, a to rozwija poczucie szczęścia.",
      "Art is not just a luxury. It affects the viewer and builds imagination, and that nurtures a sense of happiness."),
  ],
  // Czym się zajmuje: lista pod akapitem o wykształceniu (strona O Autorce).
  work: [
    t("Organizuje wystawy w całej Polsce i jest ich kuratorką.", "She organises and curates exhibitions across Poland."),
    t("Ilustruje książki, ćwiczenia i podręczniki szkolne, projektuje okładki płyt i inne grafiki.", "She illustrates books, workbooks and school textbooks, and designs album covers and other graphics."),
    t("Przygotowała zarys podręcznika „Podstawy historii sztuki”.", "She drafted the outline of a textbook, \"Foundations of Art History\"."),
    t("Organizuje konkursy plastyczne i koordynuje projekt Strefa Aktywności.", "She organises art competitions and coordinates the Strefa Aktywności project."),
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
    { label: t("Polityka prywatności", "Privacy policy"), href: "/polityka-prywatnosci" },
  ],
  cta: {
    title: t("Zamów obraz", "Commission a painting"),
    buttonLabel: t("Zamów obraz", "Commission a painting"),
    href: "/kontakt?temat=Obraz%20na%20zam%C3%B3wienie#formularz",
  },
};

// Szare odcienie dla prostokątów zastępczych, żeby sąsiednie miejsca się odróżniały.
const greys = ["#d9d6d1", "#cfcdc8", "#d6d2cc", "#d4d0c8", "#cdcac4", "#d8d5d0", "#d1cec9"];
const grey = (i: number) => greys[i % greys.length];

export const series: Series[] = [
  { id: "marynistyka", name: t("Marynistyka", "Marine art"), years: "", order: 1 },
  { id: "pejzaz", name: t("Pejzaż", "Landscape"), years: "", order: 2 },
  { id: "portret", name: t("Portret", "Portrait"), years: "", order: 3 },
  { id: "martwa-natura", name: t("Martwa natura", "Still life"), years: "", order: 4 },
  { id: "zwierzeta", name: t("Zwierzęta", "Animals"), years: "", order: 5 },
  { id: "akwarele-golfowe", name: t("Akwarele golfowe", "Golf watercolours"), years: "", order: 6 },
  { id: "abstrakcje", name: t("Abstrakcje", "Abstracts"), years: "", order: 7 },
];

// Jeden wpis = jeden plik z folderu "zdjęcia-malarka/Obrazy/<folder>".
// Tytuły robocze wzięte z nazw plików; rok, wymiary i technikę uzupełnimy później.
// Proporcje (szer. / wys.) wzięte z wymiarów zdjęć.
// `after` = ile obrazów tej serii jest już wyżej (gdy seria zbiera obrazy z kilku folderów).
type Row = [id: string, title: string, file: string, w: number, h: number];
const inSeries = (seriesId: string, folder: string, rows: Row[], after = 0): Painting[] =>
  rows.map(([id, title, file, w, h], i) => ({
    id, title, seriesId, ratio: `${w} / ${h}`, status: "available", placeholder: grey(after + i),
    source: `Obrazy/${folder}/${file}`, order: after + i + 1,
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
  ...inSeries("marynistyka", "Morze i plaża", [
    ["impresja", "Impresja", "impresjaStyczen.jpg", 11843, 8757],
    ["impresja-2", "Impresja II", "kwiecienImpresja.jpg", 800, 1136],
    ["impresja-3", "Impresja III", "majImpresja2.jpg", 3426, 2865],
    ["morze-fb", "", "FB_IMG_1751661735241.jpg", 1536, 2048],
  ], 10),
  ...inSeries("pejzaz", "Pejzaże i miasta", [
    ["italia", "Italia", "ItaliaCzerwiec.jpg", 15950, 11080],
    ["grecja", "Grecja", "GrecjaMarzec.jpg", 7006, 9945],
    ["paryz", "Paryż", "paryzLuty.jpg", 1772, 1772],
    ["paryz-2", "Paryż II", "lipiecParyz.jpg", 1772, 1772],
    ["paryz-3", "Paryż III", "sierpienParyz.jpg", 1772, 1772],
    ["paryz-4", "Paryż IV", "paryzPazdziernik.jpg", 1772, 1772],
    ["pejzaz-fb", "", "FB_IMG_1750009376851.jpg", 960, 1280],
  ]).concat(
    inSeries("pejzaz", "Pejzaże i miasta", [["szkocja-pejzaz", "Szkocja", "szkocjaPejzaz.jpg", 620, 620]], 7)
      .map((p) => ({ ...p, order: 2.5, technique: t("Akwarela", "Watercolour") })), // zaraz po „Grecji”, żeby był widoczny bez rozwijania
  ),
  ...inSeries("portret", "Portrety i postacie", [
    ["chopin", "Chopin", "ChopinGrudzien.jpg", 13206, 9716],
    ["chopin-2", "Chopin II", "styczenChopin.jpg", 3761, 3001],
    ["drzewo-zycia", "Drzewo życia", "pazdziernikDzrzewoZycia.jpg", 2331, 3152],
    ["muzycy", "Muzycy", "muzycyWrzesien.jpg", 2480, 1754],
    ["akt", "Akt", "aktKwiecien.JPG", 1535, 2126],
    ["postac-fb", "", "FB_IMG_1751129963038.jpg", 1504, 2015],
    ["postac-wa19", "", "IMG-20250713-WA0019.jpg", 1200, 1600],
    ["postac-wa25", "", "IMG-20250713-WA0025.jpg", 1200, 1600],
    ["portret-w-galerii", "", "portret-w-galerii.jpg", 900, 1600],
  ]),
  ...inSeries("martwa-natura", "Kwiaty", [
    ["lilie-wodne", "Lilie wodne", "lilieWodneMaj.jpg", 8903, 8111],
    ["kwiaty-fb", "", "FB_IMG_1744314435555.jpg", 720, 960],
  ]),
  ...inSeries("zwierzeta", "Konie i zwierzęta", [
    ["konie-1", "", "20260616_142640.jpg", 3060, 4080],
    ["konie-2", "", "20260616_203536.jpg", 3060, 4080],
    ["konie-fb", "", "FB_IMG_1739215377929.jpg", 1080, 1440],
  ]),
  ...inSeries("akwarele-golfowe", "Golf", [
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
    ["abstrakcja-czerwien", "", "abstrakcja-czerwien.jpg", 1200, 1600],
    ["abstrakcja-w-ramie", "", "abstrakcja-w-ramie.png", 381, 333],
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
  photo("wywiad", "Wystawa i wydarzenia/wywiad-na-wystawie.jpg", 1080, 1080, 3),
  photo("spotkanie-syc", "Wystawa i wydarzenia/spotkanie-super-yachts-club.jpg", 543, 724, 4),
  photo("turniej-ug", "Wystawa i wydarzenia/turniej-ug-golf-club.jpg", 1600, 1200, 5),
  photo("wystawa-sand-valley", "Wystawa i wydarzenia/wystawa-sand-valley.jpg", 1200, 1600, 6),
  ...[
    ["FB_IMG_1750537266390.jpg", 1366, 2048], ["FB_IMG_1753471457652.jpg", 1440, 960], ["FB_IMG_1753471490826.jpg", 1440, 960],
    ["FB_IMG_1758523641417.jpg", 1080, 1080], ["FB_IMG_1761856127797.jpg", 2000, 1133], ["FB_IMG_1761856137990.jpg", 2000, 1834],
    ["FB_IMG_1761856145690.jpg", 2000, 1476], ["FB_IMG_1761856160927.jpg", 2000, 1583], ["FB_IMG_1761856166111.jpg", 2000, 1580],
    ["FB_IMG_1773326467397.jpg", 1312, 640], ["IMG-20250625-WA0000.jpg", 1600, 1200], ["IMG-20250625-WA0004.jpg", 1600, 1200],
    ["IMG-20250625-WA0007.jpg", 1600, 1200],
  ].map(([file, w, h], i) => photo(`wydarzenie-${i + 1}`, `Wystawa i wydarzenia/${file}`, w as number, h as number, i)),
];

export const home: HomePage = {
  lead: t("Na przestrzeni lat nadal cechuje ją duża swoboda twórcza i ciekawość, z jaką opowiada, edukując. Kreuje tę ciekawość również na spotkaniach autorskich.",
    "Over the years she has kept her great creative freedom and the curiosity with which she tells stories while teaching. She sparks that curiosity at author meetings, too."),
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
    { title: t("Obraz na zamówienie", "Commissioned painting"), href: "/obrazy-na-zamowienie", linkLabel: t("Jak zamówić obraz", "How to commission"),
      text: t("Obraz namalowany specjalnie dla Ciebie: na wybrany temat albo jako nowa wersja pracy z portfolio.", "A painting made especially for you: on a subject you choose, or as a new version of a portfolio work.") },
    { title: t("Zajęcia z rysunku i malarstwa", "Drawing and painting classes"), href: "/edukacja", linkLabel: t("O zajęciach", "About the classes"),
      text: t("Nauczysz się rysunku, kompozycji i pracy z kolorem. Przygotujesz się do egzaminów do szkół artystycznych.", "You will learn drawing, composition and colour, and prepare for art school exams.") },
    { title: t("Spotkanie autorskie", "Artist talk"), href: "/spotkania-autorskie", linkLabel: t("O spotkaniach", "About the talks"),
      text: t("Artystka przyjedzie do Twojej galerii, biblioteki, szkoły lub klubu z obrazami i poezją.", "The artist comes to your gallery, library, school or club with paintings and poetry.") },
  ],
};

// Menu główne. Nowa zakładka = nowy wpis tutaj + folder w src/app/<slug>/page.tsx.
export const navigation: NavItem[] = [
  { label: t("Portfolio", "Portfolio"), href: "/portfolio" },
  { label: t("Na zamówienie", "Commissions"), href: "/obrazy-na-zamowienie" },
  { label: t("O Autorce", "About the artist"), href: "/o-autorce" },
  { label: t("Aktualności", "News"), href: "/aktualnosci" },
  { label: t("Spotkania autorskie", "Artist talks"), href: "/spotkania-autorskie" },
  { label: t("Edukacja", "Education"), href: "/edukacja" },
];

// Nagłówki podstron (klucz = slug w adresie): tytuł i jedno zdanie, co tu jest.
export const pageHeaders: Record<string, PageHeader> = {
  portfolio: { title: t("Portfolio", "Portfolio"),
    lead: t("Obrazy z siedmiu serii: od marynistyki i pejzażu po portret, martwą naturę i abstrakcje. Kliknij obraz, żeby go powiększyć.", "Paintings from seven series. Click a painting to enlarge it.") },
  "o-autorce": { title: t("O Autorce", "About the artist"),
    lead: t("Pedagog i rzeczoznawca malarstwa. Od ponad 30 lat maluje morze i żaglowce, miasta, portrety i kwiaty.", "Art teacher and certified painting appraiser. For over 30 years she has painted the sea and tall ships, cities, portraits and flowers.") },
  aktualnosci: { title: t("Aktualności", "News"),
    lead: t("W pracowni powstaje album „Architektura Trójmiasta” w technice akwareli. Vanessa tworzy też ilustracje do „Podstaw historii sztuki”, a w malarstwie rozwija nowy nurt: abstrakcyjny impresjonizm.",
      "An album, \"Architecture of the Tricity\", is taking shape in the studio in watercolour. Vanessa is also illustrating \"Foundations of Art History\", and in her painting she is developing a new direction: abstract impressionism.") },
  "spotkania-autorskie": { title: t("Spotkania autorskie", "Artist talks"),
    lead: t("Spotkania literacko-malarskie: artystka pokazuje obrazy i czyta swoją poezję.", "Literary and painting events: the artist shows her paintings and reads her poetry.") },
  edukacja: { title: t("Edukacja", "Education"),
    lead: t("Zajęcia z rysunku i malarstwa z zastosowaniem wszystkich technik oraz przygotowanie do egzaminów do szkół artystycznych.", "Drawing and painting classes in every technique and art school exam preparation.") },
  kontakt: { title: t("Kontakt", "Contact"),
    lead: t("Napisz w sprawie zakupu obrazu, obrazu na zamówienie, spotkań autorskich i zajęć. Na każdą wiadomość dostaniesz odpowiedź.", "Get in touch about buying or commissioning a painting, artist talks or classes. Every message gets an answer.") },
};

// Treść prostych podstron (klucz = slug w adresie).
export const contentPages: Record<string, ContentPage> = {
  edukacja: {
    body: [
      t("Jest pedagogiem z wykształcenia i z zamiłowania. Przygotowuje młodzież do egzaminów do szkół artystycznych: uczy rysunku, kompozycji i pracy z kolorem.",
        "She is a teacher by training and by passion. She prepares young people for art school entrance exams, teaching drawing, composition and working with colour."),
      t("Tworzy akwarelowe ilustracje do ćwiczeń i podręczników szkolnych. Przygotowała też zarys podręcznika „Podstawy historii sztuki”.",
        "She creates watercolour illustrations for school workbooks and textbooks, and drafted the outline of a textbook, \"Foundations of Art History\"."),
      t("Organizuje konkursy plastyczne i koordynuje projekt Strefa Aktywności.",
        "She organises art competitions and coordinates the Strefa Aktywności (Activity Zone) project."),
    ],
    topics: [
      { title: t("Przygotowanie do egzaminów", "Exam preparation"),
        text: t("Przygotowuje młodzież do egzaminów do szkół artystycznych: uczy rysunku, kompozycji i pracy z kolorem.", "She prepares young people for art school entrance exams.") },
      { title: t("Ilustracje i podręczniki", "Illustrations and textbooks"),
        text: t("Tworzy akwarelowe ilustracje do ćwiczeń i podręczników szkolnych. Przygotowała też zarys podręcznika „Podstawy historii sztuki”.", "She creates watercolour illustrations for school textbooks.") },
      { title: t("Konkursy i Strefa Aktywności", "Competitions and Strefa Aktywności"),
        text: t("Organizuje konkursy plastyczne i koordynuje projekt Strefa Aktywności.", "She organises art competitions and coordinates the Strefa Aktywności project.") },
    ],
    lessons: {
      title: t("Czego nauczysz się na zajęciach indywidualnych", "What you will learn in individual lessons"),
      items: [
        { title: t("Historii sztuki", "Art history"),
          text: t("Korepetycje z historii sztuki: epoki, style i kierunki od antyku po sztukę współczesną. Nauczysz się rozpoznawać, opisywać i analizować dzieło.",
            "Art history tutoring: periods, styles and movements from antiquity to contemporary art. You will learn to recognise, describe and analyse a work.") },
        { title: t("Teorii i działania praktycznego", "Theory and hands-on practice"),
          text: t("Lekcje rysunku i malarstwa od podstaw: kompozycja, perspektywa, światłocień i kolor, w pracowni i w plenerze.",
            "Drawing and painting lessons from the basics: composition, perspective, light and shade, and colour, in the studio and outdoors."),
          points: {
            lead: t("Przygotowanie portfolio (teczki) na egzaminy do szkół artystycznych:", "Portfolio preparation for art school entrance exams:"),
            items: [
              t("architektura", "architecture"), t("rzeźba", "sculpture"), t("grafika", "printmaking and graphic design"),
              t("projektowanie wnętrz", "interior design"), t("malarstwo", "painting"), t("rysunek", "drawing"), t("kompozycja", "composition"),
            ],
          } },
        { title: t("Zastosowania wszystkich technik plastycznych", "Using every art technique"),
          text: t("Nauka akwareli, rysunku piórem i tuszem, malarstwa akrylem oraz technik mieszanych. Każdą technikę poznasz w praktyce, od pierwszych prób po własny styl.",
            "Watercolour, pen and ink drawing, acrylic painting and mixed media. You learn each technique in practice, from first attempts to your own style.") },
      ],
    },
    contact: { sentence: t("Zajęcia odbywają się indywidualnie i w grupach, w pracowni i w plenerze.", "Classes for individuals and groups, in the studio and outdoors."),
      question: t("Chcesz umówić lekcje?", "Would you like to book lessons?"), subject: "Zajęcia z rysunku i malarstwa" },
    photoId: "edukacja-2",
    gallery: { title: t("Z zajęć", "From the classes"), photoIds: ["edukacja-2", "edukacja-1"] },
  },
  "spotkania-autorskie": {
    body: [
      t("Vanessa maluje i pisze. Na spotkaniach literacko-malarskich pokazuje obrazy i czyta swoją poezję. W 2023 roku, na 30-lecie pracy twórczej, wydała tomik prozy poetyckiej „Druga Strona Ciszy”.",
        "Vanessa paints and writes. At her literary and painting events she shows her paintings and reads her poetry. In 2023, to mark 30 years of creative work, she published a collection of poetic prose, \"Druga Strona Ciszy\" (The Other Side of Silence)."),
    ],
    listTitle: t("Dotychczasowe spotkania", "Past events"),
    items: [
      { year: 2024, title: t("Spotkanie autorskie literacko-malarskie", "Literary and painting event"), place: "Galeria Sztuki Rosen ART, Sopot" },
      { year: 2023, title: t("Spotkanie autorskie literacko-malarskie", "Literary and painting event"), place: "Super Yachts Club, Gdynia" },
    ],
    contact: { sentence: t("Artystka chętnie przyjedzie na spotkanie do Twojej galerii, biblioteki, szkoły lub klubu.", "The artist is happy to come for a talk at your gallery, library, school or club."),
      question: t("Chcesz zaprosić artystkę na spotkanie?", "Would you like to invite the artist?"), subject: "Spotkanie autorskie" },
    photoId: "spotkanie-syc",
  },
  aktualnosci: {
    body: [],
    upcoming: {
      title: t("Najbliższe spotkania", "Upcoming events"),
      items: [
        { year: 2026, title: t("Spotkanie autorskie literacko-malarskie", "Literary and painting event"), place: "„Do Brzegu” Yachts Club, Sopot",
          text: t("Listopad 2026. Dokładny termin pojawi się wkrótce.", "November 2026. The exact date will be announced soon.") },
        { year: 2026, title: t("Spotkanie autorskie literacko-malarskie", "Literary and painting event"), place: "Forma Collection, al. Zwycięstwa 239 (róg ul. Popiela), Gdynia Orłowo",
          text: t("Listopad 2026. Dokładny termin pojawi się wkrótce.", "November 2026. The exact date will be announced soon.") },
      ],
    },
    items: [
      { year: 2025, title: t("Ekspozycja stała w Club Golfowy", "Permanent display at the Golf Club"), place: "Gdynia",
        text: t("Obrazy Vanessy możesz oglądać na stałej ekspozycji w Club Golfowy w Gdyni.", "Vanessa's paintings are on permanent display at the Golf Club in Gdynia.") },
      { year: 2024, title: t("Galeria Sztuki Ado-Art", "Ado-Art Gallery"), place: "Gdynia, Warszawa",
        text: t("Obrazy Vanessy pokazuje Galeria Sztuki Ado-Art w Gdyni i w Warszawie.", "Vanessa's paintings are on show at the Ado-Art Gallery in Gdynia and Warsaw.") },
    ],
    gallery: { title: t("Z wystaw i wydarzeń", "From exhibitions and events"), photoIds: Array.from({ length: 13 }, (_, i) => `wydarzenie-${i + 1}`) },
  },
  kontakt: {
    body: [],
    photoId: "wywiad",
  },
};

// Polityka prywatności (tylko PL). Sekcja = nagłówek, akapity i opcjonalna lista punktów.
// Dane administratora: jeśli „Vanessa Pol-Zaborowska” to pseudonim, wpisz tu imię i nazwisko lub firmę (z adresem i NIP-em).
export const privacyPolicy: PrivacyPolicy = {
  updated: "8 listopada 2026",
  intro: "Ta strona to wizytówka artystki. Ma formularz kontaktowy, ale nie ma kont ani sklepu i nie śledzi odwiedzających. Jedyne cookies pojawiają się przy formularzu, i to tylko za Twoją zgodą. Poniżej znajdziesz informację, jakie dane mogą trafić do artystki i co się z nimi dzieje.",
  sections: [
    { id: "administrator", title: "Kto jest administratorem danych", body: [
      "Administratorem Twoich danych jest Vanessa Pol-Zaborowska.",
      "Kontakt w sprawie danych: przez formularz w zakładce Kontakt albo wiadomością na profilu artystki na Instagramie lub Facebooku (linki na dole każdej strony). Do wysłania formularza potrzebna jest zgoda na Google reCAPTCHA, a wiadomość przez Instagram lub Facebook jej nie wymaga.",
    ] },
    { id: "dane", title: "Jakie dane i skąd", items: [
      "Gdy piszesz do artystki przez formularz kontaktowy: Twój adres e-mail, imię i nazwisko oraz treść wiadomości (w formularzu także wybrana sprawa i tytuł obrazu). Przy obrazie na zamówienie także zdjęcia i informacje, które przekażesz, na przykład zdjęcia miejsca, które ma się znaleźć na obrazie.",
      "Gdy zgodzisz się na Google reCAPTCHA i wysyłasz wiadomość przez formularz: dane techniczne o Twojej przeglądarce i urządzeniu (m.in. adres IP, ustawienia przeglądarki, sposób korzystania ze strony) oraz cookies Google. Zbiera je Google, żeby ocenić, czy wiadomość wysyła człowiek, a nie automat.",
      "Gdy oglądasz stronę: serwer hostingu zapisuje techniczne dane o wizycie, takie jak adres IP, typ przeglądarki, czas wejścia i adres podstrony. Artystka z nich nie korzysta. Służą one dostawcy hostingu do działania i ochrony strony.",
    ] },
    { id: "cel", title: "Po co i na jakiej podstawie", items: [
      "Odpowiedź na wiadomość i rozmowa o obrazie, zamówieniu, zajęciach lub spotkaniu: żeby odpowiedzieć na Twoje zapytanie i, jeśli się umówimy, wykonać zamówienie (art. 6 ust. 1 lit. b RODO) albo w uzasadnionym interesie administratora prowadzenia korespondencji (art. 6 ust. 1 lit. f RODO).",
      "Rozliczenia, jeśli dojdzie do sprzedaży lub zamówienia: ze względu na obowiązki wynikające z przepisów podatkowych i rachunkowych (art. 6 ust. 1 lit. c RODO).",
      "Logi serwera: w uzasadnionym interesie zapewnienia działania i bezpieczeństwa strony (art. 6 ust. 1 lit. f RODO).",
      "Google reCAPTCHA: ochrona formularza przed spamem i nadużyciami. Skrypt Google i jego cookies włączają się wyłącznie po Twojej zgodzie (art. 6 ust. 1 lit. a RODO oraz art. 399 ustawy Prawo komunikacji elektronicznej). Zgodę możesz w każdej chwili wycofać, co nie wpływa na zgodność z prawem wcześniejszego przetwarzania.",
    ] },
    { id: "jak-dlugo", title: "Jak długo", items: [
      "Korespondencja jest przechowywana do czasu zakończenia sprawy. Jeśli doszło do zamówienia, jest przechowywana do upływu terminów przedawnienia roszczeń i okresów wymaganych przez przepisy podatkowe.",
      "Zdjęcia przesłane do obrazu na zamówienie są usuwane po jego wykonaniu, chyba że umówicie się inaczej.",
      "Logi serwera są przechowywane przez krótki czas określony przez dostawcę hostingu.",
      "Dane zebrane przez reCAPTCHA i cookies Google są przechowywane przez okres określony przez Google. Cookies możesz usunąć w ustawieniach przeglądarki.",
      "Twój wybór w sprawie zgody na reCAPTCHA (wraz z datą) zostaje w pamięci Twojej przeglądarki, dopóki go nie zmienisz albo nie wyczyścisz danych strony.",
    ] },
    { id: "odbiorcy", title: "Komu dane są przekazywane", items: [
      "Vercel Inc.: hosting strony (logi serwera).",
      "Google: dostawca poczty e-mail artystki (Gmail).",
      "Google Ireland Limited (Gordon House, Barrow Street, Dublin 4, Irlandia), a za jej pośrednictwem Google LLC: usługa reCAPTCHA, tylko jeśli się na nią zgodzisz. Zasady Google: policies.google.com/privacy i policies.google.com/terms.",
      "Resend (Plus Five Five Inc.): usługa, która dostarcza wiadomości z formularza na skrzynkę artystki. Formularz nie zapisuje wiadomości na stronie.",
    ], after: [
      "Wszystkie te firmy mają siedziby w USA albo przekazują dane do spółek w USA. Przekazanie danych odbywa się z zabezpieczeniami wymaganymi przez RODO, np. na podstawie standardowych klauzul umownych lub programu EU-US Data Privacy Framework. Twoje dane nie są sprzedawane ani udostępniane nikomu innemu.",
    ] },
    { id: "cookies", title: "Pliki cookies", body: [
      "Strona nie używa narzędzi analitycznych ani reklamowych. Jedyne cookies to cookies usługi Google reCAPTCHA, która chroni formularz kontaktowy przed spamem. Ładuje się ona tylko na stronie z formularzem i tylko po Twojej zgodzie. Do tego czasu przeglądarka nie łączy się z serwerami Google.",
      "O zgodę pyta baner na stronie Kontakt. Możesz ją przyjąć albo odrzucić, oba wybory są równie proste. Bez zgody strona działa normalnie, ale wiadomości nie wyślesz przez formularz. Możesz wtedy napisać do artystki przez jej profil na Instagramie lub Facebooku.",
      "Swoją decyzję zmienisz lub wycofasz w każdej chwili przyciskiem „Ustawienia cookies” na dole każdej strony. Po wycofaniu zgody strona przeładuje się bez skryptu Google. Cookies, które Google zapisało wcześniej, usuniesz w ustawieniach przeglądarki.",
    ], items: [
      "Cookies Google reCAPTCHA (np. _GRECAPTCHA): ochrona formularza przed automatami, ustawiane przez Google, tylko po zgodzie.",
      "Zapis wyboru zgody (consent-recaptcha) w pamięci przeglądarki: żeby nie pytać ponownie. To nie jest cookie i nie trafia do nikogo.",
      "Zapis wyglądu strony (theme) w pamięci przeglądarki: jasny lub ciemny motyw, jeśli go zmienisz. Zostaje tylko na Twoim urządzeniu.",
    ] },
    { id: "linki", title: "Linki do innych serwisów", body: [
      "Na stronie są linki do profili artystki na Instagramie i Facebooku. Po kliknięciu przechodzisz do tych serwisów i obowiązują Cię ich zasady prywatności.",
    ] },
    { id: "prawa", title: "Twoje prawa", body: ["Masz prawo:"], items: [
      "do dostępu do swoich danych i otrzymania ich kopii,",
      "do ich sprostowania lub usunięcia,",
      "do ograniczenia przetwarzania,",
      "do sprzeciwu wobec przetwarzania,",
      "do przeniesienia danych.",
    ], after: [
      "Wystarczy napisać przez formularz kontaktowy albo przez profil artystki na Instagramie lub Facebooku. Masz też prawo złożyć skargę do Prezesa Urzędu Ochrony Danych Osobowych (ul. Stawki 2, 00-193 Warszawa, uodo.gov.pl).",
      "Podanie danych jest dobrowolne, ale bez adresu e-mail artystka nie będzie mogła Ci odpowiedzieć.",
    ] },
    { id: "zmiany", title: "Zmiany", body: [
      "Jeśli coś się zmieni, na przykład dojdzie sklep, ta polityka zostanie zaktualizowana. Ostatnia zmiana: dodanie Google reCAPTCHA w formularzu kontaktowym.",
    ] },
  ],
};

// TEKST PRZYKŁADOWY (do potwierdzenia przez autorkę): opis, kroki i czas realizacji.
export const commissionsPage: ServicePage = {
  slug: "obrazy-na-zamowienie",
  title: t("Obrazy na zamówienie", "Commissioned paintings"),
  lead: t("Obraz namalowany specjalnie dla Ciebie: na wybrany przez Ciebie temat albo jako nowa wersja pracy z portfolio, która szczególnie Cię poruszyła.",
    "A painting made especially for you: on a subject you choose, or as a new version of a portfolio work that moved you."),
  paintingId: "grecja",
  body: [
    t("Obraz na zamówienie powstaje z myślą o konkretnym miejscu i konkretnej osobie. Może zawisnąć w domu, w biurze albo trafić do kogoś bliskiego jako prezent i pamiątka na lata.",
      "A commissioned painting is made with a particular place and person in mind. It can hang at home or in the office, or go to someone close as a gift to keep for years."),
  ],
  options: [
    { title: t("Obraz według Twojego pomysłu", "A painting from your idea"),
      text: t("Morze, miejsce z podróży, dom rodzinny, ukochane kwiaty albo pole golfowe. Opowiedz, co ma się znaleźć na obrazie, a artystka zaproponuje kompozycję, technikę i format.",
        "The sea, a place from your travels, a family home, favourite flowers or a golf course. Tell her what the painting should show and she will suggest the composition, technique and size.") },
    { title: t("Nowa wersja obrazu z portfolio", "A new version of a portfolio painting"),
      text: t("Jeśli obraz, który Ci się spodobał, jest już sprzedany albo chcesz go w innym rozmiarze, może powstać jego nowa wersja. Każdy obraz powstaje od nowa, więc zachowa charakter oryginału, a zarazem będzie osobną, niepowtarzalną pracą.",
        "If a painting you like has already been sold, or you would like it in a different size, a new version can be painted. Every picture is painted afresh, so it keeps the character of the original while being a separate, one-of-a-kind work.") },
  ],
  steps: [
    { title: t("Napisz", "Get in touch"),
      text: t("Opisz swój pomysł albo wskaż obraz z portfolio. Razem ustalicie temat, technikę, format i termin.", "Describe your idea or point to a painting from the portfolio. Together you agree the subject, technique, size and date.") },
    { title: t("Projekt", "The design"),
      text: t("Zanim zacznie malować, artystka zbiera wrażenia i układa z nich projekt obrazu.", "Before she starts painting, the artist gathers impressions and shapes them into a design.") },
    { title: t("Gotowy obraz", "The finished painting"),
      text: t("Gotowy obraz artystka sygnuje i opisuje tytułem oraz datą. Umówicie się na odbiór lub wysyłkę.", "The finished painting is signed, titled and dated. You arrange collection or delivery.") },
  ],
  needs: {
    title: t("Co warto przygotować", "What to prepare"),
    items: [
      t("Temat obrazu albo tytuł pracy z portfolio", "The subject, or the title of a portfolio painting"),
      t("Przybliżony rozmiar albo miejsce, w którym obraz zawiśnie", "A rough size, or where the painting will hang"),
      t("Zdjęcia, jeśli obraz ma przedstawiać konkretne miejsce", "Photographs, if it should show a particular place"),
      t("Ulubione kolory i nastrój", "Favourite colours and mood"),
      t("Termin, jeśli obraz ma być prezentem na okazję", "A date, if the painting is a gift for an occasion"),
    ],
  },
  galleryTitle: t("Tematy, które mogą powstać dla Ciebie", "Subjects she can paint for you"),
  galleryPaintingIds: ["zagle", "italia", "szkocja-pejzaz", "lilie-wodne", "chopin", "euforia"],
};
