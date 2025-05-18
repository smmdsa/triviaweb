import { useState, useEffect } from 'preact/hooks'

interface Props {
  triviaId: string
  apiUrl?: string
}

export function Widget({ triviaId, apiUrl = '/api' }: Props) {
  const [data, setData] = useState<any | null>(null)
  const [index, setIndex] = useState(0)

  useEffect(() => {
    fetch(`${apiUrl}/trivias/${triviaId}/embed`)
      .then((res) => res.json())
      .then((json) => setData(json))
  }, [triviaId, apiUrl])

  if (!data) return <p>Loading…</p>
  const question = data.questions[index]

  return (
    <div className="tw-w-full tw-max-w-md tw-mx-auto tw-p-4 tw-bg-white tw-rounded-md tw-shadow">
      <h3 className="tw-font-semibold tw-mb-2">{data.title}</h3>
      <p className="tw-mb-4">{question.text}</p>
      <ul className="tw-space-y-2">
        {question.options.map((opt: string) => (
          <li
            key={opt}
            className="tw-border tw-rounded tw-p-2 tw-cursor-pointer hover:tw-bg-gray-100"
            onClick={() => setIndex(index + 1)}
          >
            {opt}
          </li>
        ))}
      </ul>
    </div>
  )
}