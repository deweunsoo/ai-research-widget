import { Fragment } from 'react'

export default function BoldText({ text, color }: { text: string; color?: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/)
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={i} style={{ fontWeight: 600, color: 'inherit' }}>{part.slice(2, -2)}</strong>
        }
        return <Fragment key={i}>{part}</Fragment>
      })}
    </>
  )
}
