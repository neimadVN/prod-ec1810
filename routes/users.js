var express = require('express');
var router = express.Router();
const baseAuth = require('./base/authentication');
const moment = require('moment');
const UTILS = require('../helpers/UTILS');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/updateGuess', baseAuth.ensureAuthenticated, async function(req, res, next) {
  let user = req.user;
  let params = req.body;

  console.log(user);

  if (params.gioiTinh) {
    user.set('gioiTinh', params.gioiTinh);
  }

  if (params.diaChi) {
    user.set('diaChi', params.diaChi);
  }

  if (params.hoTen) {
    user.set('hoTen', params.hoTen);
  }

  return user.save(null, {useMasterKey: true}).then((result) => {
    return res.json(result.toJSON);
  }).catch((err) => {
    return res.json({err});
  });
});

//like tuyen
router.post('/likeTuyen', baseAuth.ensureAuthenticated, async function(req, res, next) {
  console.log(req.user);
  let user = req.user;
  let params = req.body;

  if (params.idTuyen) {
    user.addUnique('loTrinhYeuThich', params.idTuyen);
  }

  return user.save(null, {useMasterKey: true}).then(() => {
    return res.send('ok');
  }).catch((err) => {
    return res.send(err);
  });
});

router.post('/disLikeTuyen', baseAuth.ensureAuthenticated, async function(req, res, next) {
  console.log(req.user);
  let user = req.user;
  let params = req.body;

  if (params.idTuyen) {
    user.remove('loTrinhYeuThich', params.idTuyen);
  }

  return user.save(null, {useMasterKey: true}).then(() => {
    return res.send('ok');
  }).catch((err) => {
    return res.send(err);
  });
});

//tuyen yeu thich

router.get('/tuyenYeuThich', baseAuth.ensureAuthenticated, async function(req, res, next) {
  let list = req.user.get('loTrinhYeuThich') || [];

  const query = new Parse.Query('Tuyen');
  query.containedIn('objectId', list);
  query.include(['idLoTrinh', 'idXe', 'idXe.idLoaiXe', 'idHangXe']);

  let promises = [];
  promises.push(query.find());

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

// booking
router.post('/booking', baseAuth.checkUser, async function(req, res, next) {
  console.log(req.body);
  console.log(req.user);

  const query = new Parse.Query('Ve');
  query.containedIn('objectId', req.body.idVe);
  try {
    let dsVe = await query.find();
    dsVe.forEach((ve) => {
      ve.set('sdtKhach', req.body.sdtKhach);
      ve.set('ghiChu', req.body.ghiChu);
      ve.set('emailKhach', req.body.emailKhach);
      ve.set('hoTenKhach', req.body.hoTenKhach);
      ve.set('daDat', true);
      ve.set('paymentId', req.body.paymentId);
      ve.set('diemDon', req.body.diemDon);
      ve.set('diemTra', req.body.diemTra);
      if (req.user) {
        ve.set('khachHang', UTILS.createBlankPointerTo('User', req.user.id));
      }
    })

    Parse.Object.saveAll(dsVe, {useMasterKey: true}).then((result) => {
      res.send('oke');
    })
  } catch(err) {
    res.status(400).send(err);
  }
});

module.exports = router;
