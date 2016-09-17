import matchPattern from 'react-router/matchPattern'

const matchRoutesToLocation = (routes, location, matches=[]) => {
  routes.forEach((route) => {
    if (matchPattern(route.pattern, location)) {
      matches.push(route)
      if (route.routes) {
        matchRoutesToLocation(route.routes, location, matches)
      }
    }
  })
  return matches
}

export default matchRoutesToLocation
