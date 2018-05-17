// Nav bar, supports desktop and mobile menu
// used in main layout

import React from 'react';
import PT from 'prop-types';
import { Table } from 'react-bootstrap';
import Article from './Article';


class ArticleTable extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { allArticles, isLoading, currentPageArticles } = this.props;
    if(isLoading) {
      return (
        <div>Loading...</div>
      )
    }
    return(
      <div className="container">
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
          { currentPageArticles.map((article) => {
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

ArticleTable.propTypes = {}

export default ArticleTable