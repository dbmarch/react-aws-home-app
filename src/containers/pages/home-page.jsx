import React from 'react'
import { connect } from 'react-redux'
import { getAlbumList } from '../../selectors'
import AlbumGallery from '../../components/album/album-gallery'
import PhotoCard from '../../components/photo/photo-card'

const HomePage = ({ albums }) => {
	return (
		<div>
			<h2>Home Page</h2>

			<br />
			<br />
			<br />
			<PhotoCard title="Photo Title" description="This is some text" />

			<AlbumGallery gallery={albums} />
		</div>
	)
}

const mapStateToProps = state => {
	return {
		albums: () => getAlbumList(state),
	}
}

const mapDispatchToProps = dispatch => ({})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(HomePage)
