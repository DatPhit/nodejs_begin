class NewsController {
    // [GET] /news
    index(req, res) {
        res.render('news');
    }

    // [GET] /news/:slugs
    show(req, res) {
        res.send('hello');
    }
}

module.exports = new NewsController();
