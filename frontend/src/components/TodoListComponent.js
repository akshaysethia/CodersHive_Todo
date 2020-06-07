import React from 'react';
import axios from 'axios';
import { Button, Card, CardBody, CardSubtitle, CardText, CardHeader, Input, Spinner } from 'reactstrap';
import './TodoList.css';

class TodoList extends React.Component{

    state={
        duedatefilter: 'Due Date Ascending',
        labelfilter: 'Show All',
        searchfilter: ''
    }

    updateStatus = (id) => {
        console.log(id);
        let todo;
        let todolist = this.props.todos;
        for(let i=0;i<todolist.length;i++){
            if(todolist[i]._id===id){
                if(todolist[i].status==='New'){
                    todo = {
                        userid: todolist[i].userid,
                        category: todolist[i].category,
                        task: todolist[i].task,
                        status: 'In Progress',
                        remarks: todolist[i].remarks,
                        duedate: todolist[i].duedate,
                        archived: false
                    }
                }
                else if(todolist[i].status==='In Progress'){
                    todo = {
                        userid: todolist[i].userid,
                        category: todolist[i].category,
                        task: todolist[i].task,
                        status: 'Completed',
                        remarks: todolist[i].remarks,
                        duedate: todolist[i].duedate,
                        archived: true
                    }
                }
            }
        }
        

        axios.post('http://localhost:5001/todos/update/' + id, todo)
        .then(res => this.props.changes())
        .catch(error => console.log(error));
    }

    deleteItem = (id) => {
        console.log(id);
        
        axios.delete('http://localhost:5001/todos/'+id)
        .then(response => this.props.deletion())
        .catch(err => console.log(err));
    }

    onLabelDropdownSelected = (event) => {
        this.setState({labelfilter: event.target.value});
    }

    onDateDropdownSelected = (event) => {
        
        this.setState({duedatefilter: event.target.value});
    }

    onTaskSearch = (event) => {
        this.setState({searchfilter: event.target.value});
    }

    sortByDueDate = (todolist,order) => { 
        let data = todolist;
        data.sort(function(a,b){
            let n1 = new Intl.DateTimeFormat('en-IN', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(a.duedate)));
            let n2 = new Intl.DateTimeFormat('en-IN', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(b.duedate)))
            
            if(order==='des'){
                if(n1<n2) return 1;
                if(n1>n2) return -1
                return 0;
            }
            else if(order==='asc'){
                if(n1>n2) return 1;
                if(n1<n2) return -1
                return 0;
            }
            
        })
    
        return data;
    }


    render(){
        let tasks;
        let todolist = this.props.todos;
        this.sortByDueDate(todolist,'asc');

        const { searchfilter, labelfilter, duedatefilter } = this.state;

        if(searchfilter){
            todolist = todolist.filter((todo) => {
                return todo.task.toLowerCase().includes(searchfilter.toLowerCase());
            })
        }

        if(labelfilter!=='Show All'){
            todolist = todolist.filter((todo) => {
                return todo.category.includes(labelfilter);
            })
        }

        if(duedatefilter){
            if(duedatefilter==='Due Date Descending'){
                todolist = this.sortByDueDate(todolist,'des');
            }
        }

        if(todolist.length>0){
            tasks = todolist.map((todo) => {
                return (
                    <div className="col-12 col-sm-6 col-lg-4 my-2" key={todo._id}>
                        <Card className={`${(todo.status==='New') ? "dark1" : "light1"} grow`}>
                            <CardHeader>{todo.task}</CardHeader>
                            <CardBody>
                                <CardText>Status: {todo.status}</CardText>
                                <CardSubtitle>
                                    Due Date: {new Intl.DateTimeFormat('en-IN', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(todo.duedate)))}
                                    <br/> Label: {todo.category}</CardSubtitle>
                                <CardText>Remarks: {todo.remarks}</CardText>
                                <Button className="mr-3" color={`${(todo.status==='New')?'warning':'success'}`} onClick={() => this.updateStatus(todo._id)}>
                                    <span className={`${(todo.status==='New')?'fa fa-spinner':'fa fa-check-square-o'}`}></span>{` ${(todo.status==='New')?'In Progess':'Completed'}`}
                                </Button>
                                <Button color="danger" onClick={() => this.deleteItem(todo._id)}>
                                <span className="fa fa-trash"></span> Delete
                                </Button>
                            </CardBody>
                        </Card>
                    </div>
                )
            })
        }
        else if(todolist.length===0 && this.props.totaltodos===-1){
            tasks = <h1>Loading<br /><Spinner style={{ width: '3rem', height: '3rem' }} /></h1>
        }
        else if(todolist.length===0 || this.props.totaltodos===0){
            tasks = <h1>No Todos Available</h1>
        }

        return(
            <React.Fragment>
                <div className="container-fluid mt-1">
                    <div className="row">
                        <div className="col-4">
                            <Input type="text" onChange={(event) => this.onTaskSearch(event)} label="Filter By Task"
                                placeholder="Enter Task"/>
                        </div>
                        <div className="col-4">
                            <Input type="select" onChange={(event) => this.onLabelDropdownSelected(event)} label="Filter By Label">
                                <option key='0' value='Show All'>Show All</option>
                                <option key='1' value='Personal'>Personal</option>
                                <option key='2' value='Work'>Work</option>
                                <option key='3' value='Shopping'>Shopping</option>
                                <option key='4' value='Other'>Other</option>
                            </Input>
                        </div>
                        <div className="col-4">
                            <Input type="select" onChange={(event) => this.onDateDropdownSelected(event)} label="Filter By Due Date">
                                <option key='0' value='Due Date Ascending'>Due Date Ascending</option>
                                <option key='1' value='Due Date Descending'>Due Date Descending</option>
                            </Input>
                        </div>
                    </div>
                    <div className="row" style={{color:'black'}}>
                        {tasks}
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default TodoList;
