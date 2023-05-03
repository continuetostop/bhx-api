const Express = require('express');
const BodyParser = require('body-parser');
const MethodOverride = require('method-override');
const db = require('./app/models/index');

const MySequelize = require('./app/utils/Sequelize');

const port = process.env.PORT || 8080;

let app = Express();

app.use(
  BodyParser.json({
    limit: '5mb',
  })
);

app.use(
  BodyParser.json({
    type: 'application/vnd.api+json',
  })
);

app.use(
  BodyParser.urlencoded({
    limit: '5mb',
    extended: true,
  })
);

app.use(MethodOverride('X-HTTP-Method-Override'));

app.all('/*', [require('./app/middlewares/AllowCossDomain')]);

app.use(Express.static(__dirname + '/public'));
// try {
//   MySequelize.sync({ force: true }).then(() =>
//     console.log('Users data have been saved')
//   );
// } catch (err) {
//   console.log(err);
// }

try {
  MySequelize.sync({ force: false }).then(() =>
    console.log('Users data have been saved')
  );
} catch (err) {
  console.log(err);
}

app.get('/', function (req, res) {
  // console.log('debug');
  res.send('Hello World');
});
require('./app/routes')(app);

app.listen(port, () => {
  console.log(`Server app running on port ${port}!`);
});
