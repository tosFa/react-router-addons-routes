/*global expect*/
import NamedLink from '../NamedLink'
import RoutesProvider from '../RoutesProvider'
import React from 'react'
import renderer from 'react-test-renderer'

const location = { pathname: '/foo' }

const routes = [
  { pattern: '/',
    name: 'parent',
    routes: [
      { pattern: '/child1',
        name: 'child1'
      },
      { pattern: '/child2/:id',
        name: 'child2'
      }
    ]
  }
]


test('renders correct href for a root route', () => {
  const el = (
    <RoutesProvider routes={routes}>
      <NamedLink to="parent" location={location} />
    </RoutesProvider>
  )
  const tree = renderer.create(el).toJSON()
  expect(tree.props.href).toBe('/')
})

test('renders correct href for a nested route', () => {
  const el = (
    <RoutesProvider routes={routes}>
      <NamedLink to="child1" location={location} />
    </RoutesProvider>
  )
  const tree = renderer.create(el).toJSON()
  expect(tree.props.href).toBe('/child1')
})

test('renders correct href for a nested route with params', () => {
  const el = (
    <RoutesProvider routes={routes}>
      <NamedLink to="child2" params={{ id: 'test' }} location={location} />
    </RoutesProvider>
  )
  const tree = renderer.create(el).toJSON()
  expect(tree.props.href).toBe('/child2/test')
})

