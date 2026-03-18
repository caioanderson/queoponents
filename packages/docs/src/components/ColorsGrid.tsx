import { colors } from '@queoponents/tokens'
import { getContrast, parseToRgb } from 'polished'
import { useMemo, useState } from 'react'
import '../styles/token-colors.css'

function toHexChannel(value: number) {
  return Math.round(value).toString(16).padStart(2, '0').toUpperCase()
}

function colorToHex(color: string) {
  const trimmed = color.trim()
  if (trimmed.startsWith('#')) {
    return trimmed.toUpperCase()
  }

  try {
    const { red, green, blue } = parseToRgb(trimmed)
    return `#${toHexChannel(red)}${toHexChannel(green)}${toHexChannel(blue)}`
  } catch {
    return null
  }
}

type ColorItem = {
  key: string
  value: string
  token: string
  group: string
  category: string
}

export function ColorsGrid() {
  const [query, setQuery] = useState('')
  const normalizedQuery = query.trim().toLowerCase()

  const sections = useMemo(() => {
    const nextSections: Array<{
      category: string
      groups: Array<{ name: string; items: ColorItem[] }>
    }> = []

    Object.entries(colors).forEach(([category, categoryColors]) => {
      const groupMap = new Map<string, ColorItem[]>()

      const pushItem = (groupName: string, item: ColorItem) => {
        if (!groupMap.has(groupName)) groupMap.set(groupName, [])
        groupMap.get(groupName)?.push(item)
      }

      Object.entries(categoryColors).forEach(([key, value]) => {
        if (typeof value === 'string') {
          pushItem(category, {
            key,
            value,
            token: `${category}.${key}`,
            group: category,
            category,
          })
          return
        }

        if (value && typeof value === 'object') {
          Object.entries(value).forEach(([nestedKey, nestedValue]) => {
            if (typeof nestedValue !== 'string') return
            pushItem(key, {
              key: nestedKey,
              value: nestedValue,
              token: `${category}.${key}.${nestedKey}`,
              group: key,
              category,
            })
          })
        }
      })

      const groups = Array.from(groupMap.entries())
        .map(([groupName, items]) => {
          const filteredItems = normalizedQuery
            ? items.filter((item) => {
              const hexValue = colorToHex(item.value)
              const haystack = [
                item.category,
                item.group,
                item.key,
                item.token,
                item.value,
                hexValue ?? '',
              ]
                .join(' ')
                .toLowerCase()
              return haystack.includes(normalizedQuery)
            })
            : items

          if (filteredItems.length === 0) return null
          return { name: groupName, items: filteredItems }
        })
        .filter((group): group is { name: string; items: ColorItem[] } => Boolean(group))

      if (groups.length > 0) {
        nextSections.push({ category, groups })
      }
    })

    return nextSections
  }, [normalizedQuery])

  return (
    <div className="colors-grid-wrapper">
      <div className="colors-grid-search">
        <label htmlFor="colors-grid-search-input">
          Buscar cor
        </label>
        <input
          id="colors-grid-search-input"
          type="search"
          placeholder="Filtrar por nome, RGB ou HEX"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </div>

      {sections.map((section) => (
        <section key={section.category} className="colors-grid-section">
            <header className="colors-grid-header">
              <h2 className="colors-grid-category-title">
                {section.category}
              </h2>
              <p className="colors-grid-category-description">
                Tokens de cores da categoria {section.category}.
              </p>
            </header>

            <div className="colors-grid-groups">
              {section.groups.map((group) => (
                <div key={group.name}>
                  <h3 className="colors-grid-group-title">
                    {group.name}
                  </h3>

                  <div className="colors-grid-swatch-list">
                    {group.items.map((item) => {
                      const contrastColor = getContrast(item.value, '#fff') < 3.5 ? '#000' : '#fff'
                      const hexValue = colorToHex(item.value)
                      const isRgbValue = item.value.trim().toLowerCase().startsWith('rgb')

                      return (
                        <div
                          key={`${group.name}-${item.key}`}
                          className="colors-grid-swatch"
                          style={{ backgroundColor: item.value }}
                        >
                          <div className="colors-grid-swatch-info">
                            <span
                              className="colors-grid-swatch-hex"
                              style={{ color: contrastColor }}
                            >
                              {item.value.toUpperCase()}
                            </span>
                            {isRgbValue && hexValue && (
                              <span
                                className="colors-grid-swatch-hex"
                                style={{ color: contrastColor }}
                              >
                                {hexValue}
                              </span>
                            )}
                            <span
                              className="colors-grid-swatch-token"
                              style={{ color: contrastColor }}
                            >
                              {item.token}
                            </span>
                          </div>
                          <span
                            className="colors-grid-swatch-key"
                            style={{ color: contrastColor }}
                          >
                            {item.key}
                          </span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
        </section>
      ))}
    </div>
  )
}
