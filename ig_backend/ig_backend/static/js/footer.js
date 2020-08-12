function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
}
function uuid() {
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
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

$("#upload_btn").click(function (){
    let file = $("#post_upload").prop('files')[0];
    let caption = $("#caption").val();
    uploadPost(file, caption);
});


async function uploadPost(file, caption) {
    let file_blob = new Blob([file]);
    let name = file.name

    const uploadTask = my_storage
        .ref()
        .child(name)
        .put(file_blob);

    await uploadTask.on('state_changed', function (snapshot) {
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
            })
            .then((res)=>{
                console.log(res);
                $("#modal_upload").modal('hide');
            })
            .catch((error)=> {
                console.log(error);
            });
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