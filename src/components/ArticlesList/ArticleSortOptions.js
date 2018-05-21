import React, { Fragment } from 'react';
import { ControlLabel, FormControl } from 'react-bootstrap';


const ArticleSortOptions = ({
  onSortKeyChange,
  onSortDirectionChange,
  sortKey,
  sortDirection,
  searchFilter,
  onSearchFilterChange
}) => {
  return (
    <Fragment>
      <ControlLabel>Sort By</ControlLabel>
      <FormControl 
        componentClass="select" 
        placeholder="id"
        onChange={onSortKeyChange}>
        <option value="id">Id</option>
        <option value="title">Title</option>
        <option value="description">Description</option>
        <option value="folder_type">Type</option>
      </FormControl>

      <ControlLabel>Sort Direction</ControlLabel>
      <FormControl 
        componentClass="select" 
        placeholder="ASC"
        onChange={onSortDirectionChange}>
        <option value="ASC">Ascending</option>
        <option value="DESC">Descending</option>
      </FormControl>

      <ControlLabel>Search</ControlLabel>
      <FormControl
        type="text"
        value={searchFilter}
        placeholder="Enter search terms..."
        onChange={onSearchFilterChange}
      />
    </Fragment>
  )
}

export default ArticleSortOptions;