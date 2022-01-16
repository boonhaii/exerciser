import React from 'react';
import {useLocation} from 'react-router-dom';
import axios from 'axios';
import Exercise from "./Exercise";

function ExercisesList() {
    const [exercisesList, setExercises] = React.useState([]);
    const { state } = useLocation();
    const message = state ? state.message : '';

    React.useEffect(() => {
        axios.get("http://localhost:5000/exercises/")
        .then(res => setExercises(res.data))
        .catch((err) => console.log(err));
    }, [])

    function deleteExercise(id) {
        axios.delete(`http://localhost:5000/exercises/${id}`)
        .then(res => console.log(res.data))
        
        setExercises(exercisesList.filter(item => item._id !== id));
    }

    function exerciseList() {
        return exercisesList.map(item => <Exercise exercise={item} deleteExercise={deleteExercise} key={item._id}/>)
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