/* globals window requester toastr location $ */

window.onload = function () {
    $('#btn-forum-create').on('click', () => {
        let forumName = {
            name: $('#input-forum-name').val()
        };
        let url = '/forums';

        requester.postJSON(url, forumName)
            .then(response => {
                toastr.success(response.message);
                // maybe I should do something else here
                location.reload();
            })
            .catch(error => {
                toastr.error(error.responseJSON.message);
            });
    });
};