import React from 'react'

const Album = ({ create, name }) => {
	console.info('Console name: ', name)

	const getAlbumName = () => {
		console.info('get name')
	}
	return (
		<div className="album">
			{create && <p onClick={getAlbumName}>NEW</p>}
			<p>{name}</p>
		</div>
	)
}

export default Album
