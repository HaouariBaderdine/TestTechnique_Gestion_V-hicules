import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import config from './config';
import modeleRoute from './routes/modeleRoute';
import vehiculeRoute from './routes/vehiculeRoute';
import marqueRoute from './routes/marqueRoute';

const mongodbUrl = config.MONGODB_URL;
mongoose
  .connect(mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .catch((error) => console.log(error.reason));

const app = express();
// Add headers
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});
app.use(bodyParser.json());
app.use('/api/vehicules', vehiculeRoute);
app.use('/api/modeles', modeleRoute);
app.use('/api/marques', marqueRoute);

app.listen(config.PORT, () => {
  console.log('Server started at http://localhost:5000');
});
