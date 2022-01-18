import React from 'react';
import {useLocation} from 'react-router-dom';
import axios from 'axios';
import Exercise from "./Exercise";

function ExercisesList() {
    const [exercisesList, setExercises] = React.useState([]);
    const { state } = useLocation();
    const [message, setMessage] = React.useState('');
    const [config, setConfig] = React.useState({});
    const [currentUser, setCurrentUser] = React.useState('');

    React.useEffect(() => {
        if (state) {
            setMessage(state.message);
            setCurrentUser(state.user);
            setConfig({headers: {Authorization: `Bearer ${state.token}`}});
        }
    }, []);

    
    
    React.useEffect(() => {
        axios.get("http://localhost:5000/exercises/")
        .then(res => setExercises(res.data))
        .catch((err) => console.log(err));
    }, [])

    async function deleteExercise(id) {
        console.log(config);
        let authorizedDelete = await axios.get(`http://localhost:5000/exercises/${id}`)
        .then(res => res.data)
        .then(exercise => {
            if (exercise.username !== currentUser) {
                setMessage("You are not authorized to delete this exercise log.");
                return false;
            }
            return true;
        })

        if (!authorizedDelete) {
            return;
        }

        axios.delete(`http://localhost:5000/exercises/${id}`, config)
        .then(res => console.log(res.data))
        .catch(err => console.log(err.response.data));
        
        setExercises(exercisesList.filter(item => item._id !== id));
    }

    function exerciseList() {
        return exercisesList.map(item => <Exercise exercise={item} user={currentUser} deleteExercise={deleteExercise} key={item._id}/>)
    }

    return (
        <div>
            { message && <div className='alert alert-success' role='alert'> {message} </div> }
            <h3>Logged Exercises</h3>
            <table className="table">
                <thead className="thead-light">
                <tr>
                    <th>Username</th>
                    <th>Description</th>
                    <th>Duration</th>
                    <th>Date</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                { exerciseList() }
                </tbody>
            </table>
        </div>
    )
}

export default ExercisesList;