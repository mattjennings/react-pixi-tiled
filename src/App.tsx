import { PixiComponent, Sprite, Stage, Text, useApp, useTick } from '@inlet/react-pixi'
import React, { Suspense, useContext, useState, useEffect } from 'react'
import Tilemap from './components/Tilemap'
import Camera, { CameraContext } from './components/Camera'
import Input from './components/Input'

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

const App = () => (
  <Stage width={256} height={224}>
    <Camera width={256} height={224} worldHeight={1000} worldWidth={1000}>
      <Suspense fallback={<Text text="Loading..." style={{ fill: 'white' } as any} x={0} y={0} />}>
        <>
          <Tilemap tilemapUrl="/static/tilemap/test.tmx" />
          <Player />
        </>
      </Suspense>
    </Camera>
  </Stage>
)

export default App
