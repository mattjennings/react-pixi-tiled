import { Sprite } from '@inlet/react-pixi'
import React, { useContext, useEffect, useState } from 'react'
import { CameraContext } from './Camera'
import Input from './Input'
import MatterRectangleBody from './matter/MatterRectangleBody'

const Player = () => {
  const { camera } = useContext(CameraContext)

  // set initial camera position
  useEffect(() => {
    // camera.current.moveCenter(x, y)
  }, [])

  // move camera immediately with new x/y coordinates
  if (camera.current) {
    // camera.current.moveCenter(x, y)
  }

  return (
    <MatterRectangleBody x={100} y={100} width={20} height={20} options={{}}>
      {({ setVelocity, x, y }) => {
        console.log(x, y)
        return (
          <>
            {/* D */}
            <Input
              keyCode={68}
              onDown={() => {
                setVelocity({ x: 2 })
              }}
              onRelease={() => {
                setVelocity({ x: 0 })
              }}
            />
            {/* A */}
            <Input
              keyCode={65}
              onDown={() => {
                setVelocity({ x: -2 })
              }}
              onRelease={() => {
                setVelocity({ x: 0 })
              }}
            />
            {/* W */}
            <Input
              keyCode={87}
              onDown={() => {
                // setY(y - 2)
              }}
            />
            {/* S */}
            <Input
              keyCode={83}
              onDown={() => {
                // setY(y + 2)
              }}
            />

            <Sprite image="/static/bunny.png" x={x} y={0} />
          </>
        )
      }}
    </MatterRectangleBody>
  )
}

export default Player
