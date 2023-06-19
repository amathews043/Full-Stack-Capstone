import { useState, useEffect } from "react";
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import { Link } from "react-router-dom"
import Popup from 'reactjs-popup';

import { getMyProfile, updateProfile } from "../../managers/ProfileManager";
import { getUserPosts } from "../../managers/PostManager";
import { ProfilePictureUploadWidget } from "./ProfilePictureUploadWidget";

export const UserProfile = () => {
    const [userProfile, setUserProfile] = useState({})
    const [userPosts, setUserPosts] = useState([])
    const userId = parseInt(localStorage.getItem('user_id'))
    const [formShown, setForm] = useState(false)
    const [newProfilePic, setNewProfilePic] = useState("")
    const [newUserBio, setNewUserBio] = useState("")

    useEffect(() => {
        getMyProfile(userId).then(data => setUserProfile(data))
    }, [userId])

    useEffect(() => {
        getUserPosts(userId).then(data => setUserPosts(data.reverse()))
    }, [userId])

    const setImageURL = (url) => {
        setNewProfilePic(url)
    }

    const submit = () => {

        const updatedProfile = {
            id: userProfile.id,
            bio: newUserBio,
            profile_pic: newProfilePic, 
            username: userProfile.username, 
            first_name: userProfile.first_name,
            is_staff: userProfile.is_staff
        }

        updateProfile(updatedProfile)
    }

    return <article className="center">
        <h2>My Profile </h2>
        <div> 
            <button onClick={() => setForm(!formShown)}> Edit Profile</button>
        </div>
        {
            formShown ? 
            <form onSubmit={submit}>
                <fieldset>
                    <label>Bio:</label>
                    <div> 
                    <textarea required autoFocus
                    type="text"
                    className="form-control textarea"
                    value={newUserBio}
                    onChange={(evt) => {
                        setNewUserBio(evt.target.value)
                    }}
                    >
                    </textarea>
                </div>
                </fieldset>
                <ProfilePictureUploadWidget setImageURL={setImageURL}/>
                <button type="submit">Submit Changes</button>
            </form>
            
            : ""
        }
        
        <Container>
        <Row>
        <Col xs={6} md={4}> 
        
        {
        userProfile.profile_pic ? <div className=" p-3 mx-auto p-2 shadow p-3 mb-5 bg-body-tertiary rounded "> <Image src={userProfile.profile_pic} fluid /> 
        <div className="card-body"> 
        
        
        <Popup trigger={<button>Delete Profile Picture</button>} position={"right center"}> 
        <div>Are you sure you want to delete your profile picture?
            <div>
                <button onClick={() => {
                const copy = {...userProfile}
                copy.profile_pic = ""
                updateProfile(copy).then(() => getMyProfile(userId).then(data => setUserProfile(data)))
                }}>Delete</button>
            </div>
        </div>
        </Popup> 
        </div>
        </div>
        : ""
        }
        </Col>
        <Col xs={6} md={4} fluid > <h5>My Bio:</h5>{userProfile.bio}  </Col>
        </Row>
    </Container>

    <h3>All My Posts</h3>

    {
                userPosts.map((post) => {
                    if(post.image ){
                        return <div className="w-50 p-3 mx-auto p-2 shadow p-3 mb-5 bg-body-tertiary rounded " key={post.id}>
                            <div className="card text-center ">
                                <img src={post.image} className="card-img-top" alt={post.project_name}/>
                                <div className="card-body">
                                    <h5 className="card-title"><Link to={`/projectDetails/${post.project}`} >{post.project_name} by {post.creator_name}</Link></h5>
                                    <p className="card-text">{post.post}</p>
                                    <div className="card-footer tags"><small className="text-body-secondary"> <p>Tags: </p>
                                    {
                                        post.tags.map((tag) => {
                                            return <aside key={tag.id} className="inline"> <li> {tag.tag} </li></aside>
                                        })
                                    }
                                    </small></div>
                                </div>
                            </div>
                        </div>
                    } else {
                        return <div className="w-50 p-3 mx-auto p-2 shadow p-3 mb-5 bg-body-tertiary rounded" key={post.id}>
                        <div className="card text-center " key={post.id}>
                            <div className="card-body">
                                <h5 className="card-title"><Link to={`/projectDetails/${post.project}`}>{post.project_name} by {post.creator_name}</Link></h5>
                                <p className="card-text">{post.post}</p>
                                <div className="card-footer tags"><small className="text-body-secondary"> <p>Tags: </p>
                                    {
                                        post.tags.map((tag) => {
                                            return <aside className="inline" key={tag.id}> <li> {tag.tag} </li></aside>
                                        })
                                    }
                                    </small></div>
                            </div>
                        </div>
                    </div>
                    }
                })
            }
    </article>
}