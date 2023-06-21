import React, { useEffect, useState } from "react"
import { getOtherUserPosts } from "../../managers/PostManager.js"
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

import "./post.css"

export const PostList = () => {
    const [posts, setPosts] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        getOtherUserPosts().then(data => setPosts(data))
    }, [])

    return (
        <Container maxWidth="sm">
            <NewPostForm />
            <h2 className="text-center"> See What Other Crafters are Making</h2>
            <Stack spacing={4}>
                {
                    posts.map((post) => {
                        return <Card key={post.id} sx={{ maxWidth: 800 }}>
                            <CardContent>
                                {
                                    post.image ?
                                        <CardMedia
                                            sx={{ height: 300 }}
                                            image={post.image}
                                            title={post.project_name}
                                        />
                                        :
                                        <></>
                                }
                                <Typography gutterBottom variant="h5" component="div">
                                    <Button onClick={() => navigate(`projectDetails/${post.project}`)}>
                                        {post.project_name} by {post.creator_name}
                                    </Button>
                                </Typography>
                                <Typography gutterBottom variant="h10" component="div">
                                    {post.post}
                                </Typography>
                                <Stack direction="row" spacing={2}>
                                    {
                                        post.tags.map((tag) => {
                                            return <Chip label={tag.tag} size="small" key={tag.id} />
                                        })
                                    }
                                </Stack>
                            </CardContent>
                        </Card>

                    })
                }
            </Stack>
        </Container>
    )
}