const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


router.get('/', (req, res) => {
    let queryText = ` SELECT * FROM "painting";`;
    pool.query(queryText)
      .then((result) => {
          res.send(result.rows);
      }).catch((error) =>{
        console.log(`Error with getPaintings` , error);
        res.sendStatus(500);
      });
  });

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;