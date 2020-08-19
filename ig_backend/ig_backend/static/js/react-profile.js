let ReactDOM = ReactDOM;
const {useState, useEffect} = React;

function Profile () {
    return (
        <div>
            <div className="upper-body">
                <div className="">
                    <ProfilePic />
                    <UserCard />
                </div>
            </div>
            <div className="lower-body">
                Posts
            </div>
        </div>
    )
}

ReactDOM.render(
    <React.StrictMode>
        <Profile />
    </React.StrictMode>,
    document.getElementById('root')
);

function ProfilePic() {
    return (
        <div className="profile-pic" data-toggle="modal" data-target="#modal_profile_pic">
            <span><i className="far fa-user"></i></span>
        </div>
    )
}

function UserCard() {
    return (
        <div style={{"float":"right"}}>
            {current_user_username}
        </div>
    )
}

function Posts() {
    return (
        <div>Post here</div>
    )
}