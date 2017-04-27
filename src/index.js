import express from 'express';
import pg from 'pg';
import get from 'lodash/object/get';
const app = express();

app.set('port', (process.env.PORT || 5000));

pg.defaults.ssl = true;

const shortURL = new function() {

	const _alphabet = '23456789bcdfghjkmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ-_',
		_base = _alphabet.length;

	this.encode = function(num) {
		let str = '';
		while (num > 0) {
			str = _alphabet.charAt(num % _base) + str;
			num = Math.floor(num / _base);
		}
		return str;
	};

	this.decode = function(str) {
		let num = 0;
		for (let i = 0; i < str.length; i++) {
			num = num * _base + _alphabet.indexOf(str.charAt(i));
		}
		return num;
	};
};

app.get('/shorten', (req, res, next) => {
	const urlParam = req.query.url;
	const ip = req.connection.remoteAddress;
	const shortUrl = '';
	let dateCreated = new Date().getTime();

	pg.defaults.ssl = true;
	pg.connect(process.env.DATABASE_URL, (err, client, done) => {
	  if (err) throw err;

	  const query = client.query(
	  	'INSERT INTO shorturls (long_url, created_date, creator_ip, creator_user_id, referrals) values ($1, $2, $3, $4, $5) RETURNING id', 
	  	[urlParam, dateCreated, '202.023.222.143', 1, 0],
	  	(err, result) => {
		  if(err) throw err;
		  else {
	   		const newlyInsertedRowId = result.rows[0].id;
	   		shortUrl = shortURL.encode(newlyInsertedRowId);
		    done();
		    return res.json({ shortURL: req.protocol + '://' + req.get('host') + '/' + shortUrl });
		  }
		});
    });
});

app.get('/:shortId', (req, res, next) => {
	const shortId = req.params.shortId;
	if (shortId.length > 4){
 		return res.status(404).send('URL too long');
	}
	const rowId = shortURL.decode(shortId);

	pg.connect(process.env.DATABASE_URL, (err, client, done) => {
	  if (err) throw err;

	  	const sql = 'SELECT * FROM shorturls WHERE id=$1';
		const params = [rowId];

		const query = client.query(sql, params, (err, result) => {
			if(err) throw err;
			else {
				// Increment referral count
				const query = client.query({
				    text: 'UPDATE shorturls SET referrals=referrals+1 WHERE id = $1',
				    values: [rowId]
				  }, function(err, result) {
				    if(err) throw err;
				  });

				if (result.rows.length >= 1){
					done();
					return res.redirect(301, result.rows[0].long_url);
				} else {
					done();
		   			return res.status(404).send('URL Not Found');
				}
			}
		});
    });
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

