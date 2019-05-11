import React, { useRef, useEffect, useState } from 'react'
import { useTick } from '@inlet/react-pixi'
import useForceUpdate from '../../hooks/useForceUpdate'
import { Body, BodyOptions, Shape, ContactMaterial, Material } from 'p2'
import usePhysicsWorld from './PhysicsWorld/usePhysicsWorld'
import useRenderOnTick from '../../hooks/useRenderOnTick'

export interface PhysicsBodyRenderArgs {
  position: {
    x: number
    y: number
  }
  body: Body

  setVelocity: (args: { x?: number; y?: number }) => any
}

export interface PhysicsBodyProps extends BodyOptions {
  shape: Shape
  material?: Material
  x?: number
  y?: number
  roundNearestPixel?: boolean
  contactMaterials?: ContactMaterial[]
  children?: (args: PhysicsBodyRenderArgs) => any
}

function PhysicsBody({
  x,
  y,
  shape,
  children,
  roundNearestPixel,
  material,
  contactMaterials,
  ...bodyOptions
}: PhysicsBodyProps) {
  useRenderOnTick()
  const world = usePhysicsWorld()

  const body = useRef(
    new Body({
      position: [x, y],
      ...bodyOptions
    })
  )

  useEffect(() => {
    if (material) {
      shape.material = material
    }
    body.current.addShape(shape)
    world.current.addBody(body.current)

    if (contactMaterials) {
      contactMaterials.forEach(contactMaterial => world.current.addContactMaterial(contactMaterial))
    }

    return () => {
      world.current.removeBody(body.current)

      // cleanup contact material
      if (contactMaterials) {
        contactMaterials.forEach(contactMaterial => world.current.removeContactMaterial(contactMaterial))
      }
    }
  }, [])

  return children({
    body: body.current,
    position: {
      x: roundNearestPixel ? Math.round(body.current.position[0]) : body.current.position[0],
      y: roundNearestPixel ? Math.round(body.current.position[1]) : body.current.position[1]
    },
    setVelocity: (args: { x?: number; y?: number }) => {
      const prevX = body.current.velocity[0]
      const prevY = body.current.velocity[1]

      body.current.velocity = [args.x !== undefined ? args.x : prevX, args.y !== undefined ? args.y : prevY]
    }
  })
}

PhysicsBody.defaultProps = {
  roundNearestPixel: true
}
export default PhysicsBody
