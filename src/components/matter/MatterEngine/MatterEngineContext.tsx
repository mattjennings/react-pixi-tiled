import React from 'react'
import { Engine, Render } from 'matter-js'

export interface MatterEngineContextValue {
  engine?: React.RefObject<Engine>
  debugRenderer?: React.RefObject<Render>
}

const MatterEngineContext = React.createContext<MatterEngineContextValue>({})

export default MatterEngineContext
