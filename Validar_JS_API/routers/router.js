const router = require("express").Router();

router.use('/productos', require('./routes/ProductosRoute'));

module.exports = router;