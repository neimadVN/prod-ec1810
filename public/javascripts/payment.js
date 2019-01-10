
$(document).ready(() => {

    $('.btn-payment').on('click', (e) => {
        console.log(e);
        // let diemDon = $('select#sel3').val();
        // if (!diemDon && !$('select#sel3 option')[1]) {
        //     $('select#sel3 option')[1].selected = true;
        //     diemDon = $('select#sel3').val();
        // }

        // let diemTra = $('select#sel4').val();
        // if (!diemTra && !$('select#sel4 option')[1]) {
        //     $('select#sel4 option')[1].selected = true;
        //     diemTra = $('select#sel4').val();
        // }

        let hoTenKhach = $('form.payment-info input#hoTenKhach').val();
        let sdtKhach = $('form.payment-info input#sdtKhach').val();
        // let emailKhach = $('form.payment-info input#emailKhach').val();
        // let ghiChu = $('form.payment-info input#ghiChu').val();

        if (!hoTenKhach || !sdtKhach) {
            bootbox.alert('Yêu cầu nhập cả tên và số điện thoại của khách');
            return;
        }

        if (!$('#totalPrice').attr('total') || $('#totalPrice').attr('total') == 0) {
            bootbox.alert('Chọn tối thiểu 1 ghế!');
            return;
        }
        
        $('#paypal-button-container').css('visibility', 'visible');

        // console.log(window.SEAT_PICK);
        // console.log($('div.paypal-button'));

        // $('.paypal-button').trigger('click');
        // //return;

        // $.ajax({
        //     url: '/users/booking',
        //     dataType: 'text',
        //     type: 'POST',
        //     data: { 
        //         diemDon,
        //         diemTra,
        //         hoTenKhach,
        //         sdtKhach,
        //         emailKhach,
        //         ghiChu
        //     }
        // }).done((data) => {
        //         location.reload();
        // }).fail((err) => {
        //     $('</br><div style="background-color: #d9534f">' + err.responseText + '</div></br>').insertBefore('form.edit-profile');
        // });
    });

});