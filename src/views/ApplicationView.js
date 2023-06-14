import { Route, Routes } from "react-router-dom"
import { Login } from "../components/auth/Login"
import { Register } from "../components/auth/Register"
import { Authorized } from "./Authorized"
import { PostList } from "../components/post/PostList"
import { ProjectList } from "../components/project/ProjectList"
import { ProjectForm } from "../components/form/ProjectForm"
import { ProjectDetails } from "../components/project/ProjectDetails"
import { EditNote } from "../components/note/EditNote"



export const ApplicationView = () => {
    return <>
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<Authorized />}>
                <Route path="/" element={<PostList/>}/>
                <Route path="projectList" element={<ProjectList/>}/>
                <Route path="projectForm" element={<ProjectForm/>}/>
                <Route path="projectDetails/:project_id" element={<ProjectDetails/>}/>
                <Route path="editNote/:note_id" element={<EditNote/>}/>
                
            </Route>
        </Routes>
    </>
}