const Course = require('../models/Courses');
const { multipleMongooseToObject } = require('../../util/monggoose');
class MeController {
    // [GET] /me/stored/courses
    async storedCourses(req, res, next) {
        let courseQuery = Course.find({});

        if (req.query.hasOwnProperty('_sort')) {
            courseQuery = courseQuery.sort({
                [req.query.column]: req.query.type,
            });
        }

        try {
            const courses = await courseQuery;
            const countDeleted = await Course.countDocumentsDeleted();

            res.render('me/stored-courses', {
                courses: multipleMongooseToObject(courses),
                countDeleted,
            });
        } catch (err) {
            next(err);
        }
    }

    // [GET] /me/trash/courses
    trashCourses(req, res, next) {
        Course.findDeleted({})
            .then(courses =>
                res.render('me/trash-courses', { courses: multipleMongooseToObject(courses) }),
            )
            .catch(next);
    }
}

module.exports = new MeController();
