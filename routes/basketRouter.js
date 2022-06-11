const Router = require('express');
const router = new Router();
const BasketController = require('./../controllers/basketController');
const authMiddleware = require('./../middleware/authMiddleware');
const checkDeleteProductFromBasket = require('../middleware/checkDeleteProductFromBasket');

router
    .post('/', authMiddleware, BasketController.addProduct)
    .get('/', authMiddleware, BasketController.getProducts)
    .delete('/:id', authMiddleware, checkDeleteProductFromBasket, BasketController.deleteProduct);

module.exports = router;
