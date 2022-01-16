import axios from 'axios';
import React from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from 'react-router-dom';

function CreateExercise(props) {
    const navigate = useNavigate();
    const [username, setUsername] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [duration, setDuration] = React.useState(0);
    const [date, setDate] = React.useState(new Date());
    const [users, setUsers] = React.useState([]);
    const [error, setError] = React.useState('');

    React.useEffect(() => {
        axios.get('http://localhost:5000/users/')
            .then(res => {
                if (res.data.length > 0) {
                    const users = res.data.map(user => user.username);
                    setUsers(users);
                    setUsername(users[0]);
                }
            })
            .catch((err) => {console.log(err);})
    }, []);

    function onChangeUsername(e) {
        return setUsername(e.target.value);
    }

    function onChangeDescription(e) {
        return setDescription(e.target.value);
    }

    function onChangeDuration(e) {
        return setDuration(e.target.value);
    }

    function onChangeDate(date) {
        return setDate(date);
    }

    async function onSubmit(e) {
        e.preventDefault();

        const newExercise = {
            username: username,
            description: description,
            duration: duration,
            date: date
        }

        const postResult = await axios.post('http://localhost:5000/exercises/create', newExercise)
        .then(res => {
            console.log(res.data);
            return res.data;
        })
        .catch((err) => {
            console.log(err);
            return new Error(err);
        });

        if (postResult instanceof Error) {
            return onError(postResult.message);
        }

        navigate("/", {state : { message : postResult }});
    }

    function onError(message) {
        setError("An error occured while creating a new exercise log.");
    }
    
    return (
        <div>
            <h3>Create New Exercise Log</h3>
            { error && <div className='alert alert-danger' role='alert'>{error}</div> }
            <form onSubmit={onSubmit}>
                <div className='form-group'>
                    <label>Username: </label>
                    <select required className="form-control" value={username} onChange={onChangeUsername}>
                        {users.map(user => <option key={user} value={user}> {user} </option>)}
                    </select>
                </div>
                <br />
                <div className="form-group"> 
                    <label>Description: </label>
                    <input type="text" required className="form-control" value={description} onChange={onChangeDescription} />
                </div>
                <br />
                <div className="form-group"> 
                    <label>Duration (in minutes): </label>
                    <input type="text" required className="form-control" value={duration} onChange={onChangeDuration} />
                </div>
                <br />
                <div className="form-group"> 
                    <label>Date: </label>
                    <div>
                        <DatePicker selected={date} onChange={onChangeDate} />
                    </div>
                </div>
                <br />
                <div className="form-group"> 
                    <input type="submit" value="Create Exercise Log" className="btn btn-primary" />
                </div>
            </form>
        </div>
    )
}

export default CreateExercise;