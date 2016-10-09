/*global expect*/
import matchRoutesToLocation from '../matchRoutesToLocation'

const routes = [
  { pattern: '/',
    name: 'root',
    routes: [
      { pattern: '/foo',
        name: 'foo',
        routes: [
          { pattern: '/:bar',
            name: 'bar',
            routes: [
              { pattern: '/:baz',
                name: 'baz'
              }
            ]
          }
        ]
      }
    ]
  }
]

test('finds matched routes', () => {
  const location = { pathname: '/foo/bar' }
  const { matchedRoutes } = matchRoutesToLocation(routes, location)
  expect(matchedRoutes.length).toEqual(3)
  expect(matchedRoutes[0]).toEqual(routes[0])
  expect(matchedRoutes[1]).toEqual(routes[0].routes[0])
  expect(matchedRoutes[2]).toEqual(routes[0].routes[0].routes[0])
})

test('extracts matching params', () => {
  const location = { pathname: '/foo/bar/baz' }
  const { params } = matchRoutesToLocation(routes, location)
  expect(params).toEqual({ bar: 'bar', baz: 'baz' })
})
