import React, { useEffect, useState } from 'react'
import axios from 'axios'

type CoinType = {
  id: string
  rank: number
  symbol: string
}

export function App() {
  //  Teaches TypeScript the shape of our API.
  const [coins, setCoins] = useState<CoinType[]>([])

  function LoadAllData() {
    async function fetchListOfCoins() {
      const response = await axios.get('https://api.coincap.io/v2/assets')

      if (response.status === 200) {
        // Data.data was needed
        setCoins(response.data.data)
      }
      console.log(response.data)
    }

    fetchListOfCoins()
  }

  // useEffect has a non-async function, Loads our data ONCE.
  useEffect(LoadAllData, [])

  // Set interval for reloading data. This discusses useEffect with a return that is a teardown.
  useEffect(function () {
    // If useEffect sets up something that consumes a resource, like an interval identifier...
    const timerInterval = setInterval(function () {
      console.log('Calling my interval')
    }, 1000)

    // .. then we need a teardown function to undo that resource. GOOD PRACTICES.
    function teardown() {
      clearInterval(timerInterval)
    }

    return teardown
  }, [])

  return (
    <div className="main">
      <header>
        <h1>Hello Crypto.</h1>
      </header>
      <ul>
        {coins.map(function (coin) {
          return (
            <li key={coin.id}>
              {coin.symbol}-{coin.rank}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
