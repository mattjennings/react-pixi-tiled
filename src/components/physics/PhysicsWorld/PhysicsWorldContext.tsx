import React from 'react'
import { World } from 'p2'

const PhysicsWorldContext = React.createContext<React.RefObject<World>>(null)

export default PhysicsWorldContext
