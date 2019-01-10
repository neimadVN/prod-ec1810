$(function () {
    const loginScripts = '<div class="text-center">' +
        '<form class="login" action="/auth/login" method="post"><p>' +
        '<input class="form-control" type="text" placeholder="Tài Khoản" name="username" required="" ><p>' +
        '<input class="form-control" type="password" placeholder="Mật khẩu" name="password" required=""><p>' +
        '</form>' +
        '</div>';

    $(document).on('click', '#btn-login', function () {
        const loginModal = bootbox.dialog({
            title: 'Log In - Đăng Nhập',
            message: loginScripts,
            onEscape: false,
            backdrop: true,
            size: 'small',
            buttons: {
                login: {
                    label: 'Đăng nhập',
                    className: 'btn btn-danger',
                    callback: function () {
                        let username = $('input[name="username"]').val();
                        let password = $('input[name="password"]').val();

                        $.ajax({
                            url: '/auth/login',
                            dataType: 'text',
                            type: 'POST',
                            data: {
                                username,
                                password
                            }
                        }).done((data) => {
                            loginModal.hide("slow", () => {
                                location.reload();
                            });
                        }).fail((err) => {
                            $('</br><div style="background-color: #d9534f">' + err.responseText + '</div></br>').insertBefore('form.login');
                        });
                    }
                },
                cancel: {
                    label: 'Đóng',
                    className: 'btn btn-default',
                    callback: function () {}
                }
            }
        });




    });

    const signupScripts = '<div class="text-center">' +
        '<form class="signup" action="/auth/singup" method="post"><p>' +
        '<input class="form-control" type="text" placeholder="Tài Khoản" name="username" required="" ><p>' +
        '<input class="form-control" type="password" placeholder="Mật khẩu" name="password" required=""><p>' +
        '<input class="form-control" type="password" placeholder="Nhập lại mật khẩu" name="repassword" required="type="Mật khẩu""><p>' +
        '<input class="form-control" type="number" placeholder="Số điện thoại" name="phone" required=""><p>' +
        '<input class="form-control" type="email" placeholder="Email" name="email" required=""><p>' +
        '</form>' +
        '</div>';


    $(document).on('click', '#btn-signup', function () {
        const signupModal = bootbox.dialog({
            title: 'Sign Up - Đăng Ký',
            message: signupScripts,
            onEscape: false,
            backdrop: true,
            size: 'small',
            buttons: {
                signup: {
                    label: 'Đăng ký',
                    className: 'btn btn-danger',
                    callback: function () {
                        let username = $('input[name="username"]').val();
                        let password = $('input[name="password"]').val();
                        let repassword = $('input[name="repassword"]').val();

                        if (password != repassword) {
                            $('</br><div style="background-color: #d9534f">' + 'password không khớp' + '</div></br>').insertBefore('form.signup');
                            return;
                        }

                        let phone = $('input[name="phone"]').val();
                        let email = $('form.signup input[name="email"]').val();

                        $.ajax({
                            url: '/auth/signup',
                            dataType: 'application/json',
                            type: 'POST',
                            data: {
                                username,
                                password,
                                phone,
                                email
                            }
                        }).done((data) => {
                            user = data;
                            signupModal.hide("slow", () => {});
                        }).fail((err) => {
                            $('</br><div style="background-color: #d9534f">' + err.responseText + '</div></br>').insertBefore('form.login');
                        });
                    }
                },
                cancel: {
                    label: 'Đóng',
                    className: 'btn btn-default',
                    callback: function () {}
                }
            }
        });

    
    });

});