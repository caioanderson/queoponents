import '../styles/tokens-grid.css'

type PrimitiveValue = string | number

type TokenMap = Record<string, PrimitiveValue | Record<string, PrimitiveValue>>

interface TokensGridProps {
  tokens: TokenMap
}

function renderPreview(key: string, values: Record<string, PrimitiveValue>) {
  const fontFamily = values.fontFamily as string | undefined
  const fontSize = values.fontSize as string | number | undefined
  const fontWeight = values.fontWeight as string | number | undefined
  const lineHeight = values.lineHeight as string | number | undefined

  if (fontFamily || fontSize) {
    return (
      <span
        style={{
          fontFamily: fontFamily || 'inherit',
          fontSize: typeof fontSize === 'number' ? `${fontSize}px` : fontSize,
          fontWeight: fontWeight as number | undefined,
          lineHeight: typeof lineHeight === 'number' ? `${lineHeight}px` : lineHeight,
          color: '#fff',
          whiteSpace: 'nowrap',
          maxWidth: '300px',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          display: 'block',
        }}
      >
        The quick brown fox jumps
      </span>
    )
  }

  return null
}

function TokenRow({ name, value }: { name: string; value: PrimitiveValue | Record<string, PrimitiveValue> }) {
  const isObject = typeof value === 'object' && value !== null

  if (isObject) {
    const entries = Object.entries(value as Record<string, PrimitiveValue>)
    const preview = renderPreview(name, value as Record<string, PrimitiveValue>)

    return (
      <tr>
        <td>
          <code style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.8rem', color: '#93c5fd' }}>
            {name}
          </code>
        </td>
        <td>
          {preview}
        </td>
        <td>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            {entries.map(([subKey, subVal]) => (
              <span key={subKey} style={{ fontSize: '0.8rem' }}>
                <span style={{ color: '#9ca3af' }}>{subKey}: </span>
                <span style={{ fontFamily: 'ui-monospace, monospace' }}>{String(subVal)}</span>
              </span>
            ))}
          </div>
        </td>
      </tr>
    )
  }

  return (
    <tr>
      <td>
        <code style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.8rem', color: '#93c5fd' }}>
          {name}
        </code>
      </td>
      <td>
        <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.8rem' }}>
          {String(value)}
        </span>
      </td>
      <td>—</td>
    </tr>
  )
}

export function TokensGrid({ tokens }: TokensGridProps) {
  const entries = Object.entries(tokens)
  const firstValue = entries[0]?.[1]
  const isNested = typeof firstValue === 'object' && firstValue !== null

  return (
    <table className="tokens-grid">
      <thead>
        <tr>
          <th>Token</th>
          <th>Preview</th>
          <th>Valores</th>
        </tr>
      </thead>
      <tbody>
        {entries.map(([key, value]) => (
          <TokenRow key={key} name={key} value={value} />
        ))}
      </tbody>
    </table>
  )
}
