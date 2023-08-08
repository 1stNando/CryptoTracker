import React, { useEffect, useState } from 'react'
import axios from 'axios'

type CoinType = {
  id: string
  rank: number
  symbol: string | null
  name: string | null
  priceUsd: number
}

export function App() {
  //  Teaches TypeScript the shape of our API.
  const [coins, setCoins] = useState<CoinType[]>([])

  // Add STATE for changes in cycles or fetching.
  const [cycles, setCycles] = useState<number>(0)

  function loadAllData() {
    async function fetchListOfCoins() {
      const response = await axios.get('https://api.coincap.io/v2/assets')

      if (response.status === 200) {
        // Data.data was needed to not have error with single .data.
        setCoins(response.data.data)
      }
      // Just a check to visualize response in browser's console.
      console.log(response.data)
    }

    fetchListOfCoins()
  }

  // useEffect has a non-async function, Loads our data ONCE.
  useEffect(loadAllData, [cycles])

  // Set interval for reloading data. This discusses useEffect with a return that is a teardown.
  useEffect(function () {
    // If useEffect sets up something that consumes a resource, like an interval identifier...
    const timerInterval = setInterval(function () {
      console.log('Calling my interval')
      setCycles((cycles) => cycles + 1)
    }, 10000)

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
        {coins
          .filter((coin) => coin.rank <= 15)
          .map(function (coin) {
            return (
              <li key={coin.id}>
                {coin.symbol}-{coin.rank}: {coin.name} ($
                {Math.round(coin.priceUsd * 100) / 1000})
              </li>
            )
          })}
      </ul>
    </div>
  )
}
