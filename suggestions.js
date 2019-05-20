const express = require('express');
// var elastic = require('../elasticsearch');
const fuseWithOperators = require('fuse-operators');
var d3 = require("d3");
var _ = require("lodash");
// import db from '../data/cities_canada-usa.tsv';
tsv = require("node-tsv-json");

var fs = require('fs')


const app = express();

  app.get('/suggestions', (req, res) => {

    // var rawdata = fs.readFileSync('test.json');
    // let student = JSON.parse(rawdata);

    // var response = [];
  
  // var test = req.query.id;
  // const result = fuseWithOperators(test, student);
  // console.log(result)

fs.readFile("data/cities_canada-usa.tsv", "utf8", function(error, data) { 
  var response = [];

  data = d3.tsvParse(data);
  let string = JSON.stringify(data);
  
  response = _.map(data, function(string) {
    sponse = _.pick(string, ['name', 'lat', 'long']);
      return sponse;
  });
  var test = req.query.name;
  response = fuseWithOperators(test, response)
  res.send(response)
  var test = req.query.name;
  // var test1 = req.query.lat;
  // var test2 = req.query.long;
  console.log(test)

  // if(typeof test === 'undefined' && typeof test1 === 'undefined' && typeof test2 === 'undefined'){
  //   res.send()
  // } else {
  //   const name = fuseWithOperators(test, response)

  //   // const lat = fuseWithOperators(test1, name)

  //   // const long = fuseWithOperators(test2, lat)

  //   res.send(name)
  // }
  });

// // });

//   if( typeof req.query == 'undefined' ){
//     response = student;
//   } else {
//    response = student.filter(function(student){
//    if (student.lat === req.query.lat){
//     return student;
//   } else if (student.name === req.query.name){
//     return student;
//   } else if (student.long === req.query.long){
//     return student;
//   }
// });
// }

//   res.send(response);
// });
});



  //   // console.log(test)
  //   console.log(response)

    // res.status(200).json({
    //   student
    //   // name: req.query.q,
    //   // lat: req.query.lat
    // })

    
// fs.readFile("data/cities_canada-usa.tsv", "utf8", function(error, data) { 
//     data = d3.tsv(data).then(function(data)){
      
//     }
//       res.send(JSON.stringify(data));

  

//     // var maxWeight = d3.(data, function(d) { return d[0]; });
//     // res.send(JSON.stringify(maxWeight));
//     // console.log(maxWeight);
//   });
// });

module.exports = app;

// fs.readFile("data/cities_canada-usa.tsv", "utf8", function(error, data) { 
//     data = parse(data);
//     console.log(JSON.stringify(data));
//   });


    
// console.log('About to parse')
//     fs.readFile("data/cities_canada-usa.tsv", "utf8", function(error, data) { 
//     // data = bodyParser(data);
//     res.send(JSON.stringify(data));
//   });
//   console.log('done')


// //Short code
// function matchRuleShort(str, rule) {
//   return new RegExp("^" + rule.split('"').join(".*") + "$").exec(str);
// }

// //Explanation code
// function matchRuleExpl(str, rule) {
//   // "."  => Find a single character, except newline or line terminator
//   // ".*" => Matches any string that contains zero or more characters
//   rule = rule.split('"').join('.*');
//   console.log(rule)
//   // "^"  => Matches any string with the following at the beginning of it
//   // "$"  => Matches any string with that in front at the end of it
//   rule = "^" + rule + "$"

//   //Create a regular expression object for matching string
//   var regex = new RegExp(rule);

//   //Returns true if it finds a match, otherwise it returns false
//   return regex.exec(str);
// }

// //Examples
// console.log(
//     "1. " + matchRuleExpl("bird123", 'bird"') + "\n" +
//     "2. " + matchRuleExpl("123bird", '"bird"') + "\n" +
//     "3. " + matchRuleShort("123bird123", '"bird"') + "\n" 

// );
