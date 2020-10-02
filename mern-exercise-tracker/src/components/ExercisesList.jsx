import React, { Component } from 'react';
import { Link } from "react-router-dom";
import axios from "axios";

const Exercise = props => (
    <tr>
        <td>{props.exercise.username}</td>
        <td>{props.exercise.description}</td>
        <td>{props.exercise.duration}</td>
        <td>{props.exercise.date.substring(0,10)}</td>
        <td>
            <button className="btn btn-secondary"><Link to={"/edit/"+props.exercise._id} style={{color:"white"}}>Edit</Link></button> | <button className="btn btn-danger" onClick={() => {props.deleteExercise(props.exercise._id) }}>Delete</button>
        </td>
    </tr>
)

class ExercisesList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            exercises: []
        }

        this.deleteExercise = this.deleteExercise.bind(this);
    }

    componentDidMount() {
        axios.get('http://localhost:5000/exercises/')
            .then(res => {
                this.setState({ exercises: res.data })
            })
            .catch(error => console.log(error));
    }

    deleteExercise(id) {
        axios.delete('http://localhost:5000/exercises/' +id)
            .then(res => console.log(res.data));

        this.setState({ exercises: this.state.exercises.filter(el => el._id !== id)})
    }

    exercisesList() {
        return this.state.exercises.map(currentexercise => {
            return <Exercise exercise={currentexercise} deleteExercise={this.deleteExercise} key={currentexercise._id} />
        })
    }

    render() { 
        return ( 
            <div className="container">
                <h3>Logged Exercises</h3>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Username</th>
                            <th>Description</th>
                            <th>Duration</th>
                            <th>Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.exercisesList()}
                    </tbody>
                </table>
            </div>
         );
    }
}
 
export default ExercisesList;