var express = require('express');
var router = express.Router();
require('dotenv').config();
const BigQuery = require('@google-cloud/bigquery');

/* GET users listing. */
router.get('/:word(*)', function(req, res, next) {
  queryIndex('comp-445-mapreduce',req.params.word)
  .then((result) => res.send(result))
});

async function queryIndex(projectId,word) {
  // Creates a client
  const bigquery = new BigQuery({
    projectId: projectId,
  });

  let sqlQuery = `SELECT
  KeyWord,
  IndexResult
  FROM \`comp-445-mapreduce.1.1\`
  WHERE KeyWord = ?`;

  let query_params = [word];
  words = word.split(' ', 20)
  if(words.length > 1)
  {
    query_params[0] = words[0]
    words.forEach((search_word, index) => {
      if(index >= 1)
      {
        sqlQuery += " OR KeyWord = ?"
        query_params.push(search_word);
      }
    });
  }

  // Query options list: https://cloud.google.com/bigquery/docs/reference/v2/jobs/query
  const options = {
    query: sqlQuery,
    useLegacySql: false, // Use standard SQL syntax for queries.
    params : query_params
  };

  // Runs the query
  return bigquery
    .query(options)
    .then(results => {
      return results
    })
    .catch(err => {
      console.error('ERROR:', err);
    });
}

module.exports = router;
