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

// const mapDispatchToProps = (dispatch) => {
//   return {
//       actions: bindActionCreators({
//         userLogoutRequest: authActions.userLogoutRequest,
//       }, dispatch)
//   }
// }

// const mapStateToProps = (state) => {
//   return {
//     user: state.auth.user,
//     isSessionLoaded: state.auth.isInitialSessionLoaded
//   }
// }

export default connect(null, null)(App);