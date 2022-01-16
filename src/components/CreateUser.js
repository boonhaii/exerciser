import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreateUser(props) {
    const navigate = useNavigate();
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [error, setError] = React.useState('');

    function onChangeUsername(e) {
        setUsername(e.target.value);
    }

    function onChangePassword(e) {
        setPassword(e.target.value);
    }

    function onChangeConfirmPassword(e) {
        setConfirmPassword(e.target.value);
    }

    function onChangeEmail(e) {
        setEmail(e.target.value);
    }

    async function onSubmit(e) {
        e.preventDefault();
        
        const newUser = {
            username,
            email,
            password,
            confirmPassword,
        }

        const postResult = await axios.post('http://localhost:5000/users/create', newUser)
        .then(res => {
            console.log(res.data);
            return res.data;
        })
        .catch(err => {
            // For specific errors.
            console.log(err.response.data);
            return new Error(err.response.data);
        })
        
        if (postResult instanceof Error) {
            return onError(postResult.message);
        }    
        
        console.log(`Successful Post: ${postResult}`);
        navigate("/", {state: {message: postResult}});
    }

    function onError(message) {
        setError(message);
    }

    return (
        <div>
           <h3>Create New User</h3>
           { error && <div className='alert alert-danger' role='alert'>{error}</div> }
           <form onSubmit={onSubmit} >
               <div className="form-group">
                   <label>Username: </label>
                   <input type='text' required className='form-control' value={username} onChange={onChangeUsername} />
               </div>
               <br />
               <div className="form-group">
                   <label>Email: </label>
                   <input type='email' required className='form-control' value={email} onChange={onChangeEmail} />
               </div>
               <br />
               <div className="form-group">
                   <label>Password: </label>
                   <input type='password' required className='form-control' value={password} onChange={onChangePassword} />
               </div>
               <br />
               <div className="form-group">
                   <label>Confirm Password: </label>
                   <input type='password' required className='form-control' value={confirmPassword} onChange={onChangeConfirmPassword} />
                </div>
                <br />
               <div className="form-group">
                   <input type='submit' className='btn btn-primary' onSubmit={onSubmit} value="Create User" />
               </div>
           </form>
        </div>
    )
}

export default CreateUser;