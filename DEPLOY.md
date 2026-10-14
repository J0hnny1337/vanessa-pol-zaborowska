# Wdrożenie na Vercel (Vercel + Neon Postgres + Vercel Blob)

Strona i panel (`/admin`) działają w jednej aplikacji. Baza to Postgres w Neon, zdjęcia leżą w Vercel Blob.
Lokalnie nadal działa SQLite i folder `media/` (bez żadnej konfiguracji).

## Potrzebne konta
- GitHub (kod), Vercel (hosting), Neon (baza; najłatwiej przez Vercel → Storage). Domena jest opcjonalna na start.

## Kolejność kroków
Treść wgrywamy do bazy **przed** pierwszym wdrożeniem, żeby build miał z czego zbudować strony.

1. **Kod na GitHub.** `git init`, commit, nowe repozytorium, push. Pliki `.env`, `media/` i `payload.db` są w `.gitignore`.
2. **Projekt w Vercel.** Add New → Project → wybierz repozytorium. Pierwszy build może się nie udać, bo baza jest pusta. To normalne.
3. **Baza i zdjęcia.** W projekcie: Storage → Create → **Neon** (Postgres) oraz Storage → Create → **Blob**. Blob sam doda `BLOB_READ_WRITE_TOKEN`.
4. **Zmienne środowiskowe** (Settings → Environment Variables, dla Production i Preview):
   - `DATABASE_URI` = pooled connection string z Neon (zaczyna się od `postgres://`),
   - `PAYLOAD_SECRET` = wynik `openssl rand -hex 32`,
   - `NEXT_PUBLIC_SERVER_URL` = adres strony, np. `https://nazwa-projektu.vercel.app` (po podłączeniu domeny zmień na nią).
5. **Wgranie bazy i treści z laptopa** (jednorazowo). Zmienne podstaw w terminalu (najprościej `vercel env pull .env.vercel`, potem `set -a; source .env.vercel; set +a`):
   ```bash
   export SEED_ADMIN_EMAIL="twoj@email.pl" SEED_ADMIN_PASSWORD="silne-haslo-min-12-znakow"
   NODE_ENV=production npm run migrate
   NODE_ENV=production npm run seed
   ```
   Seed wgra serie, obrazy, teksty i wszystkie zdjęcia z `../zdjęcia-malarka` do Neon i Blob (zmniejszone do 2500 px) i założy konto administratora, więc nikt nie wyprzedzi Cię na pustym `/admin`. Działa tylko na pustej bazie.
6. **Wdrożenie.** Push na GitHub (albo Redeploy w Vercel). Build robi `payload migrate && next build` (`vercel.json`).
7. **Sprawdź:** strona, `/admin` (logowanie), dodanie testowego obrazu z telefonu, zmiana tekstu w „O mnie”.
8. **Konto artystki:** w panelu Użytkownicy → Dodaj, rola „Redaktor”, e-mail i hasło startowe.

## Później
- **Zmiana struktury panelu** (nowe pole/kolekcja): lokalnie `npm run migrate:create nazwa`, zacommituj plik z `src/migrations/`; build na Vercelu uruchomi migrację sam.
- **Kopie zapasowe:** Neon trzyma historię bazy (okno zależy od planu). Zdjęcia są w Blob. Oryginały zostają w folderze `zdjęcia-malarka`.
- **Limity zdjęć:** zdjęcia idą z przeglądarki prosto do Blob (omija limit 4,5 MB Vercela), więc nie są przy tym zmniejszane. Strona i tak serwuje je zmniejszone (`next/image`), ale warto wgrywać pliki do ok. 10 MB.
- **Plan Vercel:** darmowy Hobby jest dla użytku niekomercyjnego. Strona promuje usługę (portrety na zamówienie), więc może wymagać planu Pro.
