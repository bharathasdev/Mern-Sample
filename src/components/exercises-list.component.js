import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

const Exercise = props =>(

    <tr>
        <td>{props.excercise.username}</td>
        <td>{props.excercise.description}</td>
        <td>{props.excercise.duration}</td>
        <td>{props.excercise.date.substring(0, 10)}</td>
        <td>
            <Link to={"/edit/"+props.excercise._id}>edit</Link> | <a href="#" onClick ={()=>{props.deleteExercise(props.excercise._id)}} >delete</a>

        </td>
    </tr>

)

export default class ExercisesList extends Component{

    constructor(props){
        super(props);
        this.deleteExercise = this.deleteExercise.bind(this);
        this.state = {exercises:[]};

    }

    componentDidMount(){

        axios.get('http://localhost:5000/exercises/')
        .then(response => {
            
                this.setState(
                    {
                        exercises:response.data
                        
                    }
                );
        
           
        })
        .catch((error) =>{
                console.log(error);
            }
        )
    }

    deleteExercise(id)
    {
        axios.delete('http://localhost:5000/exercises/'+id)
        .then((res) =>{
            console.log(res.data);

        })
        .catch((err) =>{
            console.log(err)
        })

        this.setState({
            exercises:this.state.exercises.filter(el => el._id !== id)
        })

    }
    
    excerciseList()
    {
        return this.state.exercises.map(currentexercise =>{
            return <Exercise excercise = {currentexercise} deleteExercise={this.deleteExercise} key={currentexercise._id}/>
        })
    }
    render()
    {
        return(
            <div>
                <h3>Logged Excercises</h3>
                <table className = "table">
                    <thead className = "thead-light">
                        <tr>
                            <th>Username</th>
                            <th>Description</th>
                            <th>Duration</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.excerciseList()}
                    </tbody>
                </table>
            </div>
        )
    }
}