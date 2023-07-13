import React from 'react'
import { css } from '@emotion/css'

const outBox = css`
  display: flex;
`
const outBoxLeft = css``
const outBoxRight = css`
  flex: 1;
`
const outBoxRightBlock = css`
  height: 300px;
  background: skyblue;
`
const innerBox = css`
  width: 300px;
  height: 100%;
  display: flex;
  flex-direction: column;
`
const innerBoxTop = css`
  background: coral;
  padding: 10px;
`
const innerBoxScroll = css`
  position: relative;
  flex: 1;
  background: orange;
`
const innerBoxBottom = css`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
`

const LayoutDemo1 = () => {
  return (
    <>
      <div className={outBox}>
        <div className={outBoxLeft}>
          <div className={innerBox}>
            <div className={innerBoxTop}>top</div>
            <div className={innerBoxScroll}>
              <div className={innerBoxBottom}>
                <div style={{ height: 100, background: 'yellow' }}>inner</div>
                <div style={{ height: 700, background: 'yellow' }}>inner</div>
              </div>
            </div>
          </div>
        </div>
        <div className={outBoxRight}>
          <div>1</div>
          <div className={outBoxRightBlock}>2</div>
        </div>
      </div>
    </>
  )
}

export default LayoutDemo1
