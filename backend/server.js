const express =  require('express');
const cors = require('cors');
const mongoose = require('mongoose');

//load routes dependencies
const exerciseRouter = require('./routes/exercises')
const userRouter = require('./routes/users')

require('dotenv').config();
 
const app = express();
app.use(express.json())

const uri = process.env.ATLAS_URI
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully ");

})
.catch((e) => console.log(e));

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json())

//Routes
app.use('/exercises', exerciseRouter);
app.use('/users', userRouter);

app.listen(port, () => {
    console.log(`Server is running at port: ${port}`)
}) 