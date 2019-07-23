import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import ClipboardJS from 'clipboard'

// const copyText = elementId => {
// 	const el = document.getElementById(elementId)
// 	el.contentEditable = true
// 	if (document.selection) {
// 		//IE
// 		const r = document.body.createTextRange()
// 		r.moveToElementText(el)
// 		r.select()
// 	} else if (window.getSelection) {
// 		//others
// 		const r = document.createRange()
// 		r.selectNode(el)
// 		window.getSelection().addRange(r)
// 	}
// 	document.execCommand('copy')
// }

const HomePage = props => {
	useEffect(() => {
		console.info('useEffect')
		const clipboard = new ClipboardJS('.clipboard')

		clipboard.on('success', e => {
			console.info('successfully copied')
			e.clearSelection()
		})

		clipboard.on('error', e => {
			console.error('Action', e.action)
			console.error('Trigger', e.trigger)
		})

		return () => {
			console.info('cleanup')
			clipboard.destroy()
		}
	})

	return (
		<div>
			<h2>Home Page</h2>
			<a id="anchor-copy" href="http://www.google.com" target="_blank" rel="noopener noreferrer nofollow">
				This is a hyperlink
			</a>
			<br />
			{
				//<button onClick={() => copyText('anchor-copy')}>COPY</button>
			}
			<br />
			<hr />
			<button type="button" className="clipboard" data-clipboard-target="#anchor-copy">
				Copy Anchor
			</button>

			<br />
			<br />
			<br />
		</div>
	)
}

const mapStateToProps = state => {
	return {}
}

const mapDispatchToProps = dispatch => ({})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(HomePage)
