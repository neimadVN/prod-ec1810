$(function () {
    $(document).on('submit', '#form-submit-time-place', function (e) {
        e.preventDefault();
        console.log($(this).serialize());
        console.log('asd');
        location.href = '/danhSachVe?' + $(this).serialize();
    });

    $(document).ready(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const huyenTinhDen = urlParams.get('huyenTinhDen');
        const huyenTinhDi = urlParams.get('huyenTinhDi');
        const thoiGianKhoiHanh = urlParams.get('thoiGianKhoiHanh');

        $('select[name="huyenTinhDen"]').val(huyenTinhDen).change();
        $('select[name="huyenTinhDi"]').val(huyenTinhDi).change();
        $('input[name="thoiGianKhoiHanh"]').val(thoiGianKhoiHanh).change();

        $('input[name="thoiGianKhoiHanh"]').attr('min', new Date().toLocaleDateString());
    });
});