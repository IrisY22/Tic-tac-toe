import { useState } from "react"

export default function Player({ initialName, symbol }) {
  const [isEditing, setIsEditing] = useState(false)
  const [playerName, setPlayerName] = useState(initialName)

  function handleEditClick() {
    setIsEditing(editing => !editing)
  }

  function handleChange(e) {
    setPlayerName(e.target.value)
  }

  return (
    <li>
      <span className="player">
        {!isEditing && <span className='player-name'>{playerName}</span>}
        {isEditing && <input type="text" required value={playerName} onChange={handleChange}></input>}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEditClick}>{isEditing ? 'Save' : 'Edit'}</button>
    </li>
  )
}