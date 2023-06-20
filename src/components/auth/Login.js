import React, { useRef } from "react"
import { Link, useNavigate } from "react-router-dom"
import { loginUser } from "../../managers/AuthManager"
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import FormControl from '@mui/material/FormControl';
import { TextField } from "@mui/material";
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';


export const Login = () => {
    const username = useRef()
    const password = useRef()
    const invalidDialog = useRef()
    const navigate = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault()
        const user = {
            username: username.current.value,
            password: password.current.value
        }
        loginUser(user)
            .then(res => {
                if ("valid" in res && res.valid && "token" in res) {
                    localStorage.setItem("token", res.token)
                    localStorage.setItem("user_id", res.user_id)
                    navigate("/")
                }
                else {
                    invalidDialog.current.showModal()
                }
            })
    }

    return (
        <Container maxWidth="sm">
            <dialog className="dialog dialog--auth" ref={invalidDialog}>
                <div>Username or password was not valid.</div>
                <Button className="button--close" onClick={e => invalidDialog.current.close()}>Close</Button>
            </dialog>
            <Box>
                <form className="form--login" onSubmit={handleLogin}>
                    <h1>Craft Site</h1>
                    <h2>Please sign in</h2>
                    <Stack spacing={2} sx={{ width: 552 }}>
                        <FormControl fullWidth>
                            <label htmlFor="inputUsername"> Username </label>
                            <TextField inputRef={username} type="username" id="username" className="form-control" placeholder="Username" required autoFocus />
                        </FormControl>
                        <FormControl fullWidth>
                            <label htmlFor="inputPassword"> Password </label>
                            <TextField inputRef={password} type="password" id="password" className="form-control" placeholder="Password" required />
                        </FormControl>
                        <FormControl style={{
                            textAlign: "center"
                        }}>
                            <Button className="btn btn-1 btn-sep icon-send" type="submit">Sign In</Button>
                        </FormControl>
                    </Stack>
                </form>
            </Box>
            <section className="link--register">
                <Link to="/register">Not a member yet?</Link>
            </section>
        </Container>
    )
}
