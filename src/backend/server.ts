import { join } from 'path';
import Express = require('express');
import mongoose = require('mongoose');
import bodyParser = require('body-parser');
import graphQlMiddelware = require('express-graphql');

import router from './router';
import schema from './graphql';
import testSite from './testSite';

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://127.0.0.1/google4aday', { useMongoClient: true }).then(() => {
	console.log('Connected to `google4aday` database successfully');
}, err => console.log(err));

const app = Express();
app.use(Express.static(join(__dirname, '../dist/')));
app.use(bodyParser.json());
app.use('/api', router);
app.use('/gql', graphQlMiddelware(req => ({ schema, graphiql: true })));

app.use('/test', testSite);

app.use('/*', (req, res) => {
	res.sendFile('index.html', { root: join(__dirname, '../dist') });
});

app.listen(3000, () => {
	console.log('Server listening on http://127.0.0.1:3000');
});
