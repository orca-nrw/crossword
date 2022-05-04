import { ChangeEvent, useState } from 'react'
import { CrosswordCell } from './CrosswordCell'
import { Footer } from './Footer'
import { Header } from './Header'
import { PuzzleGridContainer } from './PuzzleGridContainer'
import useCrossword from '../Helper/useCrossword'

const sizeOptions = [
  { text: 'Klein', clueCount: 10 },
  { text: 'Mittel', clueCount: 15 },
  { text: 'Groß', clueCount: 20 },
]

const topicOptions = [
  { text: 'SQL-Allgemein', topicId: 1 },
  { text: 'PL/SQL', topicId: 2 },
]

function PuzzleContainer() {
  const [selectedSize, setSelectedSize] = useState(15)
  const [selectedTopic, setSelectedTopic] = useState(1)
  const [shouldShowSolution, setShouldShowSolution] = useState(false)
  const { puzzle, refreshPuzzle } = useCrossword(selectedSize, 1)

  function handleSizeChange(e: ChangeEvent<HTMLSelectElement>) {
    setSelectedSize(Number(e.target.value))
  }

  function handleTopicChange(e: ChangeEvent<HTMLSelectElement>) {
    setSelectedTopic(Number(e.target.value))
  }

  return (
    <div className="max-w-screen-xl space-y-4 mx-auto my-0 flex flex-col justify-center">
      <Header />
      <div className="bg-white p-4 text-4xl font-semibold font-mono cursor-default">
        Datenbank-Kreuzworträtsel
      </div>
      <div className="bg-white p-6">
        <div className="flex space-x-4 justify-end items-center">
          <div>
            <label htmlFor="topicSelect" className="font-semibold mr-2">
              Thema:
            </label>
            <select
              id="topicSelect"
              value={selectedTopic}
              onChange={handleTopicChange}
              className="border px-2 py-1.5 rounded-md font-semibold"
            >
              {topicOptions.map((topic, index) => {
                return (
                  <option value={topic.topicId} key={index}>
                    {topic.text}
                  </option>
                )
              })}
            </select>
          </div>
          <div>
            <label htmlFor="puzzleSizeSelect" className="font-semibold mr-2">
              Puzzlegröße:
            </label>
            <select
              id="puzzleSizeSelect"
              value={selectedSize}
              onChange={handleSizeChange}
              className="border px-2 py-1.5 rounded-md font-semibold"
            >
              {sizeOptions.map((size, index) => {
                return (
                  <option value={size.clueCount} key={index}>
                    {size.text}
                  </option>
                )
              })}
            </select>
          </div>
          <button
            className="px-2 py-1.5 bg-th-violet text-white font-semibold border rounded-md"
            onClick={refreshPuzzle}
          >
            Neues Puzzle
          </button>
        </div>
        {puzzle && (
          <PuzzleGridContainer
            puzzle={puzzle}
            shouldShowSolution={shouldShowSolution}
          />
        )}
        <div className="flex justify-end">
          <button
            onClick={() => setShouldShowSolution((val) => !val)}
            className="px-2 py-1.5 bg-th-red text-white font-semibold border rounded-md"
          >
            Überprüfen
          </button>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default PuzzleContainer
