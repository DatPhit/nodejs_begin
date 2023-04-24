const path = require('path');
const express = require('express');
const { engine } = require('express-handlebars');
const morgan = require('morgan');
const { log } = require('console');
const app = express();
const port = 3000;

const route = require('./routes');

app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());

// Static file path
app.use(express.static(path.join(__dirname, 'public')));

//HTTP logger
app.use(morgan('dev'));

// Template engine`
app.engine('.hbs', engine({ extname: '.hbs' }));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'resources/views'));

// Route init
route(app);

app.listen(port, () => {
    console.log(`Example app listening on http://localhost:${port}`);
});
