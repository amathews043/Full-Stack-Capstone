import { useState, useEffect } from "react"
import { getTags, getCurrentPost, editPost, getProjectPosts } from "../../managers/PostManager"
import { getMyProjects } from "../../managers/ProjectManager"
import "../post/post.css"
import { UploadWidget } from "./UploadWidget";


export const EditPostForm = ({postId, projectId, updateProjectPosts}) => {
    const [tags, setTags] = useState([])
    const [myProjects, setMyProjects] = useState([])

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
    },[postId])

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
        if(!post.post || post.tags === [] || !post.project){
            setErrorMessage("Please Complete All Required Fields")
        } else{
            editPost(post).then(() => {updateProjectPosts(post.project)
            setForm(!formShown)})
        }
    };

    useEffect(() => {
        getMyProjects().then(data => setMyProjects(data))
    }, [])

    const setImageURL = (url) => {
        setPostImage(url)
    }


    return (
        <div className="text-center post-list-header">
        <button type="button" className="text-center toggle post-list-header" onClick={() => {setForm(!formShown)}}> Edit Post</button>
        {   
            formShown ? 
            <form onSubmit={submit}>
            <p className="alert">{errorMessage}</p>
            <fieldset>
                <div> 
                    <textarea required autoFocus
                    type="text"
                    className="form-control textarea"
                    placeholder="What would you like to say about this project?"
                    value={postText}
                    onChange={
                        (evt => {
                            setPostText(evt.target.value)
                        })
                    }
                    >
                    </textarea>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group field"> 
                <label className="label"htmlFor="project">Project:* </label>
                <div className="control">
                    <div className="select">
                    <select value={postProject} onChange={
                        (evt) => {
                            setPostProject(parseInt(evt.target.value))
                        }
                    }> 
                    <option key="0" value="0"> Please Choose a Project</option>
                    {
                    myProjects.map((project) => {
                        return <option value={project.id} key={project.id} > {project.name}</option>
                    })

                    }
                    
                    </select>
                    
                    </div>

                </div>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group field"> 
                <label className="label"htmlFor="tags">Tags:* </label>
                <div className="control">
                    <div className="select">
                    <select value={postTags} multiple={true} onChange={
                        (evt) => {
                            let newTag = parseInt(evt.target.value)
                            if(postTags.includes(newTag)){
                                let index = postTags.indexOf(newTag)
                                postTags.splice(index, 1)
                            }else
                            postTags.push(newTag)
                        }
                    }> 
                    <option key="0" value="0"> Choose some Tags For Your Post</option>
                    {
                    tags.map((tag) => {
                        return <option value={tag.id} key={tag.id} > {tag.tag}</option>
                    })

                    }
                    
                    </select>
                    
                    </div>

                </div>
                </div>
            </fieldset>
            
            <UploadWidget setImageURL={setImageURL}/>

            <button type="submit" className="post-list-header"> Submit</button>
            <button type="button" className="ost-list-header" onClick={() => setForm(!formShown)}> Cancel</button>
            </form>
            : 
            ""
        }
        </div>
    );
    
}