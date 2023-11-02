const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try{
    const tags = await Tag.findAll();
    if(!tags){
      res.status(404).json({message: 'no tags found'})
    }
    res.status(200).json(tags)
  } catch(err) {
    res.status(500).json(err)
  }
});

router.get('/:id', async (req, res) => {
  try{
    const tags = await Tag.findByPk(req.params.id, {
      include: [{model: Product}],
    });
    if(!tags){
      res.status(404).json({message: 'no tags found at this id'});
    }
    res.status(200).json({tags})
  } catch(err){
    res.status(500).json({message: 'server error'})
  }
  // find a single tag by its `id`
  // be sure to include its associated Product data
});

router.post('/', async (req, res) => {
  try{
    const tags = await Tag.create(req.body);
    res.status(200).json(tags);
  } catch(err){
    res.status(500).json(err);
  }
  // create a new tag
});

router.put('/:id', async (req, res) => {
  try{
  const tags = await Tag.update(req.body, {
    where: {
      id: req.params.id
    }
  });
  if(!tags){
    res.status(404).json({message: 'No tags at this id'})
  }
  res.status(200).json(tags);
} catch(err){
  res.status(500).json(err);
}
  // update a tag's name by its `id` value
});

router.delete('/:id', async (req, res) => {
  try{
    const tags = await Tag.findByPk(req.params.id);
    if(!tags){
      res.status(404).json({message: 'no tag at this id'});
    }
    tags.destroy();
    res.status(200).json({message: 'tag deleted!'})
  } catch {
    res.status(500).json({message: 'Server error'})
  }
  // delete on tag by its `id` value
});

module.exports = router;
