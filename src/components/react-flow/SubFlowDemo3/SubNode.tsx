import React, { FC } from 'react'
import { Position, Handle } from 'reactflow'
import { css } from '@emotion/css'
import styled from '@emotion/styled'
import type { NodeProps } from 'reactflow'
import type { NodeData } from './tools'

const SubNode: FC<NodeProps<NodeData>> = ({ data }) => {
  return (
    <>
      <HandleWrapper type="target" isConnectable={false} position={Position.Left} />
      <HandleWrapper type="source" isConnectable={false} position={Position.Right} />
      <div
        className={`${boxClass} ${css({
          width: data.width,
          height: data.height,
          lineHeight: data.height + 'px',
        })}`}
      >
        {data.value || '--'}
      </div>
    </>
  )
}

export default SubNode

const boxClass = css`
  border: 1px solid #999;
  border-radius: 4px;
  text-align: center;
  background-color: #fff;
`
const HandleWrapper = styled(Handle)`
  width: 4px;
  height: 4px;
  background-color: #c5cbd5;
  z-index: 1;
`
