/** Wpisy pogrupowane po roku: rok raz, po lewej, a obok wszystkie wpisy z tego roku. */
export default function YearList({ items }: { items: { year: number; title: string; place?: string; text?: string }[] }) {
  const years = [...new Set(items.map((e) => e.year))];
  return (
    <ol className="years">
      {years.map((y) => (
        <li key={y}>
          <span className="year">{y}</span>
          <ul>
            {items.filter((e) => e.year === y).map((e, i) => (
              <li key={i}>
                {e.title}
                {e.place && <span className="place">{e.place}</span>}
                {e.text && <span className="year-text">{e.text}</span>}
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ol>
  );
}
