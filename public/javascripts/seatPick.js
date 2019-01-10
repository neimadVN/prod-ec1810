$(document).ready(() => {
    window.SEAT_PICK = {};

    $('button.seat').on('click', (e) => {
        const data = e.target.getAttribute('data-id');
        if (window.SEAT_PICK[data]) {
            e.target.setAttribute('style', "");
            delete window.SEAT_PICK[data];
        } else {
            e.target.setAttribute('style', "background-color: #ccff99");
            window.SEAT_PICK[data] = true;
        }

        console.log($('.btn-payment'));
        console.log(Object.keys(window.SEAT_PICK).length);

        let newPrice = Number($('.btn-payment').attr('unitPrice')) * Object.keys(window.SEAT_PICK).length;

        $('#totalPrice').html(newPrice);
        $('#totalPrice').attr('total', newPrice);
        console.log(window.SEAT_PICK);
    });
});