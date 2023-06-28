import { useState, useEffect } from "react"
import { getTags, getCurrentPost, editPost, autofillPost } from "../../managers/PostManager"
import { getMyProjects } from "../../managers/ProjectManager"
import "../post/post.css"
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
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';



export const EditPostForm = ({ postId, updatePostCallback }) => {
    const [tags, setTags] = useState([])
    const [myProjects, setMyProjects] = useState([])
    const [autofillLoading, setAutofillLoading] = useState(false)
    const [postText, setPostText] = useState("")
    const [postTags, setPostTags] = useState([])
    const [postProject, setPostProject] = useState("")
    const [postImage, setPostImage] = useState("")
    const [errorMessage, setErrorMessage] = useState("")

    const [formShown, setForm] = useState(false)

    useEffect(() => {
        getCurrentPost(postId).then((data) => setPostText(data.post))

    }, [postId])

    useEffect(() => {
        getCurrentPost(postId).then((data) => setPostTags(data.tags.map(tag => tag.id)))
    }, [postId])

    useEffect(() => {
        getCurrentPost(postId).then(data => setPostProject(data.project))
    }, [postId])

    useEffect(() => {
        getCurrentPost(postId).then(data => setPostImage(data.image))
    }, [postId])

    useEffect(() => {
        getTags().then(data => setTags(data))
    }, [])

    const submit = (evt) => {
        evt.preventDefault()

        const post = {
            post: postText,
            tags: postTags,
            project: postProject,
            image: postImage,
            id: postId
        }
        if (!post.post || post.tags === [] || !post.project) {
            setErrorMessage("Please Complete All Required Fields")
        } else {
            editPost(post).then(() => {
                updatePostCallback(post)
                setForm(!formShown)
            })
        }
    };

    useEffect(() => {
        getMyProjects().then(data => setMyProjects(data))
    }, [])

    const setImageURL = (url) => {
        setPostImage(url)
    }


    return (
        <Container maxWidth="sm">
        <Box sx={{ minWidth: 120 }} className="text-center">
            <Button size='large' variant="filledTonal" type="button" className="text-center toggle post-list-header underline" onClick={() => { setForm(!formShown) }}> Edit Post</Button>
            {
                formShown ?
                    <form justifyContent="center" onSubmit={submit}>
                        <p className="alert">{errorMessage}</p>
                        <Stack spacing={2} sx={{ width: 550 }}>
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
                            <div>
                            <Stack justifyContent="center" direction="row" spacing={2}>
                            <Button variant="contained" type="submit" className="post-list-header"> Submit</Button>
                            <Button variant="contained" type="button" className="ost-list-header" onClick={() => setForm(!formShown)}> Cancel</Button>
                            </Stack>
                            </div>
                        </Stack>
                    </form>
                    :
                    ""
            }
        </Box>
        </Container>
    );

}