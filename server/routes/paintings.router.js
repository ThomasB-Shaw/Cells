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

router.post('/', (req, res) => {
  console.log(req.body);
  // RETURNING "id" will give us back the id of the created painting
  const insertPaintingQuery = `
  INSERT INTO "painting" ("user_id", "title", "description", "image_url", "date", "size_type")
  VALUES ($1, $2, $3, $4, $5, %6)
  RETURNING "id";`

  // FIRST QUERY MAKES Painting
  pool.query(insertPaintingQuery, [req.user.id, req.body.title, req.body.description, req.body.image_url, req.body.date, req.body.size_type ])
  .then(result => {
    console.log('New Painting Id:', result.rows[0].id); //ID IS HERE!
    
    const createdPaintingId = result.rows[0].id

    const insertPaintingComponentQuery = `
      INSERT INTO "painting_component" ("painting_id", "component_id")
      VALUES  ($1, $2);
      `
      // SECOND QUERY MAKES component FOR THAT NEW Painting
      pool.query(insertPaintingComponentQuery, [createdPaintingId, req.body.component.id]).then(result => {
        //Now that both are done, send back success!
        res.sendStatus(201);
      }).catch(err => {
        // catch for second query
        console.log(err);
        res.sendStatus(500)
      })

// Catch for first query
  }).catch(err => {
    console.log(err);
    res.sendStatus(500)
  })
})

module.exports = router;