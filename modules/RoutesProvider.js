import React, { PropTypes } from 'react'

class RoutesProvider extends React.Component {
  static childContextTypes = {
    routes: PropTypes.array
  }

  static propTypes = {
    routes: PropTypes.array,
    children: PropTypes.node
  }

  getChildContext() {
    return {
      routes: this.props.routes
    }
  }

  render() {
    return React.Children.only(this.props.children)
  }
}

export default RoutesProvider
