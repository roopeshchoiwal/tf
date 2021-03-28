import express from 'express';
import pug from 'pug';
import validateToken from '../middlewares/validateToken';
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/test', validateToken, function(req, res, next) {
  res.send(req.decodeJWT);
});

// ..stuff below
export default router;
