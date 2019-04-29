import { Sprite } from '@inlet/react-pixi'
import React, { useContext, useEffect, useState } from 'react'
import { CameraContext } from './Camera'
import Input from './Input'

const Player = () => {
  const { camera } = useContext(CameraContext)
  const [x, setX] = useState(0)
  const [y, setY] = useState(0)

  // set initial camera position
  useEffect(() => {
    camera.current.moveCenter(x, y)
  }, [])

  // move camera immediately with new x/y coordinates
  if (camera.current) {
    camera.current.moveCenter(x, y)
  }

  return (
    <>
      {/* D */}
      <Input
        keyCode={68}
        onDown={() => {
          setX(x + 2)
        }}
      />
      {/* A */}
      <Input
        keyCode={65}
        onDown={() => {
          setX(x - 2)
        }}
      />
      {/* W */}
      <Input
        keyCode={87}
        onDown={() => {
          setY(y - 2)
        }}
      />
      {/* S */}
      <Input
        keyCode={83}
        onDown={() => {
          setY(y + 2)
        }}
      />

      <Sprite image="/static/bunny.png" x={x} y={y} />
    </>
  )
}

export default Player
