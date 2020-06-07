import React from 'react';
import './Header.css';
import { Jumbotron, Button } from 'reactstrap';

import ADDTODOFORM from './AddTodoForm';

class Header extends React.Component{

  onaddTask = (task) => {
    this.props.addtask(task);
  }

  onSignOut = () => {
    localStorage.clear();
    window.location.href = '/';
    // axios.delete('http://localhost:5001/users/logout')
    //   .then((result) => {
    //     console.log('User Logged Out Successfully !');
    //   }) .catch((err) => { console.log('Error: ', err); });
  }

  render(){
    return(
      <React.Fragment>
        <Jumbotron fluid className="mb-0 headerTodo">
          
          <div className="row no-gutters">
            <div className="col-12 col-md-4">
              <h1>Hello {this.props.userName} !</h1>
            </div>
            <div className="col-6 col-md-2 offset-md-4">
              <ADDTODOFORM addtask={this.onaddTask}/>
            </div>
            <div className="col-6 col-md-2">
              <Button style={{background:'black', fontWeight:'500'}} onClick={() => this.onSignOut()}>
                <span className="fa fa-sign-out"></span> Sign Out
              </Button>
            </div>
          </div>
        </Jumbotron>
      </React.Fragment>
    )
  }
}

export default Header;