import React, { useEffect, useState } from "react"
import { getOtherUserPosts } from "../../managers/PostManager.js"
import { PostDetails } from "./PostDetails.js"
import { NewPostForm } from "../form/NewPostForm.js"
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';


import "./post.css"

export const PostList = () => {
    const [posts, setPosts] = useState([])

    const refreshPosts = () => {
        getOtherUserPosts().then(data => setPosts(data.reverse()))
    }

    useEffect(() => {
        refreshPosts()
    }, [])

    return (
        <article>
            <h1 className="text-center">Handmade Hangout</h1>
            <NewPostForm />
            <Container maxWidth="md">
                <h2 className="text-center"> See What Other Crafters are Making</h2>
                <Stack spacing={4}>
                    {
                        posts.map((post) => {
                            return <PostDetails refreshPosts={refreshPosts} post={post} key={post.id} />
                        })
                    }
                </Stack>
            </Container>
        </article>
    )
}