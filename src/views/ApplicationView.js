import { Route, Routes } from "react-router-dom"
import { Login } from "../components/auth/Login"
import { Register } from "../components/auth/Register"
import { Authorized } from "./Authorized"
import { PostList } from "../components/post/PostList"
import { ProjectList } from "../components/project/ProjectList"
import { NewProjectForm } from "../components/form/NewProjectForm"
import { ProjectDetails } from "../components/project/ProjectDetails"
import { EditNote } from "../components/note/EditNote"
import { EditProjectForm } from "../components/form/EditProjectForm"
import { UserProfile } from "../components/profile/UserProfile"



export const ApplicationView = () => {
    return <>
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<Authorized />}>
                <Route path="/" element={<PostList/>}/>
                <Route path="projectList" element={<ProjectList/>}/>
                <Route path="projectForm" element={<NewProjectForm/>}/>
                <Route path="projectDetails/:project_id" element={<ProjectDetails/>}/>
                <Route path="editNote/:note_id" element={<EditNote/>}/>
                <Route path="editProject/:project_id" element={<EditProjectForm/>}/>
                <Route path="myProfile" element={<UserProfile/>}/>
                
            </Route>
        </Routes>
    </>
}