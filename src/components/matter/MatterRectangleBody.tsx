import React, { useRef, useEffect, useState } from 'react'
import { Bodies, IChamferableBodyDefinition, World, Body, Vector } from 'matter-js'
import { useMatterEngine } from './MatterEngine'
import { useTick } from '@inlet/react-pixi'
import useForceUpdate from '../../hooks/useForceUpdate'

export interface MatterRectangleBodyRenderArgs {
  body: Body

  setVelocity: (args: { x?: number; y?: number }) => any
}

export interface MatterRectangleBodyProps {
  x: number
  y: number
  width: number
  height: number
  options?: IChamferableBodyDefinition
  children?: (args: MatterRectangleBodyRenderArgs) => any
}

export default function MatterRectangleBody({ x, y, width, height, options, children }: MatterRectangleBodyProps) {
  const { engine } = useMatterEngine()
  const body = useRef(Bodies.rectangle(x, y, width, height, options))
  const forceUpdate = useForceUpdate()

  useEffect(() => {
    World.add(engine.current.world, [body.current])
  }, [])

  useTick(delta => {
    forceUpdate()
  })

  return children({
    body: body.current,
    setVelocity: (args: { x?: number; y?: number }) => {
      Body.setVelocity(body.current, Vector.create(args.x, args.y))
    }
  })
}
