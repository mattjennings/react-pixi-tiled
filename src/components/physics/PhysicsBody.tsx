import React, { useRef, useEffect, useState } from 'react'
import { useTick } from '@inlet/react-pixi'
import useForceUpdate from '../../hooks/useForceUpdate'
import { Body, BodyOptions, Shape, ContactMaterial, Material, Box } from 'p2'
import usePhysicsWorld from './PhysicsWorld/usePhysicsWorld'
import useRenderOnTick from '../../hooks/useRenderOnTick'
import Rectangle from '../Rectangle'

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
  x?: number
  y?: number
  material?: Material
  contactMaterials?: ContactMaterial[]

  /**
   * Renders physics collider
   */
  debug?: boolean

  /**
   * Disables rendering on each tick
   */
  disableTickRender?: boolean

  /**
   * The `position` argument in the render args will be rounded to nearest pixel
   */
  roundNearestPixel?: boolean
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
  debug,
  disableTickRender,
  ...bodyOptions
}: PhysicsBodyProps) {
  useRenderOnTick({ disable: disableTickRender })
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

  const position = {
    x: roundNearestPixel ? Math.round(body.current.position[0]) : body.current.position[0],
    y: roundNearestPixel ? Math.round(body.current.position[1]) : body.current.position[1]
  }

  const renderedChildren = children
    ? children({
        body: body.current,
        position,
        setVelocity: (args: { x?: number; y?: number }) => {
          const prevX = body.current.velocity[0]
          const prevY = body.current.velocity[1]

          body.current.velocity = [args.x !== undefined ? args.x : prevX, args.y !== undefined ? args.y : prevY]
        }
      })
    : null

  if (debug) {
    // this should be Shape.BOX? https://github.com/schteppe/p2.js/issues/185
    if (shape.type === Shape.CONVEX) {
      const box = shape as Box

      return (
        <>
          {renderedChildren}
          <Rectangle x={position.x} y={position.y} width={box.width} height={box.height} color={0xffffff} outline />
        </>
      )
    }
  }

  return renderedChildren
}

PhysicsBody.defaultProps = {
  roundNearestPixel: true
}
export default PhysicsBody
