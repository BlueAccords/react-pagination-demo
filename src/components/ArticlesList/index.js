// Nav bar, supports desktop and mobile menu
// used in main layout

import React from 'react';
import PT from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Table } from 'react-bootstrap';

import { actions as articleActions } from './../../rdx/articles';
import { selectors as articleSelectors } from './../../rdx/articles'
import Article from './Article';


class ArticleList extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { actions } = this.props;
    actions.fetchArticles(1);
  }

  render() {
    const { allArticles } = this.props;
    return(
      <div>
        <Table responsive> 
          <thead>
            <tr>
              <th>Id</th>
              <th>Title</th>
              <th>Description</th>
              <th>Folder Type</th>
            </tr>
          </thead>
          <tbody>
          { allArticles.map((article) => {
              return <Article
                key={article.id} 
                id={article.id}
                title={article.title}
                description={article.description}
                folder_type={article.folder_type}
                />
            })
          }
          </tbody>
        </Table>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      actions: bindActionCreators({
        fetchArticles: articleActions.articlesFetchRequest,
      }, dispatch)
  }
}

const mapStateToProps = (state) => {
  return {
    allArticles: articleSelectors.getAllArticles(state)
  }
}

ArticleList.propTypes = {};

export default connect(mapStateToProps, mapDispatchToProps)(ArticleList);