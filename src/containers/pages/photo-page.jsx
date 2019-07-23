import React from 'react'
import { connect } from 'react-redux'
import { getPhotoList, getPhotoSrcList } from '../../selectors'
import { fetchPhotoList } from '../../actions'
import Gallery from 'react-photo-gallery'
import Button from 'react-bootstrap/Button'
import UploadPhoto from '../../components/UploadPhoto'

const PhotoPage = ({ fetchPhotoList, photoList, photoSrcList }) => {
	const photos = photoSrcList.map(photo => ({ src: photo, width: 4, height: 3 }))

	return (
		<div className="photo-page">
			<h2>React Photo Gallery</h2>
			<Button onClick={fetchPhotoList}>FETCH PHOTOS</Button>
			<Gallery photos={photos} />
			<br />
			<hr />

			<UploadPhoto />
		</div>
	)
}

const mapStateToProps = state => {
	return {
		photoList: getPhotoList(state),
		photoSrcList: getPhotoSrcList(state),
	}
}

const mapDispatchToProps = dispatch => {
	return {
		fetchPhotoList: () => dispatch(fetchPhotoList(null)),
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(PhotoPage)
