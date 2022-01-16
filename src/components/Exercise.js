import React from "react";
import { Link } from "react-router-dom";

function Exercise(props) {
    return (
        <tr>
            <td>{props.exercise.username}</td>
            <td>{props.exercise.description}</td>
            <td>{props.exercise.duration}</td>
            <td>{new Date(props.exercise.date).toLocaleDateString()}</td>
            <td>
                <button type="button" className="btn btn-primary ms-2">
                    <Link style={{color:"white", textDecoration:"none"}} to={`/edit/${props.exercise._id}`}> Edit </Link>
                </button>
                <button type="button" className="btn btn-danger ms-2" onClick={() => {props.deleteExercise(props.exercise._id)}}>Delete</button>
            </td>
        </tr>
    )
}

export default Exercise;