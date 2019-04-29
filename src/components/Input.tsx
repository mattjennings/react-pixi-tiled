import { withPixiApp } from '@inlet/react-pixi'
import React from 'react'

export interface InputProps {
  keyCode: number
  onPress?: () => any
  onRelease?: () => any
  onDown?: (delta: number) => any
  onUp?: (delta: number) => any
}

export interface InputPropsWithInjections extends InputProps {
  app: PIXI.Application
}

export interface InputState {
  isDown: boolean
  isUp: boolean
}

class Input extends React.Component<InputPropsWithInjections, InputState> {
  public upListener: any
  public downListener: any

  public state = {
    isDown: false,
    isUp: true
  }

  constructor(props: InputPropsWithInjections) {
    super(props)

    props.app.ticker.add(this.loop, this)
  }

  public loop(delta: number) {
    const { onDown, onUp } = this.props
    const { isDown, isUp } = this.state
    if (isDown && onDown) {
      onDown(delta)
    }

    if (isUp && onUp) {
      onUp(delta)
    }
  }

  public componentWillMount() {
    this.downListener = (event: KeyboardEvent) => {
      const { keyCode, onPress } = this.props
      const { isUp } = this.state

      if (event.keyCode === keyCode) {
        if (isUp && onPress) {
          onPress()
        }
        this.setState({
          isDown: true,
          isUp: false
        })
        event.preventDefault()
      }
    }

    this.upListener = (event: KeyboardEvent) => {
      const { keyCode, onRelease } = this.props
      const { isDown } = this.state

      if (event.keyCode === keyCode) {
        if (isDown && onRelease) {
          onRelease()
        }
        this.setState({
          isDown: false,
          isUp: true
        })
        event.preventDefault()
      }
    }

    window.addEventListener('keydown', this.downListener, false)
    window.addEventListener('keyup', this.upListener, false)
  }

  public componentWillUnmount() {
    window.removeEventListener('keydown', this.downListener)
    window.removeEventListener('keyup', this.upListener)
    this.props.app.ticker.remove(this.loop, this)
  }

  public render() {
    return null
  }
}

export default withPixiApp(Input)
