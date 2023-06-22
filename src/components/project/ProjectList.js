import React, { useEffect, useState } from "react"
import { getMyProjects } from "../../managers/ProjectManager.js"
import { useNavigate } from "react-router-dom"
import "./project.css"
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

export const ProjectList = () => {
    const [projects, setProjects] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        getMyProjects().then(data => setProjects(data))
    },
    [])

    return (
        <Container maxWidth="sm">
            <div className="text-center margin-bottom-and-top-20px">
            <Button variant="contained" onClick={() => navigate("/ProjectForm")} >Start a New Project</Button>
            </div>
            <Stack spacing={4}>
            {
                projects.map((project) => {
                    return <Card key={project.id} sx={{ maxWidth: 800 }}>
                        <CardContent>
                            {
                                project.preview_image ? 
                                <CardMedia
                                sx={{ height: 800 }}
                                image={project.preview_image}
                                title={project.name}
                            />
                            : <></>
                            }
                    
                                    <Typography gutterBottom variant="h5" component="div">
                                    <Button variant="contained" onClick={() => navigate(`/projectDetails/${project.id}`)}>
                                        {project.name}
                                    </Button>
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                {project.description}
                                </Typography>
                            </CardContent>
                        </Card>
                
                })
            }
            </Stack>
        </Container> 
    )

}
