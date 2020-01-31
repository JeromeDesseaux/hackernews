import express from 'express';
import { getNewsFeed } from "../controllers/news.controller";
import { register, login } from '../controllers/users.controller';
import auth from "../middlewares/jwt";

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/news/:query', auth,getNewsFeed);
router.post('/users/register', register);
router.post('/users/login', login);

export default router;