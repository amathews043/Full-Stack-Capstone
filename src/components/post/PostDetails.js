import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useNavigate } from "react-router-dom"
import React, { useState } from "react"
import { newComment, deleteComment } from '../../managers/PostManager';

export const PostDetails = ({ refreshPosts, post }) => {
    const navigate = useNavigate()
    const [comment, setComment] = useState('')
    const user_id = parseInt(localStorage.getItem('user_id'))

    const handleSubmitComment = (postId, event) => {
        event.preventDefault()
        const commentToSubmit = {
            "message": comment,
            "post": postId
        }

        newComment(commentToSubmit).then(() => {
            setComment('')
            refreshPosts()
        })
    }

    const handleDeleteCommentButton = (commentId) => {
        deleteComment(commentId).then(() => refreshPosts())
    }


    return <Box> <Card key={post.id} sx={{ maxWidth: 1000 }} >
        <CardContent>
            {
                post.image ?
                    <CardMedia
                        sx={{ height: 500 }}
                        image={post.image}
                        title={post.project_name}
                    />
                    :
                    <></>
            }
            <Typography gutterBottom variant="h5" component="div">
                <div className="margin-bottom-and-top-20px">
                    <Stack direction="row" spacing={2}>
                        <Button variant="contained" onClick={() => navigate(`projectDetails/${post.project}`)}>
                            {post.project_name}
                        </Button>
                        <Button variant="contained" onClick={() => navigate(`/${post.user}/profile`)}>by {post.creator_name}</Button>
                    </Stack>
                </div>
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
        {
            (post.post_comments.length >= 1) ?
                post.post_comments.map((comment) => {
                    return <Card key={comment.id} className="margin-top-5px" sx={{ maxWidth: 500 }}>
                        <CardContent>
                            <div className="margin-top-5px">
                                <Chip label={comment.sender_name} onClick={() => navigate((`/${comment.sender}/profile`))} />
                            </div>
                            {comment.message}
                            {
                                comment.sender === user_id ?
                                <div className='margin-top-5px'>
                                    <Button onClick={() => handleDeleteCommentButton(comment.id)} size='large' variant="filledTonal">Delete Comment</Button>
                                </div>
                                    : ""
                            }
                            </CardContent>
                    </Card>
                })

                : ""
        }
        <Stack direction="row" spacing={2}>
            <form onSubmit={(event)=> handleSubmitComment(post.id, event)}>
            <TextField
                placeholder="Add a Comment"
                minRows={3}
                endDecorator={
                    <Box
                        sx={{
                            display: 'flex',
                            gap: 'var(--Textarea-paddingBlock)',
                            pt: 'var(--Textarea-paddingBlock)',
                            borderTop: '1px solid',
                            borderColor: 'divider',
                            flex: 'auto',
                        }}
                    >

                    </Box>
                }
                onChange={(evt) => {
                    setComment(evt.target.value)
                }}
                value={comment}
                sx={{
                    minWidth: 300,
                }}
            />
            <Button className='underline' size='large' type="submit" variant="filledTonal" >Submit</Button>
        </form>
        </Stack>
    </Box>
}