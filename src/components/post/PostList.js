import React, { useEffect, useState } from "react"
import { getPosts } from "../../managers/PostManager.js"
import { Link } from "react-router-dom"
import { NewPostForm } from "../form/NewPostForm.js"

import "./post.css"

export const PostList = () => {
    const [posts, setPosts] = useState([])
    const user = localStorage.getItem('user_id')

    useEffect(() => {
        getPosts().then(data => setPosts(data))
    }, [])

    const filteredPosts = posts.filter(post => post.user !== parseInt(user))

    return (
        <article>
            <NewPostForm/>
            <h2 className="text-center"> See What Other Crafters are Making</h2>
            {
                filteredPosts.map((post) => {
                    if(post.image ){
                        return <div className="w-50 p-3 mx-auto p-2 shadow p-3 mb-5 bg-body-tertiary rounded " key={post.id}>
                            <div className="card text-center ">
                                <img src={post.image} className="card-img-top" alt={post.project_name}/>
                                <div className="card-body">
                                    <h5 className="card-title"><Link to={`projectDetails/${post.project}`} >{post.project_name} by {post.creator_name}</Link></h5>
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
                                <h5 className="card-title"><Link to={`projectDetails/${post.project}`}>{post.project_name} by {post.creator_name}</Link></h5>
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
    )
}