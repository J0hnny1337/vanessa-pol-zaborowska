import path from "path";
import { fileURLToPath } from "url";
import { buildConfig } from "payload";
import { sqliteAdapter } from "@payloadcms/db-sqlite";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";
import { pl } from "@payloadcms/translations/languages/pl";
import sharp from "sharp";
import { Users } from "./collections/Users";
import { Media } from "./collections/Media";
import { Series } from "./collections/Series";
import { Paintings } from "./collections/Paintings";
import { Exhibitions } from "./collections/Exhibitions";
import { News } from "./collections/News";
import { SiteSettings } from "./globals/SiteSettings";
import { HomePage } from "./globals/HomePage";
import { PortfolioPage } from "./globals/PortfolioPage";
import { AboutPage } from "./globals/AboutPage";
import { NewsPage } from "./globals/NewsPage";
import { TalksPage } from "./globals/TalksPage";
import { EducationPage } from "./globals/EducationPage";
import { ContactPage } from "./globals/ContactPage";
import { PortraitsPage } from "./globals/PortraitsPage";
import { simpleEditor } from "./globals/shared";

const dirname = path.dirname(fileURLToPath(import.meta.url));

export default buildConfig({
  admin: {
    user: Users.slug,
    theme: "light", // panel zawsze jasny (domyślnie dopasowuje się do ustawień systemu)
    importMap: { baseDir: path.resolve(dirname) },
    meta: { titleSuffix: " · Panel strony", description: "Panel do edycji strony" },
    components: {
      beforeLogin: ["/components/admin/LoginHint"],
      beforeDashboard: ["/components/admin/Dashboard"],
    },
  },
  collections: [Paintings, Series, Exhibitions, News, Media, Users],
  globals: [HomePage, PortfolioPage, AboutPage, NewsPage, TalksPage, EducationPage, ContactPage, PortraitsPage, SiteSettings],
  editor: simpleEditor,
  secret: process.env.PAYLOAD_SECRET || "",
  // Na produkcji panel przyjmuje żądania tylko z adresu strony (NEXT_PUBLIC_SERVER_URL).
  ...(process.env.NODE_ENV === "production" && process.env.NEXT_PUBLIC_SERVER_URL
    ? { serverURL: process.env.NEXT_PUBLIC_SERVER_URL, cors: [process.env.NEXT_PUBLIC_SERVER_URL], csrf: [process.env.NEXT_PUBLIC_SERVER_URL] }
    : {}),
  typescript: { outputFile: path.resolve(dirname, "payload-types.ts") },
  // Produkcja (Vercel): Postgres z Neon. Lokalnie bez DATABASE_URI: plik SQLite.
  db: /^postgres(ql)?:\/\//.test(process.env.DATABASE_URI ?? "")
    ? postgresAdapter({ pool: { connectionString: process.env.DATABASE_URI } })
    : sqliteAdapter({ client: { url: process.env.DATABASE_URI || "file:./payload.db" } }),
  plugins: [
    // Zdjęcia w Vercel Blob, gdy ustawiony jest BLOB_READ_WRITE_TOKEN (inaczej lokalny folder media/).
    vercelBlobStorage({
      enabled: !!process.env.BLOB_READ_WRITE_TOKEN,
      token: process.env.BLOB_READ_WRITE_TOKEN,
      collections: { media: true },
      clientUploads: true, // zdjęcia idą prosto z przeglądarki do Blob (Vercel odrzuca żądania powyżej 4,5 MB)
    }),
  ],
  i18n: { supportedLanguages: { pl }, fallbackLanguage: "pl" },
  sharp,
});
