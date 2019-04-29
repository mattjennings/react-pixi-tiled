import React, { useRef } from 'react'

import Viewport from 'pixi-viewport'
import { PixiComponent, Sprite, Stage } from '@inlet/react-pixi'
import * as PIXI from 'pixi.js'

export interface CameraProps {
  cameraRef?: React.RefObject<Viewport>
  width: number
  height: number
  worldWidth: number
  worldHeight: number
  children?: JSX.Element
}

const CameraComponent = PixiComponent('Camera', {
  create: (props: CameraProps) => {
    const camera = new Viewport({
        screenWidth: props.width,
        screenHeight: props.height,
        worldWidth: props.worldWidth,
        worldHeight: props.worldHeight
      })

      // debug
    ;(window as any).camera = camera

    return camera
  },
  applyProps: (g: Viewport, _, props: any) => {
    // noop
  }
})

export const CameraContext = React.createContext<{ camera?: { current?: Viewport } }>({})

export default function Camera({ children, ...props }: CameraProps) {
  const camera = useRef(null) as any

  return (
    <CameraComponent {...props} ref={camera}>
      <CameraContext.Provider value={{ camera }}>{children}</CameraContext.Provider>
    </CameraComponent>
  )
}
