import React, { useEffect, useState } from "react"
import { getPosts } from "../../managers/PostManager.js"
import { useNavigate, Link } from "react-router-dom"

export const PostList = () => {
    const [posts, setPosts] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        getPosts().then(data => setPosts(data))
    }, [])

    return (
        <article>
            {
                posts.map(post => {
                    return <section> 
                        <h3> {post.post}</h3>
                    </section>
                })
            }
        </article>
    )
}