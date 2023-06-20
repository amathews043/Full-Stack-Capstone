import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom"
import Popup from 'reactjs-popup';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';

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
            setPosts(data.reverse());
        });
    };

    return <Container maxWidth="sm">
        <Box className="text-center">
            <h2 className="text-center">{project.name} by {project.creator_name}</h2>
            <p>{project.description}</p>
            {project.pattern_url ? <Button className="button is-link" type="button"><Link to={project.pattern_url} className="link" target="_blank" rel="noreferrer noopener" > Link to Pattern </Link></Button> : ""}
            <Stack spacing={4}>
                {
                    project.user_id === user ? <Button onClick={() => navigate(`/editProject/${project.id}`)}>Edit Project</Button>
                        : ""
                }
                <h4 className="text-center">This Project Was Inspired By:</h4>


                {
                    project.inspirations?.map((inspiration) => {
                        return <Link className="text-center" to={`/projectDetails/${inspiration.id}`} key={inspiration.id} ><li> {inspiration.name} </li> </Link>
                    })
                }
                <Stack spacing={10}>
                    {
                        posts.map((post) => {
                            return <Card key={post.id} sx={{ maxWidth: 800 }}>
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
                                    <Typography gutterBottom variant="h5" component="div">
                                        <h5 className="card-title">{post.project_name} by {post.creator_name}</h5>
                                    </Typography>
                                    <Typography gutterBottom variant="h10" component="div">
                                        <p className="card-text">{post.post}</p>
                                    </Typography>
                                    {
                                        post.user === user ? <div>
                                            <EditPostForm postId={post.id} projectId={post.project} updateProjectPosts={updateProjectPosts} />
                                            <Typography >
                                                <Popup trigger={<Button > Delete Post</Button>} position={"right center"}>
                                                    <div> Are you sure you want to delete me?  <div>
                                                        <Button onClick={() => deletePost(post.id)
                                                            .then(() => getProjectPosts(project.id).then(data => setPosts(data)))}>Delete</Button></div> </div>
                                                </Popup>
                                            </Typography>
                                        </div>
                                            : ""
                                    }
                                    <Stack direction="row" spacing={2}>
                                        {
                                            post.tags.map((tag) => {
                                                return <Chip key={tag.id} className="inline" label={tag.tag} />
                                            })
                                        }
                                    </Stack>

                                </CardContent>
                            </Card>
                        })
                    }
                </Stack>

                {
                    project.user_id === user ? <div>
                        <h3>Private Notes</h3>
                        <Note projectId={project.id} updateProjectNotes={updateProjectNotes} />
                        <Stack spacing={4}>
                            {
                                notes?.map((note) => {
                                    return <Card key={note.id} sx={{ maxWidth: 800 }}>
                                        <CardContent>
                                        <Typography gutterBottom variant="h10" component="div">
                                            <p className="card-text">{note.note}</p>
                                        </Typography>
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
                                        </CardContent>
                                    </Card>
                                })
                            }
                        </Stack>
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
            </Stack>
        </Box>
    </Container>
}


