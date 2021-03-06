const express = require('express');
const { string } = require('prop-types');
const pool = require('../modules/pool');
const router = express.Router();

// Gets 9 random paintings for the DB from all users
router.get('/', (req, res) => {
    let queryText = ` SELECT * FROM "painting" ORDER BY RANDOM() LIMIT 9; `;
    pool.query(queryText)
      .then((result) => {
          res.send(result.rows);
      }).catch((error) =>{
        console.log(`Error with getPaintings` , error);
        res.sendStatus(500);
      });
  });

// Deletes painting based on id passed from paintingSaga
router.delete('/:id', (req, res) => {
  console.log('req.body params', req.params.id);
  let id = req.params.id;
  const queryText = `DELETE FROM "painting" WHERE "painting"."id" = $1;`;
  pool.query(queryText, [id]).then((result) => {
    res.sendStatus(200);
  }).catch((error) => {
    console.log('ERROR in DELETE route', error);
    res.sendStatus(500);
  });
});

// Updated route located in edit page, updates all fields withing the base painting table
router.put('/:id', (req, res) => {
  console.log('req.body params', req.params.id);
  console.log('REQ.BODY', req.body)
  let id = req.params.id;
  const queryText = ` UPDATE "painting"
  SET "title" = $2, "description" = $3, "image_url" = $4, "date" = $5, "size_type" = $6
  WHERE "id" = $1;`;
  pool.query(queryText, [id, req.body.title, req.body.description, req.body.img_url, req.body.date, req.body.size_type]).then((result) => {
    res.sendStatus(200);
  }).catch((error) => {
    console.log('ERROR in DELETE route', error);
    res.sendStatus(500);
  });
});

// Post Route, first adds painting to painting DB, 
// then fires of a post for each component in its respected list
// makes a many to many relation based on newly created painting id and newly created component id
// Repeats this for all components | Methods | Colors | Tools, until respected lists are looped through
router.post('/', (req, res) => {
  let userID = req.user.id;
  const queryText = `INSERT INTO "painting" ("user_id", "title", "description", "image_url", "date", "size_type")
  VALUES ($1, $2, $3, $4, $5, $6)
  RETURNING "id";`
  pool.query(queryText, [userID, req.body.title, req.body.description, req.body.img_url, req.body.date, req.body.size_type ])
    .then((result) => {
    const methodList = req.body.methodList
    console.log('In Post', methodList);
    for(let method of methodList) {
      console.log(method);
      const insertMethodQuery = `
      INSERT INTO "component" ("name", "type")
      VALUES ($1, 'method')
      RETURNING "id";`
      pool.query(insertMethodQuery, [method])
      .then(componentResult => {
        console.log('Results.rows deal', componentResult.rows[0].id, 'PaintingID', result.rows[0].id)
        let createdPaintingId = result.rows[0].id
        let createdComponentId = componentResult.rows[0].id
        console.log('IDs' ,createdComponentId, createdPaintingId);
        const insertManyPainting = `
        INSERT INTO "painting_component" ("painting_id", "component_id")
        VALUES  ($1, $2);`
        pool.query(insertManyPainting, [createdPaintingId, createdComponentId]).then(resultMany => {
        //Now that both are done, send back success!
        console.log(resultMany)
        res.sendStatus(201);
        })
      })
      }
      const toolList = req.body.toolList
      console.log('In Post', toolList);
      for(let tool of toolList) {
        console.log(tool);
        const insertToolQuery = `
        INSERT INTO "component" ("name", "type")
        VALUES ($1, 'tool')
        RETURNING "id";`
        pool.query(insertToolQuery, [tool])
        .then(toolResult => {
            console.log('Results.rows deal', toolResult.rows[0].id)
            let createdPaintingId = result.rows[0].id
            let createdToolId = toolResult.rows[0].id
            console.log('IDs' ,createdToolId, createdPaintingId);
            const insertManyPainting = `
          INSERT INTO "painting_component" ("painting_id", "component_id")
          VALUES  ($1, $2);`
          pool.query(insertManyPainting, [createdPaintingId, createdToolId]).then(resultMany => {
            //Now that both are done, send back success!
            console.log(resultMany)
            res.sendStatus(201);
          }).catch(err => {
            // catch for second query
            console.log(err);
            res.sendStatus(500)
          })
        }).catch((error) =>{
          console.log(`Error with POST` , error);
          res.sendStatus(500);
        });
      }
      const colorList = req.body.colorList
      console.log('In Post', colorList);
      for(let color of colorList) {
        console.log(color);
        const insertColorQuery = `
        INSERT INTO "component" ("name", "brand" , "type")
        VALUES ($1, $2, 'color')
        RETURNING "id";`
        pool.query(insertColorQuery, [color[1], color[0]])
        .then(colorResult => {
            console.log('Results.rows deal', colorResult.rows[0].id)
            let createdPaintingId = result.rows[0].id
            let createdColorId = colorResult.rows[0].id
            console.log('IDs' ,createdColorId, createdPaintingId);
            const insertManyPainting = `
            INSERT INTO "painting_component" ("painting_id", "component_id")
            VALUES  ($1, $2);`
            pool.query(insertManyPainting, [createdPaintingId, createdColorId]).then(resultMany => {
              //Now that both are done, send back success!
              console.log(resultMany)
              res.sendStatus(201);
            }).catch(err => {
              // catch for second query
              console.log('ERROR IN COLOR POST CHECK IT OUT!', err);
              res.sendStatus(500)
            })
        })
      }}).catch(err => {
    console.log('End Game ERROR',err);
    res.sendStatus(500)
    }  
    )
  });

module.exports = router;