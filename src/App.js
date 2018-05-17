// Nav bar, supports desktop and mobile menu
// used in main layout

import React from 'react';
import PT from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ArticleList from './components/ArticlesList';

// import { actions as authActions } from '../../../../state/authentication';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container">
        <ArticleList/>
      </div>
    )

  }
}

export default connect(null, null)(App);