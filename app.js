//======= loading and executing modules ========
const express = require('express');
const app = express();
const request = require('request');

app.set('view engine', 'ejs');

//===== routes ======
//request for root page
app.get('/', (req, res) => {
  res.render('searchPage');
});

//request for results page
app.get('/results', (req, res) => {
  //grab user's input from form's input
  let searchTerm = req.query.search;
  //concatenate search Term with api url
  let url = 'http://www.omdbapi.com/?apikey=thewdb&s=' + searchTerm;
  //sending request to particular url
  request(url, (error, response, body) => {
    //if there is no error and we received our response properly
    if (!error && response.statusCode === 200) {
      //parse response's body from string(JSON) to JS object
      let data = JSON.parse(body);
      if (!data.Error) {
          res.render('resultsPage', {data: data});
      } else {
        res.send('Sorry, we cannot find this movie.')
      }
    }
  });
});

//setting up the server
app.listen(3000, () => console.log('Server is running on port 3000..'));
