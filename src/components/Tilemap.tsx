import { PixiComponent, Sprite, Stage } from '@inlet/react-pixi'
import React, { Suspense } from 'react'
import * as PIXI from 'pixi.js'
import useResources from '../hooks/useResources'

const PixiTilemap = PixiComponent('Tilemap', {
  create: (props: { tilemap: string }) => {
    const tilemap = new PIXI.extras.TiledMap(props.tilemap)

    return tilemap
  },
  applyProps: (g, _, props: any) => {
    // noop
  }
})

const Tilemap = (props: { tilemap: string }) => {
  useResources([props.tilemap])
  return <PixiTilemap tilemap={props.tilemap} />
}

export default Tilemap
