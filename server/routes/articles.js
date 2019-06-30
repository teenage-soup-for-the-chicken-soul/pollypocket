
const router = require('express').Router()




router.get('/', async (req, res, next) => {
  try{
    res.send()
  }
  catch(err){
    next(err)
  }
})


router.get('/:id', async (req, res, next) => {
  try {

    res.json()
  }
  catch(err){
    next(err)
  }
})


// POST ROUTES || CREATE


router.post('/', async (req, res, next) => {
  try {

    res.status(201).send()
  }
  catch (e) {
    next(e)
  }
})




// PUT ROUTES || UPDATE
router.put('/:id', async (req, res, next) => {
  try {
      res.send()
  }
  catch (err) {
    next(err)
  }
})



// DELETE ROUTES || DESTROY
router.delete('/:id', async (req, res, next) => {
  try {

      res.send({message: 'Deleted successfully'})
  }
  catch (err) {
    next(err)
  }
})


module.exports = router
