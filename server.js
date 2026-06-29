const express = require('express');
const app = express();
const path = require('path');

const {hostRoute} = require('./routes/hostRoute');
const userRoute = require('./routes/userRoute');
const Page404 = require('./routes/404Page');
const rootDir = require('./utils/path');

//Common Commands
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(rootDir, 'public')));
app.set('view engine', 'ejs');



app.use('/routes/',hostRoute);
app.use('/routes/', userRoute);
app.use('/routes/', Page404);

const PORT = 8000;
app.listen(PORT, () => {
    console.log(`Server Running on http://localhost:${PORT}/routes/home`);
})
