import { PixiComponent, Sprite, Stage, Container } from '@inlet/react-pixi'
import React, { Suspense } from 'react'
import * as PIXI from 'pixi.js'
import useResources from '../hooks/useResources'
import Enemy from './Enemy'
import { useMatterEngine } from './matter/MatterEngine'
import { Engine, Body, Bodies, World } from 'matter-js'

export interface PixiTilemapProps {
  tilemap: typeof PIXI.extras.TiledMap
}

const PixiTilemap = PixiComponent('Tilemap', {
  create: (props: PixiTilemapProps) => {
    return props.tilemap
  },
  applyProps: (tilemap, _, props: any) => {
    // noop
  }
})

export interface TilemapProps {
  tilemapUrl: string
}

const Tilemap = (props: { tilemapUrl: string; children?: any }) => {
  useResources([props.tilemapUrl])
  const { engine } = useMatterEngine()

  // create tilemap from url
  const tilemap = new PIXI.extras.TiledMap(props.tilemapUrl)

  // create object layers
  const objectLayers = tilemap.layers.filter(layer => layer.type === 'object')

  // create bodies from collision layers
  tilemap.layers
    .filter(layer => layer.properties.collision)
    .map(layer => createCollisionLayerBodies(engine.current, layer))

  // iterate through each layer and instantiate the objects into components
  const instantiatedLayers = objectLayers.map((layer, index) => (
    <Container key={index}>{instantiateObjectLayer(layer)}</Container>
  ))

  return (
    <PixiTilemap tilemap={tilemap}>
      {instantiatedLayers}
      {props.children}
    </PixiTilemap>
  )
}

export default Tilemap

// basic example of how we might transform Tiled objects into components
function instantiateObjectLayer(objectLayer: any) {
  return objectLayer.objects.map((obj, index) => {
    switch (obj.type) {
      case 'Enemy':
        // ideally key would be a unique identifier from the layer but it doesn't seem to be populated
        return <Enemy key={index} x={obj.x} y={obj.y} />
      default:
        console.warn('Unknown object type: ' + obj.type)
        return null
    }
  })
}

function createCollisionLayerBodies(engine: Engine, layer: any) {
  if (layer.type === 'tile') {
    layer.tiles.forEach(tile => {
      if (tile.properties.collision) {
        const body = Bodies.rectangle(tile.x, tile.y, tile.width, tile.height, { isStatic: true, friction: 0 })
        World.add(engine.world, body)
      }
    })
  }
}
