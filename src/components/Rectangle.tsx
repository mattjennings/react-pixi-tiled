import { PixiComponent } from '@inlet/react-pixi'
import * as PIXI from 'pixi.js'

export interface RectangleProps {
  x: number
  y: number
  width: number
  height: number
  color: number
  alpha?: number
  outline?: boolean
}

const Rectangle = PixiComponent<RectangleProps, PIXI.Graphics>('Rectangle', {
  create() {
    return new PIXI.Graphics()
  },
  applyProps(ins: PIXI.Graphics, oldProps: RectangleProps, newProps: RectangleProps) {
    ins.clear()

    if (newProps.outline) {
      ins.lineStyle(1, newProps.color)
      ins.drawRect(newProps.x, newProps.y, newProps.width, newProps.height)
    } else {
      ins.beginFill(newProps.color, newProps.alpha || 1)
      ins.drawRect(newProps.x, newProps.y, newProps.width, newProps.height)
      ins.endFill()
    }
  }
})

export default Rectangle
