require('pixi-tiledmap')
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './styles.css'
import scaleToWindow from './scaleToWindow'

ReactDOM.render(<App />, document.getElementById('root'))

// quick way to scale up canvas to fill screen
// https://github.com/kittykatattack/scaleToWindow
const scale = () => scaleToWindow(document.getElementById('root').querySelector('canvas'))
scale()
window.addEventListener('resize', () => {
  scale()
})
