import React, { useRef } from "react"
import { Link, useNavigate } from "react-router-dom"
import { registerUser } from "../../managers/AuthManager"
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import FormControl from '@mui/material/FormControl';
import { TextField } from "@mui/material";
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

export const Register = () => {
    const firstName = useRef()
    const lastName = useRef()
    const username = useRef()
    const bio = useRef()
    const password = useRef()
    const verifyPassword = useRef()
    const passwordDialog = useRef()
    const navigate = useNavigate()

    const handleRegister = (e) => {
        e.preventDefault()

        if (password.current.value === verifyPassword.current.value) {
            const newUser = {
                "username": username.current.value,
                "first_name": firstName.current.value,
                "last_name": lastName.current.value,
                "bio": bio.current.value,
                "password": password.current.value
            }

            registerUser(newUser)
                .then(res => {
                    if ("token" in res) {
                        localStorage.setItem("token", res.token)
                        localStorage.setItem("user_id", res.user_id)
                        navigate("/")
                    }
                })
        } else {
            passwordDialog.current.showModal()
        }
    }

    return (
        <Container style={{ textAlign: "center" }}>

            <dialog className="dialog dialog--password" ref={passwordDialog}>
                <div>Passwords do not match</div>
                <Button className="button--close" onClick={e => passwordDialog.current.close()}>Close</Button>
            </dialog>
            <Box>
                <form className="form--login" onSubmit={handleRegister}>
                    <h1 className="h3 mb-3 font-weight-normal">Register an account</h1>
                    <Stack spacing={2} >
                    <FormControl fullWidth>
                        <label htmlFor="firstName"> First Name </label>
                        <TextField inputRef={firstName} type="text" name="firstName" className="form-control" placeholder="First name" required autoFocus />
                    </FormControl>
                    <FormControl fullWidth>
                        <label htmlFor="lastName"> Last Name </label>
                        <TextField inputRef={lastName} type="text" name="lastName" className="form-control" placeholder="Last name" required />
                    </FormControl>
                    <FormControl fullWidth>
                        <label htmlFor="inputUsername">Username</label>
                        <TextField inputRef={username} type="text" name="username" className="form-control" placeholder="Username" required />
                    </FormControl>
                    <FormControl fullWidth>
                        <label htmlFor="inputPassword"> Password </label>
                        <TextField inputRef={password} type="password" name="password" className="form-control" placeholder="Password" required />
                    </FormControl>
                    <FormControl fullWidth>
                        <label htmlFor="verifyPassword"> Verify Password </label>
                        <TextField inputRef={verifyPassword} type="password" name="verifyPassword" className="form-control" placeholder="Verify password" required />
                    </FormControl>
                    <FormControl fullWidth>
                        <label htmlFor="verifyPassword"> Crafter Bio </label>
                        <TextField inputRef={bio} name="bio" className="form-control" placeholder="Let other crafters know a little bit about you..." />
                    </FormControl>
                    <FormControl fullWidth style={{
                        textAlign: "center"
                    }}>
                        <Button className="btn btn-1 btn-sep icon-send" type="submit">Register</Button>
                    </FormControl>
                    </Stack>
                </form>
                <section className="link--register">
                    Already registered? <Link to="/login">Login</Link>
                </section>
            </Box>
        </Container>
    )
}
