/* eslint-disable */
import React from 'react'
import FlowDemo from './components/FlowDemo'
import UseDemo from './components/UseDemo'
import EditorDemo from './components/EditorDemo'
import AcornDemo from './components/AcornDemo'

const state: number = 1
const App = () => {
  return (
    <>
      <div>
        <AcornDemo />
      </div>
      {/* <div><EditorDemo /></div> */}
      {/* <div className="App">{state === 1 ? <FlowDemo /> : <UseDemo />}</div> */}
    </>
  )
}

export default App
