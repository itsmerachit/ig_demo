let ReactDOM = ReactDOM;
const {useState, useEffect} = React;

function App() {
    const [posts, setPosts] = useState([]);
    const [username, setUsername] = useState([]);
    useEffect(() => {
        const postItems = [{username: 'itsmerachit'}, {username: 'niyati12'}];
        setPosts(postItems);
        setUsername(current_user_username);
    }, []);
    return (
        <section>
            <Navbar username={username}/>
            <div>
                {
                    posts.map((post, index) => {
                        return (
                            <div className="card" key={index}>

                                <div className="card-header row">
                                    <div className="col-12 col-sm-6 col-md-8 row">
                                        <div className="post_profile_pic_ctr">
                                            <img src="logo.svg" alt="logo" className="post_profile_pic" />
                                        </div>
                                        <div>
                                            <span>{post.username}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="col-6 col-md-4">
                                        ···
                                    </div>
                                </div>

                                <div className="card-body">
                                    <div className="post_ctr">
                                        <img className="post" src="post.jpg" alt="post"/>
                                    </div>
                                </div>

                                <div className="card-footer">
                                    <div className="row">
                                        <div className="like_ctr">
                                            <i className="far fa-heart"></i>
                                        </div>
                                        <div className="comment_ctr">
                                            <i class="far fa-comment"></i>
                                        </div>
                                        <div className="share_ctr">
                                            <i className="fas fa-share"></i>
                                        </div>
                                    </div>
                                    <div className="likes_ctr">
                                        <span>13,998 likes</span>
                                    </div>
                                    <div className="username_ctr">
                                        <span><a href="#" className="username">{post.username}</a></span>
                                        <span className="caption-ctr">&nbsp;&nbsp;caption</span>
                                    </div>
                                </div>

                                <div className="card-footer footer2">
                                    <span>
                                        Add a comment...
                                    </span>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </section>
    );
}

const Navbar = (props) => {
    const {username} = props;
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light" style={{"borderBottom": "1px solid #dbdbdb"}}>
            <div className="container">
                <div className="row nav_utils">

                    <div className="col-4 row">
                        <div id="ig_logo" className="mx-auto">
                            <a className="navbar-brand" href="#">
                                <img src={insta_image} alt="Instagram" style={{"height": "35px"}}/>
                            </a>
                        </div>
                    </div>

                    <div className="col-4">
                        <div className="search_ctr">
                            <input className="form-control mr-sm-2 search" type="search" placeholder="Search"
                                   aria-label="Search"/>
                        </div>
                    </div>

                    <div className="col-4 align-self-center">
                        <div className="">
                            <div className="row">

                                <div className="col nav_btn" title="Home">
                                    <div className="nav-link" id="home" onClick={()=>{goToHome()}}>
                                        <i className="fas fa-home"></i>
                                    </div>
                                </div>

                                <div className="col nav_btn">
                                    <div className="nav-link" id="chat" onClick={()=>{goToChat()}}>
                                        <i className="far fa-envelope"></i>
                                    </div>
                                </div>

                                <div className="col nav_btn">
                                    <div className="nav-link" id="camera" /*onClick={()=>{goToUpload()}}*/>
                                        <i className="fas fa-camera">
                                            <input type="file" name="file"  id="upload_file" onChange={(event)=>{goToUpload(event)}}/>
                                        </i>

                                    </div>
                                </div>

                                <div className="col nav_btn">
                                    <div className="nav-link" id="notifications" onClick={()=>{goToNotifications()}}>
                                        <i className="far fa-heart"></i>
                                    </div>
                                </div>

                                <div className="col nav_btn">
                                    <div className="nav-link" id="profile" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <div className="profile_pic_ctr">
                                            <i className="fas fa-user"></i>
                                        </div>
                                    </div>
                                    <div className="dropdown-menu" aria-labelledby="profile">
                                        <a className="dropdown-item" href={profile_url}>Profile</a>
                                        <a className="dropdown-item" href={logout_url}>Logout</a>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

ReactDOM.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>,
    document.getElementById('root')
);


const Chat = () => {
    const [username, setUsername] = useState([]);
    useEffect(()=> {
        setUsername(current_user_username);
    }, []);
    return (
        <section>
            <Navbar username={username}/>
            <h1>This is chatbox!</h1>
        </section>
    )
}

const goToChat = () => {
    ReactDOM.render(
        <React.StrictMode>
            <Chat />
        </React.StrictMode>,
        document.getElementById('root')
    );
}

const goToHome = () => {
    ReactDOM.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>,
        document.getElementById('root')
    );
}

const goToNotifications = () => {

}

const goToUpload = (e) => {
    const file = e.target.files[0]

}
