import React, { useEffect, useState } from "react"
import { getOtherUserPosts, newComment } from "../../managers/PostManager.js"
import { PostDetails } from "./PostDetails.js"
import { useNavigate } from "react-router-dom"
import { NewPostForm } from "../form/NewPostForm.js"
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';



import "./post.css"

export const PostList = () => {
    const [posts, setPosts] = useState([])
    const [comment, setComment] = useState('')
    const navigate = useNavigate()

    const refreshPosts = () => {
        getOtherUserPosts().then(data => setPosts(data.reverse()))
    }

    useEffect(() => {
        refreshPosts()
    }, [])

    const handleSubmitComment = (postId) => {
        const commentToSubmit = {
            "message": comment,
            "post": postId
        }

        newComment(commentToSubmit).then(() => getOtherUserPosts()).then((data) => {
            setComment('')
            setPosts(data.reverse())
        })
    }

    return (
        <article>
            <h1 className="text-center">Handmade Hangout</h1>
            <NewPostForm />
            <Container maxWidth="md">
                <h2 className="text-center"> See What Other Crafters are Making</h2>
                <Stack spacing={4}>
                    {
                        posts.map((post) => {
                            return <PostDetails refreshPosts={refreshPosts} post={post} />
                        })
                    }
                </Stack>
            </Container>
        </article>
    )
}