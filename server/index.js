const casual = require('casual');

FOLDER_TYPES = ['COMPLETE', 'INCOMPLETE', 'HIDDEN']

module.exports = () => {
  const data = {
    articles: []
  }

  // create 500 articles
  for (let i = 0; i < 500; i++) {
    data.articles.push({
      id: i,
      title: casual.title,
      description: casual.description,
      folder_type: FOLDER_TYPES[casual.integer(from = 0, to = FOLDER_TYPES.length - 1)]
    });
  }


  return data;
}