import { useState, useEffect } from "react"
import { getTags, getSinglePost, getProjectPosts, deletePost } from "../../managers/PostManager"
import { getMyProjects } from "../../managers/ProjectManager"
import { newPost, autofillPost } from "../../managers/PostManager"
import "../post/post.css"
import { EditPostForm } from "./EditPostForm"

import { UploadWidget } from "./UploadWidget";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { useNavigate } from "react-router-dom"
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


export const NewPostForm = () => {
    const [tags, setTags] = useState([])
    const [myProjects, setMyProjects] = useState([])
    const navigate = useNavigate()

    const [postText, setPostText] = useState("")
    const [postTags, setPostTags] = useState([])
    const [postProject, setPostProject] = useState("")
    const [postImage, setPostImage] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const [autofillLoading, setAutofillLoading] = useState(false)
    const [newPostSaved, setNewPostSaved] = useState(false)
    const [savedPost, setSavedPost] = useState({})
    const [openDeletePostPopup, setOpenDeletePostPopup] = useState(false)

    const handleClickOpenDeletePostPopup = () => {
        setOpenDeletePostPopup(true);
    };

    const handleCloseDeletePostPopup = () => {
        setOpenDeletePostPopup(false);
    };

    const deleteCurrentPost = (postId) => {
        deletePost(postId)
            .then(() => setNewPostSaved(!newPostSaved))
        handleCloseDeletePostPopup()
    }

    const [formShown, setForm] = useState(false)


    const updatePostCallback = (post) => {
        getSinglePost(post.id).then((data) => {
            setSavedPost(data);
        });
    };
    useEffect(() => {
        getTags().then(data => setTags(data))
    }, [])

    const submit = (evt) => {
        evt.preventDefault()

        const post = {
            post: postText,
            tags: postTags,
            project: postProject,
            image: postImage
        }
        if (!post.post || post.tags === [] || !post.project) {
            setErrorMessage("Please Complete All Required Fields")
        } else {
            newPost(post).then((data) => {
                getSinglePost(data.id)
                    .then((data) => {
                        setSavedPost(data)
                        setForm(!formShown)
                        setNewPostSaved(true)
                    })
            })
            setPostText("")
            setPostTags([])
            setPostProject("")
            setPostImage("")
        }
    };

    useEffect(() => {
        getMyProjects().then(data => setMyProjects(data))
    }, [])

    const setImageURL = (url) => {
        setPostImage(url)
    }


    return (<Container maxWidth="md">
        <Box justifyContent="center" className="text-center">
            <div className="margin-bottom-and-top-20px">
                <Button variant="contained" type="button" onClick={() => { setForm(!formShown) }}> Create a New Post</Button>
            </div>
        </Box>
        {
            newPostSaved && !formShown ? <Box sx={{ maxWidth: 1200 }}>
                <h2 className="text-center"> Your New Post</h2>
                <Stack spacing={4}>
                    <Card key={savedPost.id} sx={{ maxWidth: 1200 }} >
                        <CardContent>
                            {
                                savedPost.image ?
                                    <CardMedia
                                        sx={{ height: 800 }}
                                        image={savedPost.image}
                                        title={savedPost.project_name}
                                    />
                                    :
                                    <></>
                            }
                            <Typography gutterBottom variant="h5" component="div">
                                <Button variant="contained" onClick={() => navigate(`projectDetails/${savedPost.project}`)}>
                                    {savedPost.project_name} by {savedPost.creator_name}
                                </Button>
                            </Typography>
                            <Typography gutterBottom variant="h10" component="div">
                                {savedPost.post}
                            </Typography>
                            <Stack direction="row" spacing={2}>
                                {
                                    savedPost?.tags?.map((tag) => {
                                        return <Chip label={tag.tag} size="small" key={tag.id} />
                                    })
                                }
                            </Stack>
                            <EditPostForm postId={savedPost.id} projectId={savedPost.project} updatePostCallback={updatePostCallback} />
                            <Typography >
                                <div className="margin-bottom-and-top-20px text-center">
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
                                        <Button variant="contained" onClick={() => deleteCurrentPost(savedPost.id)}>Delete Post</Button>
                                        <Button variant="contained" onClick={handleCloseDeletePostPopup} autoFocus>
                                            Cancel
                                        </Button>
                                    </DialogActions>
                                </Dialog>

                            </Typography>
                        </CardContent>
                    </Card>
                </Stack>
            </Box>
                : ""
        }
        <Box justifyContent="center" className="text-center">
            {
                formShown ?
                    <form onSubmit={submit}>
                        <p className="alert">{errorMessage}</p>
                        <Stack spacing={2} sx={{ maxWidth: 1200 }}>
                            <FormControl fullWidth>
                                <InputLabel>Please Choose a Project:*</InputLabel>
                                <Select value={postProject} label="Please Choose a Project"
                                    onChange={
                                        (evt) => {
                                            setPostProject(parseInt(evt.target.value))
                                        }
                                    }>
                                    {
                                        myProjects.map((project) => {
                                            return <MenuItem value={project.id} key={project.id} > {project.name}</MenuItem>
                                        })

                                    }

                                </Select>
                            </FormControl>
                            <FormControl>
                                <Autocomplete
                                    multiple
                                    options={tags}
                                    getOptionLabel={(tag) => tag.tag}
                                    renderInput={(params) => <TextField {...params} label="Post Tags" />}
                                    onChange={
                                        (evt, value) => {
                                            const value_list = value.map(value => value.id)
                                            setPostTags(value_list)
                                        }
                                    }
                                />
                            </FormControl>
                            {
                                autofillLoading ? <div> <CircularProgress /> </div> : <div>
                                    <Button variant="contained" type="button" onClick={() => {
                                        if (postTags && postProject) {
                                            setErrorMessage("")
                                            const postForAutofill = {
                                                project: postProject,
                                                tags: postTags
                                            }
                                            setAutofillLoading(true)
                                            autofillPost(postForAutofill).then((data) => {
                                                setPostText(data.message)
                                                setAutofillLoading(false)
                                            })
                                        }
                                        else {
                                            setErrorMessage("Please add Project and Tags to your post")
                                        }
                                    }}>AutoFill Post?</Button>
                                    <FormControl fullWidth>
                                        <TextField required autoFocus
                                            multiline
                                            type="text"
                                            className="form-control input"
                                            placeholder="What would you like to say about this project?"
                                            value={postText}
                                            onChange={
                                                (evt => {
                                                    setPostText(evt.target.value)
                                                })
                                            }
                                        />
                                    </FormControl>
                                </div>
                            }

                            <UploadWidget setImageURL={setImageURL} />
                        </Stack>
                        <div className="margin-bottom-and-top-20px">
                            <Button variant="contained" type="submit" > Submit</Button>
                        </div>
                    </form>
                    :
                    ""
            }
        </Box>
    </Container>
    );

}