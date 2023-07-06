/* eslint-disable */
import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import FlowDemo from './components/react-flow/FlowDemo'
import UseDemo from './components/react-flow/UseDemo'
import EditorDemo from './components/EditorDemo'
import AcornDemo from './components/AcornDemo'
import SubFlowDemo from './components/react-flow/SubFlowDemo'
import SubFlowDemo1 from './components/react-flow/SubFlowDemo1'
import MonacoDemo from './components/MonacoDemo'

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
        <Route path="/subflow-demo1" element={<SubFlowDemo1 />} />
        <Route path="/monaco-demo" element={<MonacoDemo />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
