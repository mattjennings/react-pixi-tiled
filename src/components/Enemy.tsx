import { Sprite } from '@inlet/react-pixi'
import React from 'react'

const Enemy = ({ x, y }: { x: number; y: number }) => {
  return <Sprite image="/static/enemy.gif" x={x} y={y} pivot={[0, 20]} />
}

export default Enemy
