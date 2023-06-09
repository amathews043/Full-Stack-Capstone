import { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { getTags } from "../../managers/PostManager"
import { getMyProjects } from "../../managers/ProjectManager"
import { CloudinaryContext, Image } from 'cloudinary-react'
import { newPost } from "../../managers/PostManager"
import "../post/post.css"

export const NewPostForm = () => {
    const navigate = useNavigate()
    const [tags, setTags] = useState([])
    const [myProjects, setMyProjects] = useState([])
    const [post, setPost] = useState({
        post: "",
        tags: [],
        project: "",
        image: ""
    })

    useEffect(() => {
        getTags().then(data => setTags(data))
    }, [])

    useEffect(() => {
        getMyProjects().then(data => setMyProjects(data))
    }, [])

    const widgetRef = useRef();

    useEffect(() => {
        widgetRef.current = window.cloudinary.createUploadWidget(
        {
            cloudName: 'duy4yg4hz',
            uploadPreset: 'tdkborvg'
        },
        (error, result) => {
            if (result.event === 'success') {
                const copy = {...post}
                copy.image = result.info.secure_url
                setPost(copy)
            }
        }
        );
    }, []);

    return (
        <form>
        <fieldset>
            <div> 
                <input required autoFocus
                type="text"
                className="form-control input"
                placeholder="What would you like to say about this project?"
                value={post.post}
                onChange={
                    (evt => {
                        const copy ={...post}
                        copy.post = evt.target.value
                        setPost(copy)
                    })
                }
                >
                </input>
            </div>
        </fieldset>
        <fieldset>
            <div className="form-group field"> 
            <label className="label"htmlFor="location">Project:* </label>
            <div className="control">
                <div className="select">
                <select value={post.project} onChange={
                    (evt) => {
                        const copy = {...post}
                        copy.project = parseInt(evt.target.value)
                        setPost(copy)
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
            <label className="label"htmlFor="location">Tags:* </label>
            <div className="control">
                <div className="select">
                <select value={post.tags} multiple={true} onChange={
                    (evt) => {
                        const copy = {...post}
                        let newTag = parseInt(evt.target.value)
                        if(copy.tags.includes(newTag)){
                            let index = copy.tags.indexOf(newTag)
                            copy.tags.splice(index, 1)
                        }else
                        copy.tags.push(newTag)
                        setPost(copy)
                    }
                }> 
                <option key="0" value="0"> Please Choose a Level</option>
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
        <div >
            <button type="button" id="addPicture" className="button is-link post-list-header" onClick={() => widgetRef.current.open()}>
            Upload a Picture of the Project
            </button>

        </div>
        <button onClick={evt => {
            evt.preventDefault()
            newPost(post)
            .then(() => navigate("/"))
        }} className="post-list-header"> Submit</button>
        </form>
    );
    
}