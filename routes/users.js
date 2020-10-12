var express = require('express');
var router = express.Router();
const sequelize = require('./../database/db');
const User = require('./../models/User');
const Conference = require('./../models/Conference');
const { DataTypes } = require('sequelize');
const User_Conference = require('../models/User_Conference')
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/1',async function(req, res, next) {
  
  const User1 = await User.create({ firstName: "User1" , "lastName": "lastUSer1", "password":"12345" });
  const Conference1 = await Conference.create({"date": new Date(), "topic":"testtopic"});
  
  res.render('user1', {User1});
});

router.post('/addTranscript', async function (req, res, next) {
    await User_Conference.update(
      {transcript: req.body.transcript},
      {where: {UserId: 1, ConferenceId: 1} }
    );
    res.send('Malena de mierda!!');
});

router.get('/2', function(req, res, next) {
  res.render('user2', {});
});

module.exports = router;
