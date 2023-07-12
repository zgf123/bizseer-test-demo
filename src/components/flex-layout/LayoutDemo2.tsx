import React from 'react'
import { css } from '@emotion/css'

const container = css`
  color: red;
  padding: 10px 0;
  width: 300px;
  border: 1px solid #aaa;
  margin: 40px auto;
`
const outBox = css`
  display: flex;
`
const innerBox = css`
  display: flex;
`
const text = css`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`
const iconcss = css`
  width: 20px;
  height: 20px;
  background: coral;
`

const LayoutDemo2 = () => {
  return (
    <>
      <div style={{ display: 'flex', width: 400 }}>
        <div className={iconcss} style={{ flexShrink: 0 }}></div>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'inline-flex', background: 'pink', width: '100%' }}>
            <div style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden', flex: 1 }}>
              文本文本文本文本文本文本文本文本文本文本文本文本文本文本
            </div>
            <div className={iconcss}></div>
          </div>
        </div>
      </div>
      <div className={container}>
        <div className={outBox}>
          <div style={{ width: 0, flex: '1 1 auto' }}>
            <div className={innerBox}>
              <div>
                <div className={iconcss}></div>
              </div>
              <div className={text}>
                内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容
              </div>
              <div>
                <div className={iconcss}></div>
              </div>
            </div>
          </div>
          <div>123123</div>
        </div>
      </div>
    </>
  )
}

export default LayoutDemo2
