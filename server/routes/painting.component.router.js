const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// GET ROUTES
router.get('/', (req, res) => {
  let queryText = ` SELECT * FROM "component"; `;
  pool.query(queryText)
    .then((result) => {
        res.send(result.rows);
    }).catch((error) =>{
      console.log(`Error with getPaintingComponent` , error);
      res.sendStatus(500);
    });
});

router.get('/methods/:id', (req, res) => {
  const id = req.params.id
  let queryText = ` 
  SELECT * FROM "painting_component"
  JOIN "component" ON "component"."id" = "painting_component"."component_id"
  WHERE "component"."type" = 'method' AND "painting_id" = $1; `;
  pool.query(queryText, [id])
    .then((result) => {
        res.send(result.rows);
    }).catch((error) =>{
      console.log(`Error with getPaintingComponent` , error);
      res.sendStatus(500);
    });
});

router.get('/colors/:id', (req, res) => {
  const id = req.params.id
  let queryText = ` 
  SELECT * FROM "painting_component"
  JOIN "component" ON "component"."id" = "painting_component"."component_id"
  WHERE "component"."type" = 'color' AND "painting_id" = $1; `;
  pool.query(queryText, [id])
    .then((result) => {
      res.send(result.rows);
    }).catch((error) =>{
      console.log(`Error with getPaintingComponent` , error);
      res.sendStatus(500);
    });
});

router.get('/tools/:id', (req, res) => {
  const id = req.params.id
  let queryText = ` 
  SELECT * FROM "painting_component"
  JOIN "component" ON "component"."id" = "painting_component"."component_id"
  WHERE "component"."type" = 'tool' AND "painting_id" = $1; `;
  pool.query(queryText, [id])
    .then((result) => {
        res.send(result.rows);
    }).catch((error) =>{
      console.log(`Error with getPaintingComponent` , error);
      res.sendStatus(500);
    });
});

// POST ROUTES
// Post Adds Component from edit page based on componentType
router.post('/', (req, res) => {
  console.log(req.body);
  // Sets painting ID which is passed to router via payload
  const paintingID = req.body[0];
  console.log('Painting ID', paintingID);
  let insertComponentQuery = '';
  let componentValues = [];
  // Sets SQL Query and the values passing into the Query
  if (req.body[1] === 'color') {
   insertComponentQuery = `
    INSERT INTO "component" ("name", "brand", "type")
    VALUES ($1, $3, $2)
    RETURNING "id";`
    componentValues = [req.body[3], req.body[1], req.body[2]]
  } else {
   insertComponentQuery = `
    INSERT INTO "component" ("name", "type")
    VALUES ($1, $2)
    RETURNING "id";`
    componentValues = [req.body[2], req.body[1]]
  }
  console.log('QUERYTEST',insertComponentQuery);
    pool.query(insertComponentQuery, componentValues)
    // Creates Many to Many relation in painting_components bring in paintingID and newly created component ID
    .then(componentResult => {
      console.log('Results.rows deal', componentResult.rows[0].id, 'PaintingID', paintingID)
      let createdComponentId = componentResult.rows[0].id
      console.log('IDs' ,createdComponentId, paintingID);
      const insertManyPainting = `
      INSERT INTO "painting_component" ("painting_id", "component_id")
      VALUES  ($1, $2);`
      pool.query(insertManyPainting, [paintingID, createdComponentId]).then(resultMany => {
      //Now that both are done, send back success!
      console.log(resultMany);
      res.sendStatus(201);
      })
    })
  }
);

// DELETE ROUTES
router.delete('/:id', (req, res) => {
  // DELETE route code here
  console.log('req.body params', req.params.id);
  let id = req.params.id;
  const deleteRelationQuery = `DELETE FROM "painting_component" WHERE "component_id" =$1;`;
  const deleteComponentQuery = `DELETE FROM "component" WHERE "component"."id" = $1;`;
  pool.query(deleteRelationQuery, [id])
  pool.query(deleteComponentQuery, [id]).then((result) => {
    console.log('deleted', id)
    res.sendStatus(200);
  }).catch((error) => {
    console.log('ERROR in DELETE route', error);
    res.sendStatus(500);
  });
});

module.exports = router;