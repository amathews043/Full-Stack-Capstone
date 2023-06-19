import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom"
import Popup from 'reactjs-popup';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Container from '@mui/material/Container';

import { getCurrentProject, getProjectNotes, deleteProjectNote, deleteProject } from "../../managers/ProjectManager";
import { getProjectPosts, deletePost } from "../../managers/PostManager";
import { Note } from "../note/Note";
import "./project.css"
import { EditPostForm } from "../form/EditPostForm";

export const ProjectDetails = () => {
    const navigate = useNavigate()
    const { project_id } = useParams()
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
            setPosts(data.reverse())
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

    const updateProjectPosts = (projectId) => {
        getProjectPosts(projectId).then((data) => {
            setPosts(data);
        });
    };

    return <Container>
        <div className="center">
            <h2 >{project.name} by {project.creator_name}</h2>
            <p>{project.description}</p>
            {project.pattern_url ? <Button className="button is-link" type="button"><Link to={project.pattern_url} className="link" target="_blank" rel="noreferrer noopener" > Link to Pattern </Link></Button> : ""}

            {
                project.user_id === user ? <Button onClick={() => navigate(`/editProject/${project.id}`)}>Edit Project</Button>
                    : ""
            }

            <h4>This Project Was Inspired By:</h4>

            {
                project.inspirations?.map((inspiration) => {
                    return <Link to={`/projectDetails/${inspiration.id}`} key={inspiration.id} ><li> {inspiration.name} </li> </Link>
                })
            }

            {
                posts.map((post) => {
                    return <Card key={post.id}>
                        <CardContent>
                            {
                                post.image ?
                                    <CardMedia
                                        sx={{ height: 300 }}
                                        image={post.image}
                                        title={post.project_name}
                                    />
                                    :
                                    <></>
                            }
                            <div className="card-body">
                                <h5 className="card-title">{post.project_name} by {post.creator_name}</h5>
                                <p className="card-text">{post.post}</p>
                                {
                                    post.user === user ? <div>
                                        <EditPostForm postId={post.id} projectId={post.project} updateProjectPosts={updateProjectPosts} />
                                        <Popup trigger={<Button> Delete Post</Button>} position={"right center"}>
                                            <div> Are you sure you want to delete me?  <div>
                                                <Button onClick={() => deletePost(post.id)
                                                    .then(() => getProjectPosts(project.id).then(data => setPosts(data)))}>Delete</Button></div> </div>
                                        </Popup>
                                    </div>
                                        : ""
                                }
                                <div className="card-footer tags"><small className="text-body-secondary"> <p>Tags: </p>
                                    {
                                        post.tags.map((tag) => {
                                            return <aside key={tag.id} className="inline"> <li> {tag.tag} </li></aside>
                                        })
                                    }
                                </small></div>
                            </div>
                        </CardContent>
                    </Card>
                })
            }

            {
                project.user_id === user ? <div>
                    <h3>Private Notes</h3>
                    <Note projectId={project.id} updateProjectNotes={updateProjectNotes} />
                    {
                        notes?.map((note) => {
                            return <div className="w-50 p-3 mx-auto p-2 shadow p-3 mb-5 bg-body-tertiary rounded" key={note.id}>
                                <div className="card text-center " key={note.id}>
                                    <div className="card-body">
                                        <p className="card-text">{note.note}</p>
                                        <div><Button onClick={() => {
                                            navigate(`/editNote/${note.id}`)
                                        }}
                                        > Edit Note </Button>
                                            <Popup trigger={<Button> Delete Note</Button>} position={"right center"}>
                                                <div> Are you sure you want to delete me? This cannot be undone <div>
                                                    <Button onClick={() => deleteProjectNote(note.id)
                                                        .then(() => getProjectNotes(project.id).then(data => setNotes(data)))}>Delete</Button></div> </div>
                                            </Popup>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        })
                    }
                    <Popup trigger={<Button> Delete Project</Button>} position={"right center"}>
                        <div> Are you sure you want to delete me? This cannot be undone. Remember you can edit the project details (including visibility) with the button on the top of the page
                            <div>
                                <Button onClick={() => deleteProject(project_id)
                                    .then(() => navigate("/projectList"))}>Delete</Button>
                            </div>
                        </div>
                    </Popup>
                </div>
                    : ""
            }
        </div>
    </Container>
}


