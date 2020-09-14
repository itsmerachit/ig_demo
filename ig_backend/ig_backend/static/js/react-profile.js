const ReactDOM = ReactDOM;
const {useState, useEffect} = React;

function Profile() {
    const [profilePic, setProfilePic] = useState('');
    const [hasProfilePic, setHasProfilePic] = useState(false);
    const [picIsLoading, setPicIsloading] = useState(false);
    const [uploadFile, setUploadFile] = useState(null);
    var croppedImage = '';

    useEffect(()=> {

        if (uploadFile) {

            const output = $("#output");

            output.attr('src', URL.createObjectURL(uploadFile));
            console.log(output);

            croppedImage = output.croppie({
                enableExif: true,
                viewport: {
                    width: 400,
                    height: 400,
                    type: 'circle'
                },
                boundary: {
                    width: 400,
                    height: 400
                }
            });
        }

        return (()=> {
            console.log("cleaning");
            $("#profile-pic-upload-btn").val('');
            $("#output").croppie('destroy');
            $("#output").attr('src', '');
            $("#modal_profile_pic").on('hidden.bs.modal', function () {
                setUploadFile(null);
            });
            croppedImage = '';
        });

    }, [uploadFile]);

    const handleProfilePicUpload = async (e) => {
        setPicIsloading(true);
        $("#modal_profile_pic").modal('hide');
        let file = e.target.files[0];
        await uploadFileToFs(file, '', saveProfilePic);
    };

    const saveProfilePic = (url, caption) => {
        const data = {
            'url': url,
        };
        fetch('/add_profile_pic/', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken')
            },
            body: JSON.stringify(data)
            })
             .then((res)=> {
                 setProfilePic(url);
                 setPicIsloading(false);
                 setHasProfilePic(true);
             })
            .catch((error) => {
                console.log(error);
            });

    };


    return (
        <div className="view-profile">

            {/*profilePic ui upload modal*/}
            <div className="modal fade" id="modal_profile_pic_ui">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            Change Profile Pic
                        </div>

                        <div className="modal-body">
                            <div className="" id="upload_profile_pic">
                                <span style={{'color': '#0095f6'}} data-toggle="modal" data-target="#modal_profile_pic">Upload New</span>
                            </div>
                        </div>
                        <div className="modal-body" id="remove_profile_pic" style={{'color':'#ed4956', 'cursor':'pointer'}}>Remove Current</div>
                        <div className="modal-footer">
                            <button className="btn" data-dismiss="modal">Cancel</button>
                        </div>

                    </div>
                </div>
            </div>
            {/*End modal*/}

            {/*profile pic crop modal*/}
            <div className="modal fade" id="modal_profile_pic">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            Image Upload
                        </div>

                        <div className="modal-body">
                            <input type="file" id="profile-pic-upload-btn" accept="image/*" style={{'cursor':'pointer'}}
                                       onChange={event => setUploadFile(event.target.files[0])}/>

                            <img id="output" style={{'max-width': '460px'}} src="" />
                        </div>
                        <div className="modal-footer">
                            <button className="btn">Save</button>
                            <button className="btn" data-dismiss="modal">Cancel</button>
                        </div>

                    </div>
                </div>
            </div>
            {/**/}

            <div className="upper-body row">
                <div className="col-3 profile-pic" data-toggle="modal" data-target="#modal_profile_pic_ui">
                    {hasProfilePic?
                        <div className='profile-pic-container'>
                            <img src={profilePic} alt=""/>
                        </div>
                    :
                        <div className='profile-pic-container'>
                            <span><i className="far fa-user" style={{'font-size':'150px', 'color': '#ababab'}}></i></span>
                        </div>
                    }
                    <div className="loading">
                    {picIsLoading?
                        <div className="spinner-border" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>                    :
                        ''
                    }
                    </div>
                </div>
                <div className="col-9 username">
                    {current_user_username}
                </div>
            </div>

            <div className="lower-body">
                Posts
            </div>
        </div>)
};

ReactDOM.render(
    <React.StrictMode>
        <Profile/>
    </React.StrictMode>, document.getElementById('root'));

function Posts() {
    return (
        <div>Post here</div>
    )
}

function dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {type:mime});
}
