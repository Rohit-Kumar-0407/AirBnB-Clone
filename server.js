//Core Modules
const express = require('express');
const app = express();
const path = require('path');

//Local Modules
const {hostRoute} = require('./routes/hostRoute');
const userRoute = require('./routes/userRoute');
const Page404 = require('./routes/404Page');
const rootDir = require('./utils/path');
const db = require('./utils/database');

//Common Commands
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(rootDir, 'public')));
app.set('view engine', 'ejs');

//Routes
app.use('/host',hostRoute);
app.use('/', userRoute);
app.use('/', Page404);

//SQL Database Import
// db.execute('SELECT * FROM AirBnB-Clone;').then((rows, fields) => {
//     console.log(rows);  //Contains Actual Data
//     console.log(fields); //Contains Table Structure
// }).catch((err) => {
//     console.log(err);
// });

//Server
const PORT = 8000;
app.listen(PORT, () => {
    console.log(`Server Running on http://localhost:${PORT}/home`);
})
