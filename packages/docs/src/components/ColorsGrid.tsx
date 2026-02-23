import { colors } from '@queoponents/tokens'
import { getContrast } from 'polished'
import '../styles/token-colors.css'

export function ColorsGrid() {
  return (
    <div className="colors-grid-wrapper">
      {Object.entries(colors).map(([category, categoryColors]) => {
        const subGroups: Record<string, [string, string][]> = {}

        if (category === 'palette') {
          Object.entries(categoryColors).forEach(([key, value]) => {
            const familyMatch = key.match(/^(tailwind|system)([A-Z][a-z]+)/)
            const family = familyMatch ? familyMatch[2] : 'Outros'
            if (!subGroups[family]) subGroups[family] = []
            subGroups[family].push([key, value as string])
          })
        } else {
          subGroups[category] = Object.entries(categoryColors) as [string, string][]
        }

        return (
          <section key={category} className="colors-grid-section">
            <header className="colors-grid-header">
              <h2 className="colors-grid-category-title">
                {category}
              </h2>
              <p className="colors-grid-category-description">
                Tokens de cores da categoria {category}.
              </p>
            </header>

            <div className="colors-grid-groups">
              {Object.entries(subGroups).map(([groupName, groupItems]) => (
                <div key={groupName}>
                  <h3 className="colors-grid-group-title">
                    {groupName}
                  </h3>

                  <div className="colors-grid-swatch-list">
                    {groupItems.map(([key, value]) => {
                      const contrastColor = getContrast(value, '#fff') < 3.5 ? '#000' : '#fff'

                      return (
                        <div
                          key={key}
                          className="colors-grid-swatch"
                          style={{ backgroundColor: value }}
                        >
                          <div className="colors-grid-swatch-info">
                            <strong
                              className="colors-grid-swatch-name"
                              style={{ color: contrastColor }}
                            >
                              {key.replace(/^(tailwind|system|border|surface|text|palette|theme)/i, '') || key}
                            </strong>
                            <span
                              className="colors-grid-swatch-hex"
                              style={{ color: contrastColor }}
                            >
                              {value.toUpperCase()}
                            </span>
                            <span
                              className="colors-grid-swatch-token"
                              style={{ color: contrastColor }}
                            >
                              {category}.{key}
                            </span>
                          </div>
                          <span
                            className="colors-grid-swatch-key"
                            style={{ color: contrastColor }}
                          >
                            {key}
                          </span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )
      })}
    </div>
  )
}