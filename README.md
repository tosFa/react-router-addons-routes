# react-router-addons-routes [![Travis][build-badge]][build] [![npm package][npm-badge]][npm]

[build-badge]: https://img.shields.io/travis/ReactTraining/react-router-addons-routes/master.svg?style=flat-square
[build]: https://travis-ci.org/ReactTraining/react-router-addons-routes

[npm-badge]: https://img.shields.io/npm/v/react-router-addons-routes.svg?style=flat-square
[npm]: https://www.npmjs.com/package/react-router-addons-routes

[`react-router-addons-routes`](https://www.npmjs.com/package/react-router-addons-routes) Centralized route configuration conventions and components for React Router.

## Installation

Using [npm](https://www.npmjs.com/):

    $ npm install --save react-router-addons-routes

Then with a module bundler like [webpack](https://webpack.github.io/), use as you would anything else:

```js
// using an ES6 transpiler, like babel
import { NamedLink } from 'react-router-addons-routes'

// not using an ES6 transpiler
var NamedLink = require('react-router-addons-routes').NamedLink
```

The UMD build is also available on [unpkg](https://unpkg.com):

```html
<script src="https://unpkg.com/react-router-addons-routes/umd/react-router-addons-routes.min.js"></script>
```

You can find the library on `window.ReactRouter.addons.Routes

## Motivation

With the introduction of React Router v4, there is no longer a centralized route configuration. There are some use-cases where it is valuable to know about all the app's potential routes such as:

- Loading data on the server or in the lifecycle before rendering the next screen
- Linking to routes by name
- Static analysis

This project seeks to define a shared format for others to build patterns on top of.

## We Need Help Here

We aren't particularly interested in using this ourselves, which runs the risk of us not prioritizing this project. It is a valuable piece of UI routing that deserves some strong patterns by people who rely on it.

This is meant as a starting point for folks out there who are very interested in it, who will quickly take ownership of it :D

## Route Configuration Shape

Routes are objects with the same properties as `<Match>` with the addition of `routes` for sub routes and `name`. Also, consumers are free to add any additional props they'd like.

```js
const routes = [
  { pattern: '/',
    name: 'root',
    component: Root,
    routes: [
      { pattern: '/child/:id',
        name: 'child',
        component: Child
      }
    ]
  }
]
```

## API

### `matchRoutesToLocation(routes, location)`

Returns an object containing the following properties
- `matchedRoutes`, an array of routes that match the location
- `params`, an object of URL parameter names and matching values

```js
const location = { pathname: '/brad-pitt/is/my-cousin' }
const { matchedRoutes, params } = matchRoutesToLocation(routes, location)

// now you could do some sort of data loading
// lets assume the route's components have a `loadData` static
// function on them:
Promise.all(
  matchedRoutes.filter(route => route.component.loadData).map(route => (
    route.loadData(params)
  ))
).then(data => {
  // put the data somewhere and render
})
```

This can be used server-side or in a data component's lifecycle to determine which routes are going to be rendered next. Ideal for data loading.


###  `<RoutesProvider routes>`

Puts your `routes` on context so other components can work with them.

```jsx
ReactDOM.render((
  <RoutesProvider routes={routes}>
    <App/>
  </RoutesProvider>
), el)
```

### `<MatchWithRoutes>`

A sub-routes aware replacement for `<Match>`. Render these instead and they will pass down the sub routes to the next rendered route component.

```js
const App = ({ routes }) => (
  <BrowserRouter>
    <RoutesProvider routes={routes}>
      <div>
        <h1>App</h1>
        {routes.map(route => <MatchWithRoutes {...route}/>)}
      </div>  
    </RoutesProvider>
  </BrowserRouter>
)

const Child = ({ routes }) => (
  <div>
    <h2>Child</h2>
    {routes.map(route => <MatchWithRoutes {...route}/>)}
  </div>  
)

//////////////////////////////////////////////////////////
const routes = [
  { pattern: '/',
    name: 'root',
    component: Root,
    routes: [
      { pattern: '/child/:id',
        name: 'child',
        component: Child
      }
    ]
  }
]

ReactDOM.render(<App routes={routes}/>, el)
```

### `<NamedLink to params>`

Links to routes by name.

```jsx
const routes = [
  { name: 'user',
    pattern: '/users/:id'
  }
]

<NamedLink to="user" params={{ id: user.id }}>
  {user.name}
</NamedLink>
```

### `<NamedRedirect>`

Not implemented.

