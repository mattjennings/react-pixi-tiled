import React, { useRef, useEffect } from 'react'

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

    return camera
  },
  applyProps: (g: Viewport, _, props: any) => {
    // noop
  }
})

interface CameraContextValue {
  camera?: { current?: Viewport }
  moveCamera: (x: number, y: number) => any
}

export const CameraContext = React.createContext<CameraContextValue>({
  moveCamera: () => {}
})

export default function Camera({ children, ...props }: CameraProps) {
  const camera = useRef<Viewport>(null)

  function moveCamera(x: number, y: number) {
    if (camera.current) {
      camera.current.moveCenter(x, y)
    }
  }

  return (
    <CameraComponent {...props} ref={camera as any}>
      <CameraContext.Provider value={{ camera, moveCamera }}>{children}</CameraContext.Provider>
    </CameraComponent>
  )
}
