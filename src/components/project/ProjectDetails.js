import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom"
import Popup from 'reactjs-popup';

import { getCurrentProject, getProjectNotes, deleteProjectNote } from "../../managers/ProjectManager";
import { getProjectPosts } from "../../managers/PostManager";
import { Note } from "../note/Note";
import "./project.css"

export const ProjectDetails = () => {
    const navigate = useNavigate()
    const {project_id} = useParams()
    const [project, setProject] = useState({})
    const [notes, setNotes] = useState([])
    const [posts, setPosts] = useState([])
    const user = parseInt(localStorage.getItem('user_id'))

    useEffect(() => {
        getCurrentProject(project_id).then((data) => {
            setProject(data)
        })
    }, [project_id])

    useEffect(() => {
        getProjectPosts(project_id).then((data) => {
            setPosts(data)
        })
    }, [project_id])

    useEffect(() => {
        getProjectNotes(project_id).then((data) => {
            setNotes(data)
        })
    }, [project_id])

    const updateProjectNotes = () => {
        getProjectNotes(project_id).then((data) => {
            setNotes(data);
        });
    };

    return <article>
        <div className="center">
        <h2 >{project.name}</h2>
        <p>{project.description}</p>
        {project.pattern_url ? <button className="button is-link" type="button"><Link to={project.pattern_url} className="link" target="_blank" rel="noreferrer noopener" > Link to Pattern </Link></button> : ""}
        {
                posts.map((post) => {
                    if(post.image ){
                        return <div className="w-50 p-3 mx-auto p-2 shadow p-3 mb-5 bg-body-tertiary rounded " key={post.id}>
                            <div className="card text-center ">
                                <img src={post.image} className="card-img-top" alt={post.project_name}/>
                                <div className="card-body">
                                    <h5 className="card-title">{post.project_name} by {post.creator_name}</h5>
                                    <p className="card-text">{post.post}</p>
                                    {
                                        post.user === user ? <div><button> Edit Post </button> <button> Delete Post </button> </div> : ""
                                    }
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
                                <h5 className="card-title">{post.project_name} by {post.creator_name}</h5>
                                <p className="card-text">{post.post}</p>
                                {
                                    post.user === user ? <div><button> Edit Post </button> <button> Delete Post </button> </div>: ""
                                }
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
            {
                project.user_id === user ? <div>
                <h3>Private Notes</h3>
                <Note projectId={project.id} updateProjectNotes={updateProjectNotes}/>
                    {
                        notes.map((note) => {
                            return<div className="w-50 p-3 mx-auto p-2 shadow p-3 mb-5 bg-body-tertiary rounded" key={note.id}>
                                <div className="card text-center " key={note.id}>
                                    <div className="card-body">
                                        <p className="card-text">{note.note}</p>
                                        <div><button onClick={() => {
                                        navigate(`/editNote/${note.id}`)
                                        }}
                                        > Edit Note </button> 
                                        <Popup trigger={<button> Delete Note</button>} position={"right center"}> 
                                        <div> Are you sure you want to delete me?  <div>
                                            <button onClick={() => deleteProjectNote(note.id)
                                            .then(() => getProjectNotes(project.id).then(data => setNotes(data)))}>Delete</button></div> </div>
                                        </Popup> 
                                        </div>
                                    </div>
                                </div>
                            </div>
                        })
                    }
                </div>
                : ""
            }
        </div>
    </article>
}


