# node-url-shortening-service

A URL Shortening service written in NodeJS and Express.

## Live Demo

Shorten a URL - https://shorturlservice.herokuapp.com/shorten?url=http://www.google.com.au <br>
Vist Shortened URL - http://shorturlservice.herokuapp.com/v

## Running Locally

Make sure you have [Node.js](http://nodejs.org/) and the [Heroku Toolbelt](https://toolbelt.heroku.com/) installed.

```sh
$ git clone https://github.com/kieranjones/node-url-shortening-service.git # or clone your own fork
$ cd node-url-shortening-service
$ npm install
$ npm start
```

Your app should now be running on [localhost:5000](http://localhost:5000/).

## Deploying to Heroku

```
$ heroku create
$ git push heroku master
$ heroku open
```

## Setup a Heroku Postrgres Database

- [Provision a database with Heroku Postgres](https://devcenter.heroku.com/articles/getting-started-with-nodejs#provision-a-database)

SQL for Demo Database:

```
CREATE TABLE shorturls (
  id int primary key NOT NULL,
  long_url varchar(255) unique NOT NULL,
  created_date int NOT NULL,
  creator_ip char(15) NOT NULL,
  created_by int NOT NULL,
  referrals int NOT NULL default '0'
);
```

Sample Table Structure

```
 id |          long_url           | created_date  |   creator_ip    | creator_user_id | referrals 
----+-----------------------------+---------------+-----------------+-----------------+-----------
  1 | http://www.kieranjones.com  | 1484139363025 | 222.111.222.111 |               1 |         0
  2 | http://www.google.com       | 1484141076745 | 222.111.222.111 |               1 |         1
  3 | http://www.google.com.au    | 1484552390269 | 222.111.222.111 |               1 |         0
```

## Documentation

For more information about using Node.js on Heroku, see these Dev Center articles:

- [Getting Started with Node.js on Heroku](https://devcenter.heroku.com/articles/getting-started-with-nodejs)
- [Heroku Node.js Support](https://devcenter.heroku.com/articles/nodejs-support)
- [Node.js on Heroku](https://devcenter.heroku.com/categories/nodejs)
- [Best Practices for Node.js Development](https://devcenter.heroku.com/articles/node-best-practices)
- [Using WebSockets on Heroku with Node.js](https://devcenter.heroku.com/articles/node-websockets)

## Thanks
I got inspiration from these other great repo's:
- [PHP URL Shortener](https://github.com/briancray/PHP-URL-Shortener)
- [ShortURL](https://github.com/delight-im/ShortURL)

