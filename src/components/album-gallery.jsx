import React from 'react'
import isEmpty from 'lodash/isEmpty'
import Album from './album.jsx'

const AlbumGallery = gallery => {
	console.info('gallery')

	return (
		<div className="album-gallery">
			<h3>Albums</h3>
			{!isEmpty(gallery) && gallery.map(album => <Album name={album.name} />)}
			<Album create />
		</div>
	)
}

export default AlbumGallery
