import { Stage, Text } from '@inlet/react-pixi'
import React, { Suspense } from 'react'
import Camera from './components/Camera'
import Player from './components/Player'
import Tilemap from './components/Tilemap'

const App = () => (
  <Stage width={256} height={224} options={{}}>
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
