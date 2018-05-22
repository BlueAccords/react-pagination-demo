import React, { Fragment } from 'react';
import PT from 'prop-types';

class ArticleFilterOptions extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { optionsList, handleChange } = this.props;
    return (
      optionsList.map((option, index) => {
        return (
          <Fragment key={option.label}>
            <label htmlFor={option.label}>
              {option.label} 
            </label>
            <input 
              id={option.label}
              key={option.label}
              type="checkbox"
              onChange={handleChange(index)}
              checked={option.checked} 
            />
            <br/>
          </Fragment>
        )
      })
    );
  }
}

ArticleFilterOptions.propTypes = {
  optionsList: PT.array.isRequired,
  handleChange: PT.func.isRequired
}

export default ArticleFilterOptions;