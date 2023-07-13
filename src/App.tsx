/* eslint-disable */
import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import FlowDemo from './components/react-flow/FlowDemo'
import UseDemo from './components/react-flow/UseDemo'
import EditorDemo from './components/EditorDemo'
import AcornDemo from './components/AcornDemo'
import SubFlowDemo from './components/react-flow/SubFlowDemo'
import SubFlowDemo1 from './components/react-flow/SubFlowDemo1'
import SubFlowDemo2 from './components/react-flow/SubFlowDemo2'
import MonacoDemo from './components/MonacoDemo'
import LayoutDemo1 from './components/layout/LayoutDemo1'
import LayoutDemo2 from './components/layout/LayoutDemo2'
import GetBoundingClientRect from './components/layout/GetBoundingClientRect'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/flow-demo" element={<FlowDemo />} />
        <Route path="/use-demo" element={<UseDemo />} />
        <Route path="/editor-demo" element={<EditorDemo />} />
        <Route path="/acorn-demo" element={<AcornDemo />} />
        <Route path="/subflow-demo" element={<SubFlowDemo />} />
        <Route path="/subflow-demo1" element={<SubFlowDemo1 />} />
        <Route path="/subflow-demo2" element={<SubFlowDemo2 />} />
        <Route path="/monaco-demo" element={<MonacoDemo />} />
        <Route path="/layout-demo1" element={<LayoutDemo1 />} />
        <Route path="/layout-demo2" element={<LayoutDemo2 />} />
        <Route path="/layout-get-bounding-client-rect" element={<GetBoundingClientRect />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
