/* globals toastr $ requester location */

$('body').on('click', '#save-changes', () => {

    let updateUser;
    // think of better way to do this
    if ($('#user-avatar'.val < 1) && $('#user-repeat-new-password').val > 0 && $('#user-new-password').val > 0) {
        if ($('#user-new-password').val() === $('#user-repeat-new-password').val()) {
            updateUser = {
                _id: $('.username').attr('id'),
                password: $('##user-new-password').val()
            };
        }
    } else if ($('#user-avatar'.val > 0) && $('#user-repeat-new-password').val > 0 && $('#user-new-password').val > 0) {
        if ($('#user-new-password').val() === $('#user-repeat-new-password').val()) {
            updateUser = {
                _id: $('.username').attr('id'),
                password: $('##user-new-password').val(),
                avatarUrl: $('#avatarUrl').val()
            };
        }
    } else if ($('#user-avatar'.val > 0) && $('#user-repeat-new-password').val < 1 && $('#user-new-password').val < 1) {
        updateUser = {
            _id: $('.username').attr('id'),
            avatarUrl: $('#avatarUrl').val()
        };
    }
    console.log(updateUser);
    // if (!validator.validateStringLength(updateUser.firstName, 3, 50)) {
    //     toastr.error('Error: First name must be between 3 and 50 symbols');
    //     return;
    // }
    //
    // if (!validator.validateStringLength(updateUser.lastName, 3, 50)) {
    //     toastr.error('Error: Last name must be between 3 and 50 symbols');
    //     return;
    // }

    requester.postJSON('/profile', updateUser)
         .then(response => {
             if (response.success) {
                 toastr.success(response.message);
                 $(location).attr('href', '/profile');
             } else {
                 toastr.error(response.message);
             }
         });
});