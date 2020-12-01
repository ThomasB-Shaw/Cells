const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');

//GET ROUTE 
//Gets all data associated with a selected painting based on its id
router.get('/:ID', (req, res) => {
    let paintingID = req.params.ID;
    console.log('paintingID',paintingID)
  const queryText = `SELECT * FROM "painting"
  JOIN "painting_component" ON "painting"."id" = "painting_component"."painting_id"
  JOIN "component" ON "component"."id" = "painting_component"."component_id"
  WHERE "painting"."id" = $1;`;
  pool.query(queryText, [paintingID])
    .then((result) => { res.send(result.rows); })
    .catch((err) => {
      console.log('Error completing SELECT genres query', err);
      res.sendStatus(500);
    });
});

module.exports = router;