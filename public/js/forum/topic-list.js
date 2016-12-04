/* globals window requester toastr location $ */

window.onload = function () {
    $('#btn-topic-create').on('click', () => {
        let topicName = {
            name: $('#input-topic-name').val()
        };
        let url = `${window.location.href}/topics`;

        requester.postJSON(url, topicName)
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