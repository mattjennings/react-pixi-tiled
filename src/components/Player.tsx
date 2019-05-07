import { Sprite } from '@inlet/react-pixi'
import React, { useContext, useEffect, useState } from 'react'
import { CameraContext } from './Camera'
import Input from './Input'
import MatterRectangleBody from './matter/MatterRectangleBody'

const Player = () => {
  const { camera, moveCamera } = useContext(CameraContext)

  return (
    <MatterRectangleBody
      x={100}
      y={100}
      width={16}
      height={36}
      options={{
        inertia: Infinity,
        friction: 0,
        frictionStatic: 0
      }}
    >
      {({ setVelocity, body }) => {
        moveCamera(body.position.x, body.position.y)
        return (
          <>
            {/* D */}
            <Input
              keyCode={68}
              onDown={() => {
                setVelocity({ x: 2, y: body.velocity.y })
              }}
              onRelease={() => {
                setVelocity({ x: 0, y: body.velocity.y })
              }}
            />
            {/* A */}
            <Input
              keyCode={65}
              onDown={() => {
                setVelocity({ x: -2, y: body.velocity.y })
              }}
              onRelease={() => {
                setVelocity({ x: 0, y: body.velocity.y })
              }}
            />
            {/* W */}
            <Input
              keyCode={87}
              onDown={() => {
                setVelocity({ y: -2, x: body.velocity.x })
              }}
              onRelease={() => {
                setVelocity({ y: 0, x: body.velocity.x })
              }}
            />
            {/* S */}
            <Input
              keyCode={83}
              onDown={() => {
                setVelocity({ y: 2, x: body.velocity.x })
              }}
              onRelease={() => {
                setVelocity({ y: 0, x: body.velocity.x })
              }}
            />

            <Sprite
              image="/static/bunny.png"
              x={body.position.x}
              y={body.position.y}
              rotation={body.angle}
              pivot={[5, 11]}
            />
          </>
        )
      }}
    </MatterRectangleBody>
  )
}

export default Player
