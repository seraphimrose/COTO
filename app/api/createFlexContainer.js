import React, { Component } from 'react'

export default ({widthOffset=0, heightOffset=0, minWidth=false}={}) => (MyComponent) => (
	class SizeContainer extends Component {
		constructor(props) {
			super(props)
			this.state = { renderPage: false }
			this._onResize = this._onResize.bind(this)
			this._update = this._update.bind(this)
		}

		componentDidMount() {
			this._update()
			const win = window
			if (win.addEventListener) {
				win.addEventListener('resize', this._onResize, false)
			} else if (win.attachEvent) {
				win.attachEvent('onresize', this._onResize)
			} else {
				win.onresize = this._onResize
			}
		}

		componentWillUnmount() {
			const win = window
			if (win.removeEventListener) {
				win.removeEventListener('resize', this._onResize, false)
			} else if (win.detachEvent) {
				win.detachEvent('onresize', this._onResize)
			} else {
				win.onresize = null
			}
		}

		_onResize() {
			clearTimeout(this._updateTimer)
			this._updateTimer = setTimeout(() => this._update(), 16)
		}

		_update() {
			const html = document.documentElement
			const width = html.clientWidth - widthOffset
			const height = html.clientHeight - heightOffset

			this.setState({
				renderPage: true,
				width: minWidth ? (width < minWidth ? minWidth : width) : width,
				height
			})
		}

		render() {
			const { renderPage } = this.state
			return (
				<div style={{minHeight: '100%'}}>
					{renderPage && <MyComponent {...this.state} {...this.props}/>}
				</div>
			)
		}
	}
)