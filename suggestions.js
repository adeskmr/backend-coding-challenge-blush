const express = require('express');
const fuseWithOperators = require('fuse-operators');
var d3 = require("d3");
var _ = require("lodash");
tsv = require("node-tsv-json");
var fs = require('fs')

const app = express();

  app.get('/suggestions', (req, res) => {
  fs.readFile("data/cities_canada-usa.tsv", "utf8", function(error, data) { 
  var response = [];
    
  data = d3.tsvParse(data); //parsing the TSV file 
  let string = JSON.stringify(data); // creating a JSON file
  req.query.name = req.query.q; // getting that query value for name
  req.query.lat = req.query.latitude; // getting that query value for latitude
  req.query.long = req.query.longitude; // getting that query value for longitude
  var name_q = req.query.q; 
  var lat_q = req.query.latitude;
  var long_q = req.query.longitude;

  // checks for every search and that no one search will be without a response.
  //however, these responses rely on fuzeWithOperators a libary using RegEx
  // will check when a query index is missing and find a response
    if(typeof name_q === 'undefined' && typeof lat_q === 'undefined' && typeof long_q === 'undefined'){
    search_result = 0;
  } 
  else if (typeof lat_q !== 'undefined' && typeof name_q !== 'undefined') {
    lat = fuseWithOperators(name_q, data)
    
    search_result = fuseWithOperators(lat_q, lat)
  } 
  else if (typeof long_q !== 'undefined' && typeof name_q !== 'undefined') {
    long = fuseWithOperators(name_q, data)
    
    search_result = fuseWithOperators(long_q, long)
  } 
  else if (typeof long_q !== 'undefined' && typeof lat_q !== 'undefined'){
    long = fuseWithOperators(long_q, data)
    
    search_result = fuseWithOperators(lat_q, long)
  } 
  else if (typeof long_q !== 'undefined'){
    search_result = fuseWithOperators(long_q, data)
  } 
  else if (typeof lat_q !== 'undefined'){
    search_result = fuseWithOperators(lat_q, data)
  } 
  else if (typeof name_q !== 'undefined'){
    search_result = fuseWithOperators(name_q, data)
  } 
  else {
    long = fuseWithOperators(long_q, data)

    lat = fuseWithOperators(lat_q, long)
    
    search_result = fuseWithOperators(name_q, lat)
  }

  // sorts in order by name, lat, long. In order
  sort = _.sortBy(search_result, ['name', 'lat', 'long'])

  // a scoring system in descending order.
  // after comparing will decrease the scoring as the search gets less important
  var index = 1, prevValue = 0;
  _(_.sortBy(sort, "name")).forEach(function (search_result, i) {
    if(name_q != search_result.name) {
      if (index <= 0){
        index = 0;
      }else {
        index-=.1
      }};
    prevValue = search_result.name;
    // console.log(name)
    sort[i].score = index;
})

  //returns only the name, lat, long, and score 
  response = _.map(sort, function(sort) {
    sponse = _.pick(sort, ['name', 'lat', 'long', 'score']);
      return sponse;
  });
  //sends the response
  res.send(response)


  });

});

module.exports = app;
