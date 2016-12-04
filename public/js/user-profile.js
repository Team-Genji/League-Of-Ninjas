/* globals toastr $ requester validator */
$('body').on('click', '#save-changes', () => {

    const $userContainer = $('.user-container');
    var isUserDataValid = true,
        result = {
            success: true
        };

    $userContainer.find('input').each(function () {
        let input = $(this),
            inputType = input.attr('name');
        if (input.val() < 1) {
            return;
        }
        if (inputType === 'avatarUrl') {
            result = validator.validateUrl(input.val());
            if (!result.success) {
                toastr.error(result.message);
                isUserDataValid = false;
            }
        }
        if (inputType === 'password') {
            result = validator.validateString(input.val(), 3, 50);
            if (!result.success) {
                toastr.error(result.message);
                isUserDataValid = false;
            }
        }
        if (inputType === 'repeat-password') {
            result = validator.validateString(input.val(), 3, 50);
            if (!result.success) {
                toastr.error(result.message);
                isUserDataValid = false;
            }
        }
    });

    if (!isUserDataValid) {
        return;
    }

    var updateUser;
    if ($('#user-avatar').val().length < 1 && $('#user-repeat-new-password').val().length > 0 && $('#user-new-password').val().length > 0) {
        if ($('#user-new-password').val() === $('#user-repeat-new-password').val()) {
            updateUser = {
                _id: $('.username').attr('id'),
                password: $('#user-new-password').val()
            };
        } else {
            return toastr.error('new password and repeat new password are not the same!');
        }
    } else if ($('#user-avatar').val().length > 0 && $('#user-repeat-new-password').val().length > 0 && $('#user-new-password').val().length > 0) {
        if ($('#user-new-password').val() === $('#user-repeat-new-password').val()) {
            updateUser = {
                _id: $('.username').attr('id'),
                password: $('#user-new-password').val(),
                avatarUrl: $('#user-avatar').val()
            };
        }
    } else if ($('#user-avatar').val().length > 0 && $('#user-repeat-new-password').val().length < 1 && $('#user-new-password').val().length < 1) {
        updateUser = {
            _id: $('.username').attr('id'),
            avatarUrl: $('#user-avatar').val()
        };
    }


    requester.postJSON('/profile', updateUser)
        .then(response => {
            if (response.success) {
                toastr.success(response.message);
            } else {
                toastr.error(response.message);
            }
        });
});