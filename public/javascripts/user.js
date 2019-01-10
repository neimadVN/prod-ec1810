$(document).ready(() => {
    //--------------------------------------------------------------------------------------------------------- profile
    const profileScrips = '<div class="text-center">' +
        '<form class="edit-profile" action="/users/updateGuess" method="post"><p>' +
        '<input class="form-control" type="text" placeholder="Họ Tên" name="hoTen" ><p>' +
        '<select class="form-control" type="text" placeholder="Giới tính" name="gioiTinh"><option value="">Chọn giới tính</option><option value="Nam">Nam</option><option value="Nữ">Nữ</option></select><p>' +
        '<textarea class="form-control" type="text" placeholder="Địa Chỉ" name="diaChi"></textarea><p>' +
        '<button type="submit" class="btn btn-danger"><b>Cập nhật</b> <span class="glyphicon glyphicon-Login"></span></button>' +
        '</form>' +
        '</div>';

    $(document).on('click', '#edit-seft-profile', (e) => {
        const editSeftProfile = bootbox.dialog({
            title: 'Thông tin cá nhân',
            message: profileScrips,
            onEscape: false,
            backdrop: true,
            size: 'small',
            buttons: {
                cancel: {
                    label: 'Đóng',
                    className: 'btn btn-default',
                    callback: function () { }
                }
            }
        });

        editSeftProfile.init(() => {
            $('form.edit-profile [name="hoTen"]').val(user.hoTen);
            $('form.edit-profile [name="gioiTinh"]').val(user.gioiTinh).change();
            $('form.edit-profile [name="diaChi"]').val(user.diaChi);
        });

        console.log(user);

        $(document).on('submit', 'form.edit-profile', (e) => {
            console.log('triggerd');
            e.preventDefault();
            let hoTen = $('form.edit-profile [name="hoTen"]').val();
            let gioiTinh = $('form.edit-profile [name="gioiTinh"]').val()
            let diaChi = $('form.edit-profile [name="diaChi"]').val();
    
            $.ajax({
                url: '/users/updateGuess',
                dataType: 'text',
                type: 'POST',
                data: {
                    hoTen,
                    gioiTinh,
                    diaChi
                }
            }).done((data) => {
                editSeftProfile.hide("slow", () => {
                    location.reload();
                });
            }).fail((err) => {
                $('</br><div style="background-color: #d9534f">' + err.responseText + '</div></br>').insertBefore('form.edit-profile');
            });
        });
    });

    //--------------------------------------------------------------------------------------------------------- power

    const dislike = (id) => '<button type="button" id="' + '" class="btn btn-default dislike-btn" style="float: right;">liked &#10084</button>'; 

    const like = (id) => '<button type="button" id="' + '" class="btn btn-default like-btn" style="float: right;">like ♡</button>';

    $(document).on('click', 'button.like-btn', (e) => {
        const idTuyen = $(e.target).attr('id');
        $(e.target).replaceWith(dislike(idTuyen));

        $.ajax({
            url: '/users/likeTuyen',
            dataType: 'text',
            type: 'POST',
            data: {
                idTuyen
            }
        }).done((data) => {
            console.log(data);
        }).fail((err) => {
            $(e.target).replaceWith(like(idTuyen));
        });
    });

    $(document).on('click', 'button.dislike-btn', (e) => {
        const idTuyen = $(e.target).attr('id');
        console.log( $(this.element).attr('id'));
        $(e.target).replaceWith(like(idTuyen));

        $.ajax({
            url: '/users/disLikeTuyen',
            dataType: 'text',
            type: 'POST',
            data: {
                idTuyen
            }
        }).done((data) => {
            console.log(data);
        }).fail((err) => {
            $(e.target).replaceWith(dislike(idTuyen));
        });
    });

});