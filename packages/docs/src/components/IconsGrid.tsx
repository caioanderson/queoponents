import { Icon, faClassNames, type FaClassName } from '@queoponents/react';
import { useMemo, useRef, useState } from 'react';
import '../styles/icons-grid.css';

type IconGroup = {
  prefix: string;
  icons: { name: string; className: FaClassName }[];
};

function buildGroups(): IconGroup[] {
  const groups = new Map<string, IconGroup>();

  for (const className of faClassNames as readonly FaClassName[]) {
    const [prefix, faName] = className.split(' ');
    const name = faName.replace(/^fa-/, '');
    const group = groups.get(prefix) || { prefix, icons: [] };
    group.icons.push({ name, className });
    groups.set(prefix, group);
  }

  return Array.from(groups.values()).sort((a, b) => a.prefix.localeCompare(b.prefix));
}

export function IconsGrid() {
  const [query, setQuery] = useState('');
  const [copied, setCopied] = useState<FaClassName | null>(null);
  const clearTimerRef = useRef<number | null>(null);

  const groups = useMemo(() => buildGroups(), []);
  const normalizedQuery = query.trim().toLowerCase();

  const filteredGroups = useMemo(() => {
    if (!normalizedQuery) return groups;

    return groups
      .map((group) => ({
        ...group,
        icons: group.icons.filter((icon) => {
          return (
            icon.name.toLowerCase().includes(normalizedQuery) ||
            icon.className.toLowerCase().includes(normalizedQuery)
          );
        }),
      }))
      .filter((group) => group.icons.length > 0);
  }, [groups, normalizedQuery]);

  const totalIcons = filteredGroups.reduce((acc, group) => acc + group.icons.length, 0);

  return (
    <div className="icons-grid-wrapper">
      <div className="icons-grid-toolbar">
        <div className="icons-grid-search">
          <input
            type="search"
            placeholder="Buscar icone (ex: arrow, fa-solid, github)"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="icons-grid-search-input"
          />
          <span className="icons-grid-search-count">
            {totalIcons} icones
          </span>
        </div>
      </div>

      {filteredGroups.map((group) => (
        <section key={group.prefix} className="icons-grid-section">
          <header className="icons-grid-header">
            <h2 className="icons-grid-title">{group.prefix}</h2>
            <p className="icons-grid-subtitle">
              {group.icons.length} icons
            </p>
          </header>

          <div className="icons-grid">
            {group.icons.map((icon) => (
              <button
                key={icon.className}
                type="button"
                className="icon-card"
                onClick={() => {
                  navigator.clipboard?.writeText(icon.className);
                  setCopied(icon.className);
                  if (clearTimerRef.current) {
                    window.clearTimeout(clearTimerRef.current);
                  }
                  clearTimerRef.current = window.setTimeout(() => {
                    setCopied((prev) => (prev === icon.className ? null : prev));
                    clearTimerRef.current = null;
                  }, 3000);
                }}
                aria-label={`Copiar ${icon.className}`}
                title={`Copiar ${icon.className}`}
              >
                <div className="icon-preview">
                  {copied === icon.className ? (
                    <span className="icon-copied">Copied</span>
                  ) : (
                    <Icon name={icon.className} aria-hidden="true" />
                  )}
                </div>
                <div className="icon-name">{icon.name}</div>
                <div className="icon-class">{icon.className}</div>
              </button>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
