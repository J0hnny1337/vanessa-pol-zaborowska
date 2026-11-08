"use client";

import { openConsentSettings } from "@/lib/consent";

/** „Ustawienia cookies” w stopce: ponownie otwiera baner, żeby zmienić lub wycofać zgodę. */
export default function ConsentSettingsButton() {
  return (
    <button type="button" className="legal-btn" onClick={openConsentSettings}>Ustawienia cookies</button>
  );
}
