import React from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [error, setError] = React.useState('');

    async function onSubmit(e) {
        e.preventDefault();

        const user = {
            username,
            password
        }

        const postResult = await axios.post('http://localhost:5000/users/login', user)
        .then(res => {
            console.log(res.data);
            return res.data;
        })
        .catch(err => {
            console.log(err.response.data);
            return new Error(err.response.data);
        })

        if (postResult instanceof Error) {
            return onError(postResult.message);
        }

        console.log(`Successful Login as ${user.username}`);
        navigate("/", {state: {user: user.username, message: postResult.message, token : postResult.token}})
    }

    function onChangeUsername(e) {
        setUsername(e.target.value);
    }

    function onChangePassword(e) {
        setPassword(e.target.value);
    }

    function onError(message) {
        setError(message);
    }

    return(
        <div>
            <h3> Login </h3>
            { error && <div className='alert alert-danger' role='alert'> {error} </div> }
            <form onSubmit={onSubmit} >
                <div className="form-group">
                    <label>Username: </label>
                    <input type='text' required className='form-control' value={username} onChange={onChangeUsername} />
                </div>
                <br />
                <div className="form-group">
                    <label>Password: </label>
                    <input type='password' required className='form-control' value={password} onChange={onChangePassword} />
                </div>
                <br />
                <div className="d-md-flex">
                    <div className="form-group">
                        <input type='submit' className='btn btn-primary mr-2' value="Login" />
                    </div>
                    <button className='btn btn-primary ms-2'><Link style={{color:"white", textDecoration:"none"}} to="/newuser">Sign Up</Link></button>
                </div>
            </form>
        </div>
    )
}

export default Login;