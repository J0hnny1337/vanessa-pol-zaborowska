# Wdrożenie na Vercel (strona statyczna)

Strona jest statyczna: treść jest w kodzie (`src/content/source.ts`), zdjęcia w `public/img/`. Nie potrzebuje bazy, zmiennych środowiskowych ani panelu.

1. W Vercel: Add New → Project → wybierz repozytorium → Deploy. Framework (Next.js) i komenda budowania (`next build`) wykrywają się same.
2. Domena: Settings → Domains.

## Zmiana treści
Teksty, wystawy, serie i artykuły edytuje się w `src/content/source.ts`. Nowe zdjęcia dodaj do `public/img/` jako WebP (do ok. 1800 px) i wskaż je w `source.ts`. Po `git push` Vercel sam buduje stronę od nowa.

## Wersja z panelem CMS (Payload)
Pełna wersja z panelem `/admin`, artykułami z pełnym edytorem, Postgresem i Vercel Blob jest zachowana w znaczniku gita `payload-cms-v1` (`git checkout payload-cms-v1`). Jej instrukcja wdrożenia (Neon + Blob) jest w tamtym `DEPLOY.md`.
