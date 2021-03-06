const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController');



router.get(['/home', '/', ''], mainController.index);
router.get(['/about', '/sobre'], mainController.about);
router.get(['/contact', '/contacto'], mainController.contact);
router.get(['/search', '/busqueda'], mainController.search);
router.post(['/contact', '/contacto'], mainController.sendContact);
// router.get(('*'), mainController.notfound);
module.exports = router;
