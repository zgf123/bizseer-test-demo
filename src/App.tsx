/* eslint-disable */
import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import FlowDemo from './components/FlowDemo'
import UseDemo from './components/UseDemo'
import EditorDemo from './components/EditorDemo'
import AcornDemo from './components/AcornDemo'
import SubFlowDemo from './components/SubFlowDemo'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<>index</>} />
        <Route path="/flow-demo" element={<FlowDemo />} />
        <Route path="/use-demo" element={<UseDemo />} />
        <Route path="/editor-demo" element={<EditorDemo />} />
        <Route path="/acorn-demo" element={<AcornDemo />} />
        <Route path="/subflow-demo" element={<SubFlowDemo />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
