const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
const adminRouter = require('./router/admin.router');
const categoryRouter = require('./router/category.router');
const productRouter = require('./router/product.router');
const userRouter = require('./router/user.router');
const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://root:root@cluster0.gffjq.mongodb.net/artificialApp?retryWrites=true&w=majority")
    .then(() => {
        console.log("Database Connection SuccessFully Estabilished");
    })
    .catch(err => {
        console.log(err);
    });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({ secret: "artificial web app" }));
app.use('/admin', adminRouter)
app.use('/category', categoryRouter)
app.use('/product', productRouter);
app.use('/user', userRouter);
app.listen(process.env.PORT || 3000, () => {
    console.log('server is runing');
});