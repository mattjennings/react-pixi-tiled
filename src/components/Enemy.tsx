import { Sprite } from '@inlet/react-pixi'
import React from 'react'
import MatterRectangleBody from './matter/MatterRectangleBody'

const Enemy = ({ x, y }: { x: number; y: number }) => {
  return (
    <MatterRectangleBody x={x} y={y} width={20} height={46}>
      {({ body }) => (
        <Sprite
          image="/static/enemy.gif"
          x={body.position.x}
          y={body.position.y}
          pivot={[20, 20]}
          rotation={body.angle}
        />
      )}
    </MatterRectangleBody>
  )
}

export default Enemy
