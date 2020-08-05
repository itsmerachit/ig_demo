import React from 'react';
import name from './ig_name.png';
import logo from './logo.svg';
import postImage from './post.jpg';
import './App.css';

function App() {
    return (
        <section>
            <Navbar />
            <div>
                <Posts />
            </div>
        </section>
    );
}

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light" style={{"borderBottom": "1px solid #dbdbdb"}}>
            <div className="container">
                <div className="row nav_utils">

                    <div className="col-4">
                        <div id="ig_logo">
                            <a className="navbar-brand" href="#">
                                <img src={name} alt="Instagram" style={{"height":"30px"}} />
                            </a>
                        </div>
                    </div>

                    <div className="col-4">
                        <div className="search_ctr">
                            <input className="form-control mr-sm-2 search" type="search" placeholder="Search" aria-label="Search" />
                        </div>
                    </div>

                    <div className="col-4 align-self-center">
                        <div className="">
                            <div className="row">
                                <div className="col nav_btn">
                                    <a className="nav-link" href="#">
                                        <svg aria-label="Home" className="_8-yf5 " fill="#262626" height="22" viewBox="0 0 48 48"
                                             width="22">
                                            <path
                                                d="M45.3 48H30c-.8 0-1.5-.7-1.5-1.5V34.2c0-2.6-2-4.6-4.6-4.6s-4.6 2-4.6 4.6v12.3c0 .8-.7 1.5-1.5 1.5H2.5c-.8 0-1.5-.7-1.5-1.5V23c0-.4.2-.8.4-1.1L22.9.4c.6-.6 1.5-.6 2.1 0l21.5 21.5c.4.4.6 1.1.3 1.6 0 .1-.1.1-.1.2v22.8c.1.8-.6 1.5-1.4 1.5zm-13.8-3h12.3V23.4L24 3.6l-20 20V45h12.3V34.2c0-4.3 3.3-7.6 7.6-7.6s7.6 3.3 7.6 7.6V45z"></path>
                                        </svg>
                                    </a>
                                </div>
                                <div className="col nav_btn">
                                    <a className="nav-link" href="#">
                                        <svg aria-label="Direct" className="_8-yf5 " fill="#262626" height="22" viewBox="0 0 48 48"
                                             width="22">
                                            <path
                                                d="M47.8 3.8c-.3-.5-.8-.8-1.3-.8h-45C.9 3.1.3 3.5.1 4S0 5.2.4 5.7l15.9 15.6 5.5 22.6c.1.6.6 1 1.2 1.1h.2c.5 0 1-.3 1.3-.7l23.2-39c.4-.4.4-1 .1-1.5zM5.2 6.1h35.5L18 18.7 5.2 6.1zm18.7 33.6l-4.4-18.4L42.4 8.6 23.9 39.7z"></path>
                                        </svg>
                                    </a>
                                </div>
                                <div className="col nav_btn">
                                    <a className="nav-link" href="#">
                                        <svg aria-label="Activity Feed" className="_8-yf5 " fill="#262626" height="22"
                                             viewBox="0 0 48 48" width="22">
                                            <path
                                                d="M34.6 6.1c5.7 0 10.4 5.2 10.4 11.5 0 6.8-5.9 11-11.5 16S25 41.3 24 41.9c-1.1-.7-4.7-4-9.5-8.3-5.7-5-11.5-9.2-11.5-16C3 11.3 7.7 6.1 13.4 6.1c4.2 0 6.5 2 8.1 4.3 1.9 2.6 2.2 3.9 2.5 3.9.3 0 .6-1.3 2.5-3.9 1.6-2.3 3.9-4.3 8.1-4.3m0-3c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5.6 0 1.1-.2 1.6-.5 1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path>
                                        </svg>
                                    </a>
                                </div>
                                <div className="col nav_btn">
                                    <a className="nav-link" href="#">
                                        <div className="profile_pic_ctr">
                                            <img id="profile_pic_min" src={logo} alt=""/>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

const Posts = () => {
    let posts = [];
    for (let i = 1; i < 5; i++) {
        posts.push(
            <div className="card" key={i}>

                <div className="card-header row">
                    <div style={{'float':'left', 'width':'95%'}} className="row">
                        <div className="post_profile_pic_ctr">
                            <img src={logo} alt="" className="post_profile_pic"/>
                        </div>
                        <div>
                            <span>itsmerachit
                            </span>
                        </div>
                    </div>
                    <div style={{'float': 'right', 'width': '5%'}}>
                        ···
                    </div>
                </div>

                <div className="card-body">
                    <div className="post_ctr">
                        <img className="post" src={postImage} alt=""/>
                    </div>
                </div>
                <div className="card-footer">
                    <div className="row">
                        <div className="like_ctr">
                            <svg aria-label="Like" className="_8-yf5 " fill="#262626" height="24"
                                 viewBox="0 0 48 48"
                                 width="24">
                                <path
                                    d="M34.6 6.1c5.7 0 10.4 5.2 10.4 11.5 0 6.8-5.9 11-11.5 16S25 41.3 24 41.9c-1.1-.7-4.7-4-9.5-8.3-5.7-5-11.5-9.2-11.5-16C3 11.3 7.7 6.1 13.4 6.1c4.2 0 6.5 2 8.1 4.3 1.9 2.6 2.2 3.9 2.5 3.9.3 0 .6-1.3 2.5-3.9 1.6-2.3 3.9-4.3 8.1-4.3m0-3c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5.6 0 1.1-.2 1.6-.5 1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path>
                            </svg>
                        </div>
                        <div className="comment_ctr">
                            <svg aria-label="Comment" className="_8-yf5 " fill="#262626" height="24"
                                 viewBox="0 0 48 48"
                                 width="24">
                                <path
                                      d="M47.5 46.1l-2.8-11c1.8-3.3 2.8-7.1 2.8-11.1C47.5 11 37 .5 24 .5S.5 11 .5 24 11 47.5 24 47.5c4 0 7.8-1 11.1-2.8l11 2.8c.8.2 1.6-.6 1.4-1.4zm-3-22.1c0 4-1 7-2.6 10-.2.4-.3.9-.2 1.4l2.1 8.4-8.3-2.1c-.5-.1-1-.1-1.4.2-1.8 1-5.2 2.6-10 2.6-11.4 0-20.6-9.2-20.6-20.5S12.7 3.5 24 3.5 44.5 12.7 44.5 24z"></path>
                            </svg>
                        </div>
                        <div className="share_ctr">
                            <svg aria-label="Share Post" className="_8-yf5 " fill="#262626" height="24"
                                 viewBox="0 0 48 48" width="24">
                                <path
                                    d="M47.8 3.8c-.3-.5-.8-.8-1.3-.8h-45C.9 3.1.3 3.5.1 4S0 5.2.4 5.7l15.9 15.6 5.5 22.6c.1.6.6 1 1.2 1.1h.2c.5 0 1-.3 1.3-.7l23.2-39c.4-.4.4-1 .1-1.5zM5.2 6.1h35.5L18 18.7 5.2 6.1zm18.7 33.6l-4.4-18.4L42.4 8.6 23.9 39.7z"></path>
                            </svg>
                        </div>
                    </div>
                    <div className="likes_ctr">
                        <span>13,998 likes</span>
                    </div>
                    <div className="username_ctr">
                        <span><a href="#" className="username">itsmerachit</a></span>
                        <span className="caption-ctr">&nbsp;&nbsp;caption</span>
                    </div>
                </div>
                <div className="card-footer footer2">
                <span>
                    Add a comment...
                </span>
                </div>
            </div>
        )}
    return posts
}

export default App;
