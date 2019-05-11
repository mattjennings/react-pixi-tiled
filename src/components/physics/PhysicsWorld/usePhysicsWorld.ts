import { useContext } from 'react'
import PhysicsWorldContext from './PhysicsWorldContext'

export default function usePhysicsWorld() {
  return useContext(PhysicsWorldContext)
}
