import express from 'express';
import { getNewsFeed } from "../controllers/news.controller";

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/news/:query', getNewsFeed);

export default router;