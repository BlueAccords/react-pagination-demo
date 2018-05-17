import React from 'react';
import PT from 'prop-types';

const Article = ({ title, id, description, folder_type }) => {
  return (
    <tr>
      <td>{title}</td>
      <td>{id}</td>
      <td>{description}</td>
      <td>{folder_type}</td>
    </tr>
  )
}

Article.propTypes = {
  id: PT.number,
  title: PT.string,
  description: PT.string,
  folder_type: PT.string,
}

export default Article;