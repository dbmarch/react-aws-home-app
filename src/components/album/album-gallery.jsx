import React from 'react'
import isEmpty from 'lodash/isEmpty'
import map from 'lodash/map'

import Container from 'react-bootstrap/Container'
import Album from './album.jsx'

const AlbumGallery = gallery => {
	console.info('gallery')

	return (
		<div className="album-gallery">
			<h3>Albums</h3>
			<Container>
				{!isEmpty(gallery) && map(gallery, album => <Album key={album.name} name={album.name} />)}
				<Album create />
			</Container>
		</div>
	)
}

export default AlbumGallery
