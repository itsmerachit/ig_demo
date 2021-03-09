$("#isLoading").hide();

function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
}
function uuid() {
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
}
function changeLoadingState() {
    $("#isLoading").toggle()
}

$("#logout_btn").click(function () {
    console.log("Logout");
    $.ajax({
        url: '/logout/'
    }).done(function (data) {
        if (data === "OK") {
            window.location = "/";
        }
    });
});

$("#upload_btn").click(function () {

    changeLoadingState()
    let file = $("#post_upload").prop('files')[0];
    let caption = $("#caption").val();
    if (!file) {
        console.log("No file selected");
        return;
    }
    uploadFileToFs(file, caption, sendURLtoBackend);
});


async function uploadFileToFs(file, caption, callbackFn) {
    let file_blob = new Blob([file]);
    let name = file.name

    const uploadTask = my_storage
        .ref()
        .child(name)
        .put(file_blob);

    uploadTask.on('state_changed', (snapshot) => {
        switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
                break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
                break;
        }
    },
        (error) => {
            console.log(error);
        },
        () => {
            uploadTask.snapshot.ref.getDownloadURL()
                .then(async (downloadURL) => {
                    callbackFn(downloadURL, caption);
                })
                .catch((error) => {
                    console.log(error);
                });
        });
}

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

$("#home_nav").click(function () {
    window.location.href = '/'
});

function sendURLtoBackend(downloadURL, caption) {
    let data = {
        'url': downloadURL,
        'caption': caption
    }
    $.ajax({
        url: '/upload/',
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken': getCookie('csrftoken')
        },
        data: JSON.stringify(data)
    }).then((res) => {
        changeLoadingState()
        $("#modal_upload").modal('hide');
        window.location.reload();
    })
        .catch((err) => {
            console.log(err)
            changeLoadingState()
        })

}