import React from 'react'
import { connect } from 'react-redux'

const HomePage = (props) => {
  return (
    <div>
      <h2>Home Page</h2>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
