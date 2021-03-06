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
import ArticleFilterOptions from './ArticleFilterOptions';
import withPaginated from './../common/withPagination';

// composed with higher order function
const ArticleTableWithPaginated = withPaginated(ArticleTable);

class ArticleList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sortKey: 'id',
      sortDirection: 'ASC',
      searchFilter: null,
      optionsFilter: [
        {label: 'COMPLETE', checked: false},
        {label: 'INCOMPLETE', checked: false},
        {label: 'HIDDEN', checked: false},
      ]
    }

    this.handlePageJump = this.handlePageJump.bind(this);
    this.handleQueryParamChange = this.handleQueryParamChange.bind(this);
    this.handleSearchFilterChange = this.handleSearchFilterChange.bind(this);
    this.handleOptionFilterChange = this.handleOptionFilterChange.bind(this);
  }

  componentDidMount() {
    const { fetchArticles } = this.props.actions;
    fetchArticles(this.state);
  }

  handlePageJump(pageNum) {
    const { fetchArticles } = this.props.actions;
    return () => {
      fetchArticles({
        ...this.state,
        page: pageNum
      });
    }
  }

  // returns a function that changes query param based on the passed param.
  handleQueryParamChange(keyName) {
    return (e) => {
      this.setState({
        [keyName]: e.target.value
      }, () => {
        this.props.actions.fetchArticles({
          ...this.state,
          clearCache: true
        });
      });
    }
  }

  // special version for filter to add a debounce delay while user is typing
  handleSearchFilterChange(e) {
    this.setState({
      searchFilter: e.target.value
    }, () => {
      this.props.actions.changeSearchFilter({
        ...this.state,
        clearCache: true
      });
    });
  }

  handleOptionFilterChange(index) {
    return (e) => {
      const { optionsFilter } = this.state;
      optionsFilter[index].checked = !optionsFilter[index].checked;

      this.setState({
        optionsFilter
      }, () => {
        this.props.actions.fetchArticles({
          ...this.state,
          clearCache: true,
          page: 1
        });
      });

      // TODO: change fetchArticles to include option to set page to 1
    }
  }


  render() {
    const { allArticles, isLoading, currentPageArticles, currentPage, lastPage } = this.props;
    return (
      <Fragment>
        <ArticleFilterOptions 
          optionsList={this.state.optionsFilter}
          handleChange={this.handleOptionFilterChange}
        /> 
        {/* TODO: finish the component */}
        <ArticleSortOptions
          sortKey={this.state.sortKey}
          sortDirection={this.state.sortDirection}
          onSearchFilterChange={this.handleSearchFilterChange}
          onSortKeyChange={this.handleQueryParamChange('sortKey')} 
          onSortDirectionChange={this.handleQueryParamChange('sortDirection')} 
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
        changeSearchFilter: articleActions.articlesFilterRequest
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
  }
}

ArticleList.propTypes = {};

export default connect(mapStateToProps, mapDispatchToProps)(ArticleList);