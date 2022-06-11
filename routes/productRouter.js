const Router = require('express');
const router = new Router();
const productController = require('../controllers/productController');
const checkRole = require('../middleware/checkRoleMiddleware');

router
    .post('/', productController.create)
    .get('/', productController.getAll)
    .get('/search', productController.getSearchAllProductByName)
    .get('/:id', productController.getOne)
    .delete('/:id', checkRole("ADMIN"), productController.delete)
    .put('/:id', checkRole("ADMIN"), productController.update)

module.exports = router;
