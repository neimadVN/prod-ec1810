var express = require('express');
var router = express.Router();
const baseAuth = require('./base/authentication');
const moment = require('moment');
const UTILS = require('../helpers/UTILS');

/* GET Login page. */
router.get('/', baseAuth.checkUser, function (req, res) {
  console.log(req.user);
  const huyenTinhQuery = new Parse.Query('HuyenTinh');
  huyenTinhQuery.ascending('huyenTinh');
  huyenTinhQuery.find().then((huyenTinh) => {
    console.log(huyenTinh);
    res.render('base/homepage', { title: 'Home', user: req.user ? req.user.toJSON() : null, huyenTinh: huyenTinh });
  });
});

router.get('/danhSachVe', baseAuth.checkUser, function (req, res) {
  const tuyen = {
    huyenTinhDi: req.query.huyenTinhDi,
    huyenTinhDen: req.query.huyenTinhDen,
    thoiGianKhoiHanh: req.query.thoiGianKhoiHanh
  };
  
  var q = new Parse.Query("Tuyen");
  q.include(['idLoTrinh', 'idXe', 'idXe.idLoaiXe', 'idHangXe']);

  let subpointerquery = new Parse.Query("LoTrinh");
  if (tuyen.huyenTinhDi) {
    subpointerquery.equalTo("huyenTinhDi", tuyen.huyenTinhDi);
  }

  if (tuyen.huyenTinhDen) {
    subpointerquery.equalTo("huyenTinhDen", tuyen.huyenTinhDen);
  }
  q.matchesQuery('idLoTrinh', subpointerquery);

  //var d = new Date("November 21, 2018 23:55:00");
  if (tuyen.thoiGianKhoiHanh) {
    var d = new Date(tuyen.thoiGianKhoiHanh);
    var start = new moment(d);
    start.startOf('day');
    q.greaterThanOrEqualTo('thoiGianKhoiHanh', start.toDate());

    var finish = new moment(start);
    finish.add(1, 'day');
    q.lessThan('thoiGianKhoiHanh', finish.toDate());
  }

  let promises = [];
  promises.push(q.find());

  const huyenTinhQuery = new Parse.Query('HuyenTinh');
  promises.push(huyenTinhQuery.find());


  Promise.all(promises).then(function (results) {
    console.log(results);
    let huyenTinh = results[1];
    results = results[0];
    res.render('base/ticketList', { title: 'Home', user: req.user ? req.user.toJSON() : null, results: results, huyenTinh: huyenTinh });
    //res.send(results);
  });
});

router.get('/chiTietVe/:idTuyen', baseAuth.checkUser, async function (req, res) {
  let promises = [];
  const chuyenQuery = new Parse.Query('Tuyen');
  chuyenQuery.equalTo('objectId', req.params.idTuyen);
  chuyenQuery.include(['idLoTrinh', 'idXe', 'idXe.idLoaiXe', 'idHangXe']);
  promises.push(chuyenQuery.first());

  const veQuery = new Parse.Query('Ve');
  veQuery.equalTo('idTuyen', UTILS.createBlankPointerTo('Tuyen', req.params.idTuyen));
  veQuery.equalTo('daDat', false);
  veQuery.ascending('idCho');
  promises.push(veQuery.find());

  Promise.all(promises).then((results) => {
    let chuyen = results[0];
    let ve = /*UTILS.parseObjectArray2JSON(results[1]);*/ results[1];
    let veObject = {};

    ve.forEach((value) => {
      if (!value.get('daDat')) {
        veObject[value.get('idCho')] = String(value.id);
        console.log(value.id);
      }
    });

    res.render('base/ticketDetail', { title: 'Home', user: req.user ? req.user.toJSON() : null, chuyen: chuyen, ve: veObject });
  });
});

/* GET home page. */
router.get('/dashboard', baseAuth.ensureAuthenticated, function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login', function (req, res, next) {
  res.redirect('/auth/login');
});

module.exports = router;
