import React, { Component } from 'react';
import ConnectedTodos from './Todos';
import ConnectedGoals from './Goals';
import { connect } from 'react-redux';
import {
  handleInitialData
} from '../actions/shared.js';


class App extends Component {
  componentDidMount () {
    const { dispatch } = this.props

    dispatch(handleInitialData());
  }

  render() {
    const { loading } = this.props;
    return (
      <div>
        {(loading === true) ? <h3>Loading...</h3> : <div>
            <ConnectedTodos />
            <ConnectedGoals />
          </div>
        }
      </div>
    )
  }
}
export default connect((state) => ({
  loading: state.loading
}))(App);