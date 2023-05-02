const path = require('path');
const express = require('express');
const { engine } = require('express-handlebars');
const morgan = require('morgan');
const { log } = require('console');

const methodOverride = require('method-override');
const sortMiddleware = require('./app/middlewares/sortMiddleware');

const app = express();
const port = 3001;

app.use(methodOverride('_method'));

const route = require('./routes');
const db = require('./config/db');

// Connnect to database
db.connect();

app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());

// Middleware
app.use(sortMiddleware);

// Static file path
app.use(express.static(path.join(__dirname, 'public')));

//HTTP logger
app.use(morgan('dev'));

// Template engine`
app.engine(
    '.hbs',
    engine({
        extname: '.hbs',
        helpers: {
            sum: (a, b) => a + b,
            sortable: (field, sort) => {
                const sortType = field === sort.column ? sort.type : 'default';
                const icons = {
                    default: 'fa-solid fa-sort',
                    desc: 'fa-solid fa-arrow-down-wide-short',
                    asc: 'fa-solid fa-arrow-down-short-wide',
                };

                const types = {
                    default: 'desc',
                    desc: 'asc',
                    asc: 'desc',
                };

                const icon = icons[sortType];
                const type = types[sortType];

                return ` <a href='?_sort&column=${field}&type=${type}'>
                <i class='${icon} ms-1'></i>
            </a>`;
            },
        },
    }),
);
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

// Route init
route(app);

app.listen(port, () => {
    console.log(`App listening on http://localhost:${port}`);
});
