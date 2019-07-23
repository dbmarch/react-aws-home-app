//import '../../node_modules/react-image-gallery/styles/css/image-gallery.css'

import React from 'react'
import { connect } from 'react-redux'
import { getPhotoList, getPhotoSrcList } from '../../selectors'
import { fetchPhotoList } from '../../actions'
import ImageGallery from 'react-image-gallery'

const PhotoPage = props => {
	const photos = props.photoSrcList
	const images = photos.map(photo => ({ original: photo }))
	// const images = [
	// 	{
	// 		original: 'http://3.bp.blogspot.com/-4rOXeHNuiT8/UTUeKmBrMwI/AAAAAAAAA0I/TuvYLinlSL4/s1600/sea+turtle.jpg'
	// 	},
	// 	{
	// 		original:
	// 			'https://2.bp.blogspot.com/-eIEBfuAjGPY/Vuc8pCJ_hmI/AAAAAAAAAEE/0ou34I1xCls7UfRqXwfuVg4Z-qeOwlQKQ/s1600/Green%2BSea%2BTurtle.jpg'
	// 	},
	// 	{
	// 		original:
	// 			'https://2.bp.blogspot.com/-eIEBfuAjGPY/Vuc8pCJ_hmI/AAAAAAAAAEE/0ou34I1xCls7UfRqXwfuVg4Z-qeOwlQKQ/s1600/Green%2BSea%2BTurtle.jpg'
	// 	}
	// ]

	return (
		<div className="photo-page">
			<h2>React Photo Gallery</h2>
			return <ImageGallery items={images} />
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
		fetchPhotoList: () => dispatch(fetchPhotoList()),
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(PhotoPage)
