/* globals window requester toastr location $ */

window.onload = function () {
    $('#btn-comment-create').on('click', () => {
        let comment = {
            content: $('#input-comment-content').val()
        };
        let url = window.location.href;

        requester.postJSON(url, comment)
            .then(() => {
                toastr.success('Comment posted sucessfuly!');
                setTimeout(() => {
                    location.reload();
                }, 1000);
            })
            .catch(error => {
                toastr.error(error.responseJSON.message);
            });
    });
};