import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function EditExercise(props) {
    const navigate = useNavigate();
    const [exerciseId] = React.useState(useParams().id);
    
    const [username, setUsername] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [duration, setDuration] = React.useState(0);
    const [date, setDate] = React.useState(new Date());
    const [users, setUsers] = React.useState([]);

    React.useEffect(() => {
        axios.get('http://localhost:5000/exercises/' + exerciseId)
            .then(res => {
                setUsername(res.data.username);
                setDescription(res.data.description);
                setDuration(res.data.duration);
                setDate(new Date(res.data.date));
            })
            .catch((err) => {console.log(err);})

        axios.get('http://localhost:5000/users/')
        .then(res => {
            setUsers(res.data.map(user => user.username));
        })
        .catch((err) => {console.log(err)})
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

        const updatedExercise = {
            username: username,
            description: description,
            duration: duration,
            date: date
        }

        await axios.post('http://localhost:5000/exercises/' + exerciseId + '/update', updatedExercise)
        .then(res => console.log(res.data))
        .catch((err) => console.log(err));

        navigate('/');
    }
    
    return (
        <div>
            <h3>Update Exercise Log</h3>
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
                    <input type="submit" value="Update Exercise Log" className="btn btn-primary" />
                </div>
            </form>
        </div>
    )
}

export default EditExercise;