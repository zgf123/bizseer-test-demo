/* eslint-disable */
import React from 'react'
import FlowDemo from './components/FlowDemo'
import UseDemo from './components/UseDemo'
import { Foo } from 'adder-editor'

const state: number = 1
const App = () => {
  return (
    <>
      <div>
        <Foo title="heheda" />
      </div>
      <div className="App">{state === 1 ? <FlowDemo /> : <UseDemo />}</div>
    </>
  )
}

export default App
