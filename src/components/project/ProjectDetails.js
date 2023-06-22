import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom"
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


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
    const [openDeleteProjectPopup, setOpenDeleteProjectPopup] = useState(false);
    const [openDeleteNotePopup, setOpenDeleteNotePopup] = useState(false)
    const [openDeletePostPopup, setOpenDeletePostPopup] = useState(false)

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

    const handleClickOpenDeleteProjectPopup = () => {
        setOpenDeleteProjectPopup(true);
    };

    const handleCloseDeleteProjectPopup = () => {
        setOpenDeleteProjectPopup(false);
    };

    const handleClickOpenDeleteNotePopup = () => {
        setOpenDeleteNotePopup(true);
    };

    const handleCloseDeleteNotePopup = () => {
        setOpenDeleteNotePopup(false);
    };

    const deleteNote = (noteId) => {
        deleteProjectNote(noteId)
            .then(() => getProjectNotes(project.id).then(data => setNotes(data)))
        handleCloseDeleteNotePopup()
    }

    const handleClickOpenDeletePostPopup = () => {
        setOpenDeletePostPopup(true);
    };

    const handleCloseDeletePostPopup = () => {
        setOpenDeletePostPopup(false);
    };

    const deleteCurrentPost = (postId) => {
        deletePost(postId)
            .then(() => getProjectPosts(postId).then(data => setPosts(data)))
        handleCloseDeletePostPopup()
    }

    return <Container maxWidth="sm">
        <Box className="text-center">
            <h2 className="text-center">{project.name} by {project.creator_name}</h2>
            <p>{project.description}</p>
            {project.pattern_url ? <Button sx={{ bgcolor: "#94a6c7" }} variant="contained" className="button is-link" type="button">
                <Link to={project.pattern_url} className="link" target="_blank" rel="noreferrer noopener" > Link to Pattern </Link></Button> : ""}
            <Stack spacing={4}>
                {
                    project.user_id === user ? <div className="margin-bottom-and-top-20px"> <Button variant="contained" onClick={() => navigate(`/editProject/${project.id}`)}>Edit Project</Button> </div>
                        : ""
                }
                <h4 className="text-center">This Project Was Inspired By:</h4>


                {
                    project.inspirations?.map((inspiration) => {
                        return <div className="margin-bottom-and-top-20px"> <Button variant="contained" className="text-center" onClick={() => navigate(`/projectDetails/${inspiration.id}`)} key={inspiration.id} > {inspiration.name} </Button>
                        </div>
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
                                                <div className="margin-bottom-and-top-20px">
                                                    <Button variant="contained" onClick={handleClickOpenDeletePostPopup}>
                                                        Delete Post
                                                    </Button>
                                                </div>
                                                <Dialog
                                                    open={openDeletePostPopup}
                                                    onClose={handleCloseDeletePostPopup}
                                                    aria-labelledby="alert-dialog-title"
                                                    aria-describedby="alert-dialog-description">
                                                    <DialogTitle id="alert-dialog-title">
                                                        {"Delete Post?"}
                                                    </DialogTitle>
                                                    <DialogContent>
                                                        <DialogContentText id="alert-dialog-description">
                                                            Are you sure you want to delete me? This cannot be undone.
                                                        </DialogContentText>
                                                    </DialogContent>
                                                    <DialogActions>
                                                        <Button variant="contained" onClick={() => deleteCurrentPost(post.id)}>Delete Post</Button>
                                                        <Button variant="contained" onClick={handleCloseDeletePostPopup} autoFocus>
                                                            Cancel
                                                        </Button>
                                                    </DialogActions>
                                                </Dialog>

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
                                            <div className="text-center">
                                                <Box>
                                                    <Stack direction="row" spacing={2} justifyContent='center'>
                                                        <Button variant="contained" onClick={() => {
                                                            navigate(`/editNote/${note.id}`)
                                                        }}
                                                        > Edit Note </Button>
                                                        <Button variant="contained" onClick={handleClickOpenDeleteNotePopup}>
                                                            Delete Note
                                                        </Button>
                                                    </Stack>
                                                </Box>
                                                <Dialog
                                                    open={openDeleteNotePopup}
                                                    onClose={handleCloseDeleteNotePopup}
                                                    aria-labelledby="alert-dialog-title"
                                                    aria-describedby="alert-dialog-description">
                                                    <DialogTitle id="alert-dialog-title">
                                                        {"Delete Note?"}
                                                    </DialogTitle>
                                                    <DialogContent>
                                                        <DialogContentText id="alert-dialog-description">
                                                            Are you sure you want to delete me? This cannot be undone.
                                                        </DialogContentText>
                                                    </DialogContent>
                                                    <DialogActions>
                                                        <Button variant="contained" onClick={() => deleteNote(note.id)}>Delete Note</Button>
                                                        <Button variant="contained" onClick={handleCloseDeleteNotePopup} autoFocus>
                                                            Cancel
                                                        </Button>
                                                    </DialogActions>
                                                </Dialog>

                                            </div>
                                        </CardContent>
                                    </Card>
                                })
                            }
                        </Stack>
                        <div className="margin-bottom-and-top-20px">
                            <Button variant="contained" onClick={handleClickOpenDeleteProjectPopup}>
                                Delete Project
                            </Button>
                        </div>
                        <Dialog
                            open={openDeleteProjectPopup}
                            onClose={handleCloseDeleteProjectPopup}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description">
                            <DialogTitle id="alert-dialog-title">
                                {"Delete Project?"}
                            </DialogTitle>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                    Are you sure you want to delete me? This cannot be undone. Remember you can edit the project details
                                    (including visibility) with the button on the top of the page
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button variant="contained" onClick={() => deleteProject(project_id)
                                    .then(() => navigate("/projectList"))}>Delete Project</Button>
                                <Button variant="contained" onClick={handleCloseDeleteProjectPopup} autoFocus>
                                    Cancel
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </div>
                        : ""
                }
            </Stack>
        </Box>
    </Container>
}


