import { Sprite } from '@inlet/react-pixi'
import React from 'react'
import PhysicsBody from './physics/PhysicsBody'
import { Box } from 'p2'

const Enemy = ({ x, y }: { x: number; y: number }) => {
  return (
    <PhysicsBody x={x} y={y} shape={new Box({ width: 20, height: 46 })}>
      {({ body }) => (
        <Sprite
          image="/static/enemy.gif"
          x={body.position[0]}
          y={body.position[1]}
          pivot={[20, 20]}
          rotation={body.angle}
        />
      )}
    </PhysicsBody>
  )
}

export default Enemy
