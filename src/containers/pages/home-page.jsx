import React from 'react'
import { connect } from 'react-redux'
import AlbumGallery from '../../components/album-gallery'
import PhotoCard from '../../components/photo-card'

const HomePage = props => {
	return (
		<div>
			<h2>Home Page</h2>

			<br />
			<br />
			<br />
			<PhotoCard title="Photo Title" description="This is some text" />

			<AlbumGallery />
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
