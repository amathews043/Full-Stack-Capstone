import { useState, useEffect } from "react"
import { getTags } from "../../managers/PostManager"
import { getMyProjects } from "../../managers/ProjectManager"
import { newPost, autofillPost } from "../../managers/PostManager"
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
import CircularProgress from '@mui/material/CircularProgress';

export const NewPostForm = () => {
    const [tags, setTags] = useState([])
    const [myProjects, setMyProjects] = useState([])

    const [postText, setPostText] = useState("")
    const [postTags, setPostTags] = useState([])
    const [postProject, setPostProject] = useState("")
    const [postImage, setPostImage] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const [autofillLoading, setAutofillLoading] = useState(false)

    const [formShown, setForm] = useState(false)

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
            newPost(post)
            setForm(!formShown)
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


    return (
        <Box sx={{ minWidth: 120 }} className="text-center">
            <div className="margin-bottom-and-top-20px">
                <Button variant="contained" type="button" onClick={() => { setForm(!formShown) }}> Create a New Post</Button>
            </div>
            {
                formShown ?
                    <form onSubmit={submit}>
                        <p className="alert">{errorMessage}</p>
                        <Stack spacing={2} sx={{ maxWidth: 552 }}>
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
    );

}