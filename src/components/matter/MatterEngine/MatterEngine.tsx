import { Engine, Runner } from 'matter-js'
import React, { useRef, useMemo, useEffect } from 'react'
import MatterEngineContext from './MatterEngineContext'
import { useTick } from '@inlet/react-pixi'

export default function MatterEngine(props: { children: JSX.Element | JSX.Element[] }) {
  const engine = useRef(Engine.create())

  useEffect(() => {
    Engine.run(engine.current)
  }, [])

  useTick(delta => {
    Engine.update(engine.current, delta)
  })

  const value = useMemo(
    () => ({
      engine
    }),
    []
  )

  return <MatterEngineContext.Provider value={value}>{props.children}</MatterEngineContext.Provider>
}
