import { useContext } from 'react'
import MatterEngineContext from './MatterEngineContext'

export default function useMatterEngine() {
  return useContext(MatterEngineContext)
}
