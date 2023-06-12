import { Route, Routes } from "react-router-dom"
import { Login } from "../components/auth/Login"
import { Register } from "../components/auth/Register"
import { Authorized } from "./Authorized"
import { PostList } from "../components/post/PostList"
import { ProjectList } from "../components/project/ProjectList"
import { useState } from 'react';



export const ApplicationView = () => {
    return <>
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<Authorized />}>
                <Route path="/" element={<PostList/>}/>
                <Route path="projectList" element={<ProjectList/>}/>
                
            </Route>
        </Routes>
    </>
}