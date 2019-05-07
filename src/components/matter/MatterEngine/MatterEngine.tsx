import { Engine, Runner, Render } from 'matter-js'
import React, { useRef, useMemo, useEffect } from 'react'
import MatterEngineContext from './MatterEngineContext'
import { useTick, useApp } from '@inlet/react-pixi'

export default function MatterEngine(props: { children: JSX.Element | JSX.Element[] }) {
  const engine = useRef(Engine.create())
  const app = useApp()

  const debugRenderer = useRef(
    Render.create({
      element: app.view.parentElement,
      engine: engine.current,
      options: {
        width: app.view.width,
        height: app.view.height,
        pixelRatio: 'auto',
        background: 'transparent',
        wireframeBackground: 'transparent',
        hasBounds: true,
        enabled: true,
        wireframes: true,
        showSleeping: true,
        showDebug: false,
        showBroadphase: false,
        showBounds: false,
        showVelocity: false,
        showCollisions: false,
        showSeparations: false,
        showAxes: false,
        showPositions: false,
        showAngleIndicator: false,
        showIds: false,
        showShadows: false,
        showVertexNumbers: false,
        showConvexHulls: false,
        showInternalEdges: false,
        showMousePosition: false
      } as any
    })
  )

  debugRenderer.current.canvas.id = 'matter-debug'

  useEffect(() => {
    Engine.run(engine.current)
    Render.run(debugRenderer.current)
  }, [])

  useTick(delta => {
    Engine.update(engine.current, delta)
  })

  const value = useMemo(
    () => ({
      engine,
      debugRenderer
    }),
    []
  )

  return <MatterEngineContext.Provider value={value}>{props.children}</MatterEngineContext.Provider>
}
