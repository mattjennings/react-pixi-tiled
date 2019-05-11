import { Sprite } from '@inlet/react-pixi'
import React, { useContext, useEffect, useState } from 'react'
import { CameraContext } from './Camera'
import Input from './Input'
import { Box, ContactMaterial, Material } from 'p2'
import PhysicsBody from './physics/PhysicsBody'
import groundMaterial from '../materials/groundMaterial'

export const playerMaterial = new Material()
const groundContactMaterial = new ContactMaterial(groundMaterial, playerMaterial, {
  friction: 0,
  restitution: 0
})

const Player = () => {
  const { moveCamera } = useContext(CameraContext)

  return (
    <PhysicsBody
      x={100}
      y={100}
      mass={1}
      fixedRotation
      roundNearestPixel
      shape={new Box({ width: 16, height: 36 })}
      material={playerMaterial}
      contactMaterials={[groundContactMaterial]}
    >
      {({ setVelocity, body, position }) => {
        moveCamera(position.x, position.y)

        return (
          <>
            {/* D */}
            <Input keyCode={68} onDown={() => setVelocity({ x: 2 })} onRelease={() => setVelocity({ x: 0 })} />
            {/* A */}
            <Input keyCode={65} onDown={() => setVelocity({ x: -2 })} onRelease={() => setVelocity({ x: 0 })} />
            {/* W */}
            <Input keyCode={87} onDown={() => setVelocity({ y: -2 })} onRelease={() => setVelocity({ y: 0 })} />
            {/* S */}
            <Input keyCode={83} onDown={() => setVelocity({ y: 2 })} onRelease={() => setVelocity({ y: 0 })} />

            <Sprite image="/static/bunny.png" x={position.x} y={position.y} rotation={body.angle} pivot={[5, 11]} />
          </>
        )
      }}
    </PhysicsBody>
  )
}

export default Player
