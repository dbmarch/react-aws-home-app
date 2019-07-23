import React from 'react'

import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import isEmpty from 'lodash/isEmpty'

const PhotoCard = ({ title, description, image }) => {
	return (
		<Card className="photo-card">
			{!isEmpty(image) && <Card.Img variant="top" src="holder.js/100px180" />}
			<Card.Body>
				<Card.Title>{title}</Card.Title>
				<Card.Text>{description}</Card.Text>
				<Button variant="success">Comment</Button>
			</Card.Body>
		</Card>
	)
}

export default PhotoCard
