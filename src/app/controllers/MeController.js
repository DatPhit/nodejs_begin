const Course = require('../models/Courses');
const { multipleMongooseToObject } = require('../../util/monggoose');
class MeController {
    // [GET] /me/stored/courses
    async storedCourses(req, res, next) {
        try {
            const courses = await Course.find({});
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
