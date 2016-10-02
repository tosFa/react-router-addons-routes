import matchPattern from 'react-router/matchPattern'

const mergePatterns = (a, b) => {
  return a[a.length-1] === '/' && b[0] === '/' ?
    `${a.slice(0, a.length-1)}${b}` :
    `${a}${b}`
}

const matchRoutesToLocation = (routes, location, matches=[], parentPattern='') => {
  routes.forEach((route) => {
    const nestedPattern = mergePatterns(parentPattern, route.pattern)
    if (matchPattern(nestedPattern, location)) {
      matches.push(route)
      if (route.routes) {
        matchRoutesToLocation(route.routes, location, matches, nestedPattern)
      }
    }
  })
  return matches
}

export default matchRoutesToLocation
