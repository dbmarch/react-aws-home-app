import React from 'react'
import { connect } from 'react-redux'

const PhotoPage = (props) => {
  return (
    <div>
      <h2>Photo Page</h2>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(PhotoPage)
