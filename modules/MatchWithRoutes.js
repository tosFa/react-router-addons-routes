import React from 'react'
import Match from 'react-router/Match'

const { array, func } = React.PropTypes

const MatchWithRoutes = ({ routes, component:Component, ...rest }) => (
  <Match {...rest} render={(matchProps) => (
    <Component {...matchProps} routes={routes}/>
  )}/>
)

MatchWithRoutes.propTypes = {
  routes: array,
  component: func.isRequired
}

export default MatchWithRoutes

