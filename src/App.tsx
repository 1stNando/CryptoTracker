import React, { useState } from 'react'
import axios from 'axios'

export function App() {
  const [coins, setCoins] = useState([])

  function LoadAllData() {
    async function fetchListOfCoins() {
      const response = await axios.get('https://api.coincap.io/v2/assets')
    }
  }

  return (
    <div>
      <p>Hello world.</p>
    </div>
  )
}
