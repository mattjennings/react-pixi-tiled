import React from 'react'
import { Engine } from 'matter-js'

export interface MatterEngineContextValue {
  engine?: React.RefObject<Engine>
}

const MatterEngineContext = React.createContext<MatterEngineContextValue>({
  engine: null
})

export default MatterEngineContext
