import { PixiComponent, Sprite, Stage, Text } from '@inlet/react-pixi'
import React, { Suspense, useContext, useState, useEffect } from 'react'
import Tilemap from './components/Tilemap'
import Camera, { CameraContext } from './components/Camera'
import Input from './components/Input'

const Player = () => {
  const { camera } = useContext(CameraContext)

  return (
    <>
      {/* A */}
      <Input
        keyCode={68}
        onDown={() => {
          camera.current.moveCorner(camera.current.corner.x + 2, camera.current.corner.y)
        }}
      />
      {/* D */}
      <Input
        keyCode={65}
        onDown={() => {
          camera.current.moveCorner(camera.current.corner.x - 2, camera.current.corner.y)
        }}
      />
      {/* W */}
      <Input
        keyCode={87}
        onDown={() => {
          camera.current.moveCorner(camera.current.corner.x, camera.current.corner.y - 2)
        }}
      />
      {/* S */}
      <Input
        keyCode={83}
        onDown={() => {
          camera.current.moveCorner(camera.current.corner.x, camera.current.corner.y + 2)
        }}
      />

      <Sprite image="/static/bunny.png" x={100} y={100} />
    </>
  )
}

const FirstStage = () => (
  <Stage width={256} height={224}>
    <Camera width={256} height={224} worldHeight={1000} worldWidth={1000}>
      <Suspense fallback={<Text text="Loading..." style={{ fill: 'white' } as any} x={0} y={0} />}>
        <>
          <Tilemap tilemap="/static/tilemap/test.tmx" />
          <Player />
        </>
      </Suspense>
    </Camera>
  </Stage>
)

const App = () => <FirstStage />

export default App
