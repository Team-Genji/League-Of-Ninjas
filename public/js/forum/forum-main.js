/* globals window requester toastr location $ */

window.onload = function () {
    $('#btn-forum-create').on('click', () => {
        let forumName = {
            name: $('#input-forum-name').val()
        };
        let url = '/forums';

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