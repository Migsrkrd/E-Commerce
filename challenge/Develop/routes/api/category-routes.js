const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try{
    const categories = await Category.findAll({
      include: [{
        model: Product}]
    });
    res.json(categories);
  } catch (err) {
    res.status(500).json({err: 'Internal Server Error'})
    console.error(err);
  }
  // find all categories
  // be sure to include its associated Products
});

router.get('/:id', async (req, res) => {
  try{
    const categories = await Category.findByPk(req.params.id, {
      include: [{model: Product}],
    });
    if(!categories) {
      res.status(404).json({message: 'No Categories under that id'});
      return;
    }
    res.status(200).json(categories);
  } catch(err) {
    res.status(500).json({message: "Server error"})
  }
  // find one category by its `id` value
  // be sure to include its associated Products
});

router.post('/', async (req, res) => {
  try{
    const categories = await Category.create(req.body);
    res.status(200).json(categories);
  } catch(err) {
    res.status(400).json(err)
  }
  // create a new category
});

router.put('/:id', async (req, res) => {
  try{
    const categories = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if(!categories[0]){
      res.status(400).json({message: 'No category with that id'})
    }
    res.status(200).json({message: "Value successfully changed!"});
  } catch (err) {
    res.status(500).json(err);
  }
  // update a category by its `id` value
});

router.delete('/:id', async (req, res) => {
  try{
    const categories = await Category.findByPk(req.params.id);
    if(!categories){
      res.status(400).json({message: 'No category with that id'});
      return
    }
    await categories.destroy();
    res.status(200).json({message: "Value successfully deleted!"});
  } catch (err) {
    res.status(500).json(err);
  }
  // delete a category by its `id` value
});

module.exports = router;
