// Nav bar, supports desktop and mobile menu
// used in main layout

import React, {Fragment} from 'react';
import PT from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Table } from 'react-bootstrap';

import { actions as articleActions } from './../../rdx/articles';
import { selectors as articleSelectors } from './../../rdx/articles'
import ArticleTable from './ArticleTable';
import ArticleSortOptions from './ArticleSortOptions';
import withPaginated from './../common/withPagination';

// composed with higher order function
const ArticleTableWithPaginated = withPaginated(ArticleTable);


class ArticleList extends React.Component {
  constructor(props) {
    super(props);

    this.handlePageJump = this.handlePageJump.bind(this);
    this.handleSortKeyChange = this.handleSortKeyChange.bind(this);
    this.handleSortDirectionChange = this.handleSortDirectionChange.bind(this);
  }

  componentDidMount() {
    const { fetchArticles } = this.props.actions;
    fetchArticles(1);
  }

  handlePageJump(pageNum) {
    const { fetchArticles } = this.props.actions;
    return () => {
      fetchArticles(pageNum);
    }
  }

  handleSortKeyChange(e) {
    this.props.actions.changeSortKey(e.target.value);
  }

  handleSortDirectionChange(e) {
    this.props.actions.changeSortDirection(e.target.value);
  }


  render() {
    const { allArticles, isLoading, currentPageArticles, currentPage, lastPage,
            sortKey, sortDirection } = this.props;
    return (
      <Fragment>
        <ArticleSortOptions
          sortKey
          sortDirection
          onSortKeyChange={this.handleSortKeyChange} 
          onSortDirectionChange={this.handleSortDirectionChange} 
        />
        <ArticleTableWithPaginated
          allArticles={allArticles}
          isLoading={isLoading}
          currentPageArticles={currentPageArticles}
          onJump={this.handlePageJump}
          itemsCurrentPage={currentPage}
          itemsLastPage={lastPage}
        />
      </Fragment>
    )
        
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      actions: bindActionCreators({
        fetchArticles: articleActions.articlesFetchRequest,
        changeSortKey: articleActions.articlesSetSortKeyRequest,
        changeSortDirection: articleActions.articlesSetSortDirectionRequest,
      }, dispatch)
  }
}

const mapStateToProps = (state) => {
  return {
    allArticles: articleSelectors.getAllArticles(state),
    currentPageArticles: articleSelectors.getAllArticlesOfCurrentPage(state),
    isLoading: state.articles.isLoading,
    currentPage: state.articles.currentPage,
    lastPage: state.articles.lastPage,
    sortKey: state.articles.sortKey,
    sortDirection: state.articles.sortDirection
  }
}

ArticleList.propTypes = {};

export default connect(mapStateToProps, mapDispatchToProps)(ArticleList);