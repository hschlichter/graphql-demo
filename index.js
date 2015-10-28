require('babel/register');

import express from 'express';
import schema from './schema';

import graphql from 'graphql';
import bodyParser from 'body-parser';

let app  = express();

// parse POST body as text
app.use(bodyParser.text({ type: 'application/graphql' }));

app.post('/graphql', (req, res) => {
	graphql(schema, req.body)
		.then((result) => {
			res.send(JSON.stringify(result, null, 2));
		});
});

const PORT = 3000;
let server = app.listen(PORT, function () {
	const host = server.address().address;
	const port = server.address().port;

	console.log('GraphQL listening at http://%s:%s', host, port);
});
