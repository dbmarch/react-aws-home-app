import React from 'react'
import isEmpty from 'lodash/isEmpty'
import map from 'lodash/map'

import Container from 'react-bootstrap/Container'
import Album from './album.jsx'

const AlbumGallery = ({ gallery }) => {
	return (
		<div className="album-gallery">
			<h3>Albums</h3>
			<Container>
				{!isEmpty(gallery) && map(gallery, (album, index) => <Album key={index} name={album.name} />)}
				<Album key="new" create />
			</Container>
		</div>
	)
}

export default AlbumGallery
