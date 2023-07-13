/* eslint-disable */
import React, { useEffect, useRef } from 'react'
import { css } from '@emotion/css'

const container = css`
  width: 600px;
  height: 400px;
  margin: 0 auto;
  background-color: skyblue;
  overflow: auto;
  // position: relative;
`
const myBox = css`
  width: 60px;
  height: 60px;
  background-color: coral;
  margin-left: 200px;
`

const GetBoundingClientRect = () => {
  const box = useRef<any>(null)
  const dom = useRef<any>(null)
  useEffect(() => {
    const res = dom.current?.getBoundingClientRect()
    console.log(res)
  }, [dom])
  return (
    <div>
      <div style={{ height: 100 }}></div>
      <div
        className={container}
        ref={box}
        onScroll={() => {
          const res = dom.current?.getBoundingClientRect()
          console.log(res)
          console.log(box.current?.scrollTop, 'scrollTop')
          console.log(dom.current?.offsetTop, 'offsetTop')
          console.log(dom.current?.clientTop, 'clientTop')
        }}
      >
        {/* <div>展示板: 距离body的边框距离 = 视口距离 + 滚动条长度</div> */}
        {/* <div>啊啊啊</div> */}
        <div style={{ height: 500 }}></div>
        <div>
          <div className={myBox} ref={dom}></div>
        </div>
        <div style={{ height: 500 }}></div>
      </div>
      <button
        onClick={() => {
          dom.current?.scrollIntoView()
        }}
      >
        11221
      </button>
    </div>
  )
}

export default GetBoundingClientRect
