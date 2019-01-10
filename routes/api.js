var express = require('express');
var router = express.Router();
const baseAuth = require('./base/authentication');
var moment = require('moment');


// 1512104
// <code>
// ------


// 1512168
router.post('/getNhanXet', function (req, res, next) {
    let query = new Parse.Query('NhanXet');
    
    query.find({useMasterKey: true}).then((result) => {
        res.send(result);
    });
});

router.post('/postNhanXetNhaXe', function(req, res, next) {
    var NhanXet = Parse.Object.extend("NhanXet");
    var hangXePointer = {
        __type: 'Pointer',
        className: '_User',
        objectId: req.body.idHangXe
    };

    var q = new Parse.Query("NhanXet");
    q.equalTo('idHangXe', hangXePointer);

    q.find().then(function(result) {
        console.log('### THÔNG TIN NHẬN XÉT TRUY XUẤT ###');
        console.log(result);
        console.log('Số nhận xét trả về:', result.length)
        res.status(200).send(result);
    }), (err) => {
        console.log('### ERROR: LÚC QUERY THÔNG TIN NHẬN XÉT NHÀ XE');
        console.log(err);
        res.status(404).send(err);
    };
});

// 1512273
router.post('/getLoTrinh', function (req, res, next) {
    let query = new Parse.Query('LoTrinh');
    
    query.find({useMasterKey: true}).then((result) => {
        res.send(result);
    });
});

router.post('/getXe', function (req, res, next) {
    let query = new Parse.Query('Xe');
    
    query.find({useMasterKey: true}).then((result) => {
        res.send(result);
    });
});


// 1512276
router.post('/getUser', function (req, res, next) {
    let query = new Parse.Query('User');
    
    query.find({useMasterKey: true}).then((result) => {
        res.send(result);
    });
});

router.post('/getDiemDi', function (req, res, next) {
    let query = new Parse.Query('DiemDi');
    
    query.find({useMasterKey: true}).then((result) => {
        res.send(result);
    });
});

router.post('/getDiemDen', function (req, res, next) {
    let query = new Parse.Query('DiemDen');
    
    query.find({useMasterKey: true}).then((result) => {
        res.send(result);
    });
});
// -------


// 1512454
// <code>
// -------
router.post('/getTuyen', function (req, res, next) {
    let query = new Parse.Query('Tuyen');
    
    query.find({useMasterKey: true}).then((result) => {
        res.send(result);
    });
});

router.post('/getCodeGiamGia', function (req, res, next) {
    let query = new Parse.Query('CodeGiamGia');
    
    query.find({useMasterKey: true}).then((result) => {
        res.send(result);
    });
});

router.post('/getHuyenTinh', function (req, res, next) {
    let query = new Parse.Query('HuyenTinh');
    
    query.find({useMasterKey: true}).then((result) => {
        res.send(result);
    });
});

router.post('/getKhachHang', function (req, res, next) {
    let query = new Parse.Query('KhachHang');
    
    query.find({useMasterKey: true}).then((result) => {
        res.send(result);
    });
});

router.post('/getLoaiXe', function (req, res, next) {
    let query = new Parse.Query('LoaiXe');
    
    query.find({useMasterKey: true}).then((result) => {
        res.send(result);
    });
});

router.post('/getTaiKhoan', function (req, res, next) {
    let query = new Parse.Query('TaiKhoan');
    
    query.find({useMasterKey: true}).then((result) => {
        res.send(result);
    });
});

router.post('/getVe', function (req, res, next) {
    let query = new Parse.Query('Ve');
    
    query.find({useMasterKey: true}).then((result) => {
        res.send(result);
    });
});

// 1512454: Query Tuyến bằng huyenTinhDi, huyenTinhDen, thoiGianKhoiHanh
router.post('/postTuyenQuery', function (req, res, next) {
    const tuyen = {
        huyenTinhDi: req.body.huyenTinhDi,
        huyenTinhDen: req.body.huyenTinhDen,
        thoiGianKhoiHanh: req.body.thoiGianKhoiHanh
    };
    var Tuyen = Parse.Object.extend("Tuyen");
    var q = new Parse.Query("Tuyen");

    if (tuyen.huyenTinhDi) {
        q.equalTo("huyenTinhDi", tuyen.huyenTinhDi);
    }

    if (tuyen.huyenTinhDen) {
        q.equalTo("huyenTinhDen", tuyen.huyenTinhDen);
    }
    
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

    q.find().then(function(results) {
        console.log('### QUERY TUYEN ###');
        console.log('Đi từ: ' + tuyen.huyenTinhDi + '. Tới: ' + tuyen.huyenTinhDen + '. Vào ngày: ' + tuyen.thoiGianKhoiHanh);
        console.log(results);
        res.send(results);
    });
});

router.post('/getVeCuaTuyen/:idtuyen', function(req, res, next) {
    var Ve = Parse.Object.extend("Ve");
    var tuyenPointer = {
        __type: 'Pointer',
        className: 'Tuyen',
        objectId: req.params.idTuyen
    }
    var q = new Parse.Query("Ve");
    q.select('idCho', 'daDat');
    q.equalTo('idTuyen', tuyenPointer);
    q.find().then(function(results) {
        console.log('### QUERY VE ###');
        console.log('Số lượng vé trả về: ' + results.length);
        res.send(results);
    });
});

router.post('/postCodeGiamGia', function(req, res, next){
    var CodeGiamGia = Parse.Object.extend("CodeGiamGia");
    var q = new Parse.Query("CodeGiamGia");
    var code = req.body.code;
    var phanTramGiam = 0;
    var tienGiam = 0;
    var soCodeDaNhap = 0;
    var soCodeToiDaNhap = 0;
    var ngayBatDau;
    var ngayKetThuc;
    q.equalTo('code', code);
    try {
        q.find().then(function(results) {
            if (results.length != 1) {
                res.status(404).send({
                    "Status": "Méo có code nha."
                })
            } else {
                phanTramGiam = results[0].post('phanTramGiam');
                tienGiam = results[0].post('tienGiam');
                soCodeDaNhap = results[0].post('soCodeDaNhap');
                soCodeToiDaNhap = results[0].post('soCodeToiDaNhap');
                ngayBatDau = results[0].post('ngayBatDau');
                ngayKetThuc = results[0].post('ngayKetThuc');
    
                console.log("### QUERY CODE GIẢM GIÁ ###");
                console.log("Phần trăm giảm: " + phanTramGiam + ". Tiền giảm: " + tienGiam);
                console.log(results);
                res.status(200).send({
                    "phanTramGiam": phanTramGiam,
                    "tienGiam": tienGiam,
                    "soCodeDaNhap": soCodeDaNhap,
                    "soCodeToiDaNhap": soCodeToiDaNhap,
                    "ngayBatDau": ngayBatDau,
                    "ngayKetThuc": ngayKetThuc
                });
            }
        });
    } catch (error) {
        res.status(404).send({'Status': 'LỖI XẢY RA KHI ĐỌC DỮ LIỆU CODE GIẢM GIÁ'});
    }
    
});

////
router.post('/postTinhTienVe', function(req, res, next) {
    var Ve = Parse.Object.extend("Ve");
    var tuyenPointer = {
        __type: 'Pointer',
        className: 'Tuyen',
        objectId: req.body.idtuyen
    };

    var idCho01 = req.body.idCho01;
    var idCho02 = req.body.idCho02;
    var idCho03 = req.body.idCho03;
    var idCho04 = req.body.idCho04;
    var idCho05 = req.body.idCho05;
    var idCho06 = req.body.idCho06;
    var q = new Parse.Query("Ve");

    q.equalTo('idTuyen', tuyenPointer);
    q.containedIn('idCho', [idCho01, idCho02, idCho03, idCho04, idCho05, idCho06]);
    try {
        q.find().then(function(results) {
            console.log('### QUERY VE ###');
            var sum = 0;
            for (var i = 0; i < results.length; ++i) {
                sum += results[i].post("giaVe");
            }
            console.log('Số lượng vé trả về: ' + results.length);
            console.log('Giá vé tổng: ' + sum);
    
            res.send({
                'tongSoTien': sum
            });
        });
    }
    catch (error){
        console.error(error);
        res.status('404').send('HÀM TÍNH TIỀN VÉ SAI');
    }
});

router.post('/postXemve', function(req, res, next) {
    var Ve = Parse.Object.extend("Ve");
    var tuyenPointer = {
        __type: 'Pointer',
        className: 'Tuyen',
        objectId: req.body.idTuyen
    };
    var idCho = req.body.idCho;

    var q = new Parse.Query("Ve");
    q.equalTo('idTuyen', tuyenPointer);
    q.equalTo('idCho', idCho);
    q.first().then(function(result) {
        console.log('### THÔNG TIN VÉ TRUY XUẤT ###');
        console.log(result);
        
        res.status(200).send(result);
    }), (err) => {
        console.log('### ERROR: LÚC QUERY THÔNG TIN VÉ');
        console.log(err);
        res.status(404).send(err);
    };
});

module.exports = router;
