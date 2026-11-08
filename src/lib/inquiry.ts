/** Link do formularza „Zapytaj o obraz” na stronie Kontakt, z podpowiedzianą sprawą i (opcjonalnie) obrazem. */
export function inquiryHref(subject?: string, painting?: string) {
  const q = new URLSearchParams();
  if (subject) q.set("temat", subject);
  if (painting) q.set("obraz", painting);
  const qs = q.toString();
  return `/kontakt${qs ? `?${qs}` : ""}#formularz`;
}
