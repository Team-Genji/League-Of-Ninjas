/* globals window requester toastr location $ */

window.onload = function () {
    $('#btn-comment-create').on('click', () => {
        let comment = {
            content: $('#input-comment-content').val()
        };
        let url = window.location.href;

        if (comment.content.length < 5) {
            toastr.error('Your comment is too short!');
            return;
        }
        if (comment.content.length > 1000) {
            toastr.error('Your comment is too long!');
            return;
        }

        requester.postJSON(url, comment)
            .then(() => {
                toastr.success('Topic created sucessfuly!');
                setTimeout(() => {
                    location.reload();
                }, 1000);
            })
            .catch(error => {
                toastr.error(error.responseJSON.message);
            });
    });
};