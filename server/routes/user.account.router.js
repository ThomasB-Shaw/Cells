const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();



router.get('/', (req, res) => {
  console.log(req.user.id);
    let queryText = ` SELECT * FROM "painting" WHERE "user_id" = ${req.user.id};`;
    pool.query(queryText)
      .then((result) => {
          res.send(result.rows);
      }).catch((error) =>{
        console.log(`Error with getPaintings` , error);
        res.sendStatus(500);
      });
  });

  module.exports = router;