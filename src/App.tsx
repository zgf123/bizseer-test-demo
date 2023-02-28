/* eslint-disable */
import React from 'react'
import FlowDemo from './components/FlowDemo'
import UseDemo from './components/UseDemo'

const state: number = 2
const App = () => {
  return <div className="App">{state === 1 ? <FlowDemo /> : <UseDemo />}</div>
}

export default App
