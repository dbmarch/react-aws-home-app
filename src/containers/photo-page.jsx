import React from 'react'
import { connect } from 'react-redux'
import { getPhotoList, getPhotoUrlList } from '../selectors'
import { fetchPhotoList } from '../actions'
import Gallery from 'react-photo-gallery'
import Button from 'react-bootstrap/Button'

const PhotoPage = ({ fetchPhotoList, photoUrlList }) => {
	const photos = photoUrlList.map(photo => ({ src: photo, width: 4, height: 3 }))

	// const photos = [
	// 	{
	// 		src: 'http://3.bp.blogspot.com/-4rOXeHNuiT8/UTUeKmBrMwI/AAAAAAAAA0I/TuvYLinlSL4/s1600/sea+turtle.jpg',
	// 		width: 4,
	// 		height: 3,
	// 	},
	// 	{
	// 		src:
	// 			'https://2.bp.blogspot.com/-eIEBfuAjGPY/Vuc8pCJ_hmI/AAAAAAAAAEE/0ou34I1xCls7UfRqXwfuVg4Z-qeOwlQKQ/s1600/Green%2BSea%2BTurtle.jpg',
	// 		width: 4,
	// 		height: 3,
	// 	},
	// ]

	return (
		<div className="photo-page">
			<h2>React Photo Gallery</h2>
			<Button onClick={fetchPhotoList}>FETCH PHOTOS</Button>
			<Gallery photos={photos} />;
		</div>
	)
}

const mapStateToProps = state => {
	return {
		photoList: getPhotoList(state),
		photoUrlList: getPhotoUrlList(state),
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
