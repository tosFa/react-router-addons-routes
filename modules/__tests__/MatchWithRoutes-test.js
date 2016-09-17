/*global expect*/
import MatchWithRoutes from '../MatchWithRoutes'
import React from 'react'
import renderer from 'react-test-renderer'

test('passes routes in as a prop', () => {
  const location = { pathname: '/foo' }
  const route = {
    pattern: '/foo',
    routes: [
      { pattern: '/child' }
    ],
    component: ({ routes }) => (
      <div>{routes[0].pattern}</div>
    )
  }
  const el = <MatchWithRoutes location={location} {...route} />
  const tree = renderer.create(el).toJSON()
  expect(tree.children[0]).toBe(route.routes[0].pattern)
})

