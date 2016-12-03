/* globals toastr $ requester location*/

$('body').on('click', '#btn-signup', () => {
    let user = {
        username: $('#username').val(),
        password: $('#password').val(),
        avatarUrl: $('#avatarUrl').val() || 'http://www.humasol.be/wp-content/uploads/2016/05/Nelson_Neves_picuture.gif'
    };

    let url = '/signup';
    requester.postJSON(url, user)
        .then(response => {
            if (response.success) {
                toastr.success(response.message);
                $(location).attr('href', '/signin');
            } else {
                toastr.error(response.message);
            }
        });
});