/* globals window requester toastr location $ */

window.onload = function () {
    $('#btn-forum-create').on('click', () => {
        let forumName = {
            name: $('#input-forum-name').val()
        };
        let url = '/forums';

        if (forumName.name.length < 5) {
            toastr.error('The forum name is too short!');
            return;
        }
        if (forumName.name.length > 20) {
            toastr.error('The forum name is too long!');
            return;
        }

        requester.postJSON(url, forumName)
            .then(() => {
                toastr.success('Forum created sucessfuly!');
                setTimeout(() => {
                    location.reload();
                }, 1000);
            })
            .catch(error => {
                toastr.error(error.responseJSON.message);
            });
    });
};