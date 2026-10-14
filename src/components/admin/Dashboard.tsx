/** Pulpit startowy panelu: duże skróty do najczęstszych zadań i krótka instrukcja. */
const actions = [
  { href: "/admin/collections/paintings/create", title: "Dodaj obraz", text: "Wgraj zdjęcie, wpisz tytuł i wybierz serię." },
  { href: "/admin/collections/news/create", title: "Dodaj artykuł", text: "Nowość, relacja z wystawy lub wydarzenia." },
  { href: "/admin/globals/about", title: "Edytuj „O mnie”", text: "Biografia, zdjęcie artystki, zdjęcia z wystaw." },
  { href: "/admin/collections/exhibitions/create", title: "Dodaj wystawę", text: "Pojawi się na liście „Wybrane wystawy”." },
];

export default function Dashboard() {
  return (
    <section className="pulpit">
      <h2>Witaj w panelu strony</h2>
      <p className="pulpit-lead">
        Tu zmieniasz obrazy, teksty i zdjęcia. Po kliknięciu „Zapisz” zmiana od razu pojawia się na stronie.
      </p>
      <div className="pulpit-grid">
        {actions.map((a) => (
          <a key={a.href} href={a.href} className="pulpit-card">
            <strong>{a.title}</strong>
            <span>{a.text}</span>
          </a>
        ))}
        <a href="/" target="_blank" rel="noopener noreferrer" className="pulpit-card pulpit-view">
          <strong>Zobacz stronę ↗</strong>
          <span>Otwiera stronę w nowej karcie.</span>
        </a>
      </div>
      <ol className="pulpit-help">
        <li>Wybierz zadanie powyżej albo skorzystaj z menu po lewej.</li>
        <li>Wypełnij pola i kliknij „Zapisz”.</li>
        <li>Pomyłka? W każdej stronie jest zakładka „Wersje”, z której przywrócisz wcześniejszy stan.</li>
      </ol>
    </section>
  );
}
