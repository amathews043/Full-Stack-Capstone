import React, { useEffect, useState } from "react"
import { getPosts } from "../../managers/PostManager.js"
import { useNavigate, Link } from "react-router-dom"

import "./post.css"

export const PostList = () => {
    const [posts, setPosts] = useState([])
    const navigate = useNavigate()
    const user = localStorage.getItem('user_id')

    useEffect(() => {
        getPosts().then(data => setPosts(data))
    }, [])

    const filteredPosts = posts.filter(post => post.user !== parseInt(user))

    // TODO: make the title clickable to go to the project page

    return (
        <article>
            {
                filteredPosts.map((post) => {
                    if(post.image ){
                        return <div class="w-50 p-3 mx-auto p-2 shadow p-3 mb-5 bg-body-tertiary rounded ">
                            <div class="card text-center " key={post.id}>
                                <img src={post.image} class="card-img-top" alt="..."/>
                                <div class="card-body">
                                    <h5 class="card-title">{post.project_name} by {post.creator_name}</h5>
                                    <p class="card-text">{post.post}</p>
                                    <div class="card-footer tags"><small class="text-body-secondary"> <p>Tags: </p>
                                    {
                                        post.tags.map((tag) => {
                                            return <aside className="inline"> <li> {tag.tag} </li></aside>
                                        })
                                    }
                                    </small></div>
                                </div>
                            </div>
                        </div>
                    } else {
                        return <div class="w-50 p-3 mx-auto p-2 shadow p-3 mb-5 bg-body-tertiary rounded ">
                        <div class="card text-center " key={post.id}>
                            <div class="card-body">
                                <h5 class="card-title">{post.project_name} by {post.creator_name}</h5>
                                <p class="card-text">{post.post}</p>
                            </div>
                        </div>
                    </div>
                    }
                })
            }
        </article>
    )
}