# Wdrożenie na Vercel (strona statyczna)

Strona jest statyczna: treść jest w kodzie (`src/content/source.ts`), zdjęcia w `public/img/`. Nie potrzebuje bazy ani panelu. Jedyny fragment działający na serwerze to formularz „Zapytaj o obraz” (`/api/zapytanie`), który potrzebuje zmiennych opisanych niżej.

1. W Vercel: Add New → Project → wybierz repozytorium → Deploy. Framework (Next.js) i komenda budowania (`next build`) wykrywają się same.
2. Domena: Settings → Domains.

## Formularz „Zapytaj o obraz” (wysyłka maili)
Formularz jest na stronie Kontakt (`/kontakt#formularz`), a w portfolio w powiększeniu obrazu jest link „Zapytaj o ten obraz”. Wiadomości wysyła usługa Resend (darmowy plan: 100 maili dziennie, 3000 miesięcznie).

1. Załóż konto na resend.com → API Keys → Create API Key (uprawnienie „Sending access”).
2. Resend → Domains → Add Domain → wpisz domenę strony i dodaj u rejestratora domeny rekordy DNS, które pokaże Resend. Poczekaj, aż status zmieni się na „Verified”.
3. W Vercel: Settings → Environment Variables dodaj:
   - `RESEND_API_KEY` – klucz z punktu 1,
   - `CONTACT_TO` – adres, na który mają przychodzić wiadomości, np. `vanessapol.art102@gmail.com`,
   - `CONTACT_FROM` – nadawca w zweryfikowanej domenie, np. `Strona Vanessy <formularz@twoja-domena.pl>`.
4. Redeploy. Wyślij testową wiadomość z formularza.

Bez kroku 2 (bez `CONTACT_FROM`) maile idą z testowego adresu `onboarding@resend.dev` i dochodzą **tylko** na adres, na który założono konto Resend. Na początek wystarczy więc założyć konto Resend na adres artystki.

„Odpowiedz” w poczcie odpisuje od razu nadawcy formularza (ustawione `reply_to`). Lokalnie te same zmienne wpisz do `.env.local`.

## Zmiana treści
Teksty, wystawy, serie i artykuły edytuje się w `src/content/source.ts`. Nowe zdjęcia dodaj do `public/img/` jako WebP (do ok. 1800 px) i wskaż je w `source.ts`. Po `git push` Vercel sam buduje stronę od nowa.

## Wersja z panelem CMS (Payload)
Pełna wersja z panelem `/admin`, artykułami z pełnym edytorem, Postgresem i Vercel Blob jest zachowana w znaczniku gita `payload-cms-v1` (`git checkout payload-cms-v1`). Jej instrukcja wdrożenia (Neon + Blob) jest w tamtym `DEPLOY.md`.
