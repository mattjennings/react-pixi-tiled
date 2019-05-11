import React, { useRef, useMemo, useEffect } from 'react'
import PhysicsWorldContext from './PhysicsWorldContext'
import { useTick, useApp } from '@inlet/react-pixi'
import { World, WorldOptions } from 'p2'

export interface PhysicsWorldProps extends WorldOptions {
  children: JSX.Element | JSX.Element[]
}
export default function PhysicsWorld({ children, ...worldOptions }: PhysicsWorldProps) {
  const world = useRef(
    new World({
      ...worldOptions
    })
  )

  useTick(delta => {
    world.current.step(delta)
  })

  const value = useMemo(() => world, [JSON.stringify(worldOptions)])

  return <PhysicsWorldContext.Provider value={value}>{children}</PhysicsWorldContext.Provider>
}
