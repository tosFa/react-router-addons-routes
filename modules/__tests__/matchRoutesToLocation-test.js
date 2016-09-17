/*global expect*/
import matchRoutesToLocation from '../matchRoutesToLocation'

const routes = [
  { pattern: '/',
    name: 'root',
    routes: [
      { pattern: '/foo',
        name: 'foo'
      },
      { pattern: '/bar',
        name: 'bar'
      }
    ]
  }
]

test('finds matched routes', () => {
  const location = { pathname: '/foo' }
  const matchedRoutes = matchRoutesToLocation(routes, location)
  expect(matchedRoutes.length).toEqual(2)
  expect(matchedRoutes[0]).toEqual(routes[0])
  expect(matchedRoutes[1]).toEqual(routes[0].routes[0])
})

