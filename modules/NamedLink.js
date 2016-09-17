import React, { PropTypes } from 'react'
import Link from 'react-router/Link'
import pathToRegexp from 'path-to-regexp'

const findRouteByName = (nameToFind, routes) => {
  let foundRoute = null
  routes.some((route) => {
    if (route.name === nameToFind)
      foundRoute = route
    else if (route.routes)
      foundRoute = findRouteByName(nameToFind, route.routes)
    return foundRoute
  })
  return foundRoute
}

class NamedLink extends React.Component {

  static contextTypes = {
    routes: PropTypes.array
  }

  static propTypes = {
    to: PropTypes.string,
    params: PropTypes.object
  }

  static defaultProps = {
    params: {}
  }

  render() {
    const { to, params, ...rest } = this.props
    // TODO: handle location descriptors
    const route = findRouteByName(to, this.context.routes)
    const path = pathToRegexp.compile(route.pattern)(params)
    return <Link to={path} {...rest}/>
  }

}

export default NamedLink

