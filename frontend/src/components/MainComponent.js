import React from 'react';
import axios from 'axios';

import Header from './HeaderComponent';
import TodoList from './TodoListComponent';
import { Container } from 'reactstrap';

class Main extends React.Component{

  state={
    todolist: [],
    totaltodos: -1
  }

  getTodos = () => {
    axios.get('http://localhost:5001/todos/', {
        params: {
          userid: this.props.user.id,
          archived: false
        }
      })
      .then(response => {
        this.setState({todolist: response.data, totaltodos: response.data.length});
      })
      .catch((error) => {
        console.log(error);
      })
  }

  componentDidMount() {
    this.getTodos();
  }

  onaddTask = (task) => {

    const todo = {
      userid: this.props.user.id,
      category: task.category,
      task: task.task,
      remarks: task.remarks,
      duedate: task.duedate
    }

    axios.post('http://localhost:5001/todos/add', todo)
      
      .then(res => this.getTodos())
      .catch(err => console.log("Todo Error:" + err));
    
  }

  onListChanges = () => {
    this.getTodos();
  }

  render(){
    
    return(
      <React.Fragment>
        <Header userName={this.props.user.userName} addtask={this.onaddTask} />
        <Container fluid>
        <TodoList todos={this.state.todolist} totaltodos={this.state.totaltodos} changes={this.onListChanges} deletion={this.onListChanges} loading/>
        </Container>
      </React.Fragment>
    )
  }
}

export default Main;

