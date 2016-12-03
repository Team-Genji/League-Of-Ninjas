/* globals toastr $ requester location*/

$('body').on('click', '#btn-signin', () => {
    let user = {
        username: $('#username').val(),
        password: $('#password').val()
    };
    let url = '/signin';
    requester.postJSON(url, user)
        .then(response => {
            if (response.success) {
                toastr.success(response.message);
                $(location).attr('href', '/profile');
            } else {
                toastr.error(response.message);
            }
        });
});