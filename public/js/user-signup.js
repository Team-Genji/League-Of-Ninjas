/* globals toastr $ requester location*/

$('body').on('click', '#btn-signup', () => {
    let user = {
        username: $('#username').val(),
        password: $('#password').val()
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