const Course = require('../models/Courses');
const { monggoseToObject } = require('../../util/monggoose');
class CourseController {
    // [GET] /courses/:slug
    show(req, res, next) {
        Course.findOne({ slug: req.params.slug })
            .then((course) => res.render('courses/show', { course: monggoseToObject(course) }))
            .catch(next);
        // res.render('courses/show');
    }
}

module.exports = new CourseController();
