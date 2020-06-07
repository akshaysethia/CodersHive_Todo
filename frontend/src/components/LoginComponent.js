import React from 'react';
import '../App.css';
import { Button, Modal, ModalBody, Input, Form } from 'reactstrap';
import axios from 'axios';
import SignUpForm from './SignUpForm';

class Login extends React.Component{

  state = {
    email: '',
    password: '',
    isErrorModalOpen: false
  }
  
  toggleErrorModal = () => {
    this.setState({
      isErrorModalOpen: !this.state.isErrorModalOpen
    })
  }

  onNameSubmit = (event) => {
      event.preventDefault();

      const user = {
        email: this.state.email,
        password: this.state.password
      }
  
      axios.post('http://localhost:5001/users/login', user)
        .then(res => {
          const data = (res.data);
          //console.log(data.username)
          this.props.data(data.username, data._id);
        })
        .catch(error => {
          console.log("DEKHLO:" + error)
          this.toggleErrorModal();
        });
  }

  onEmailChange = (event) => {
    this.setState({email: event.target.value});
  }

  onPasswordChange = (event) => {
    this.setState({password: event.target.value});
  }

  render(){
    return(
      <div>
        <Modal isOpen={this.state.isErrorModalOpen} toggle={this.toggleErrorModal} 
          style={{color:'black'}} className="modal-dialog modal-dialog-centered">
          
          <ModalBody>User Not Found</ModalBody>
          <Button color="primary" onClick={() => this.toggleErrorModal()}>Close</Button>
        </Modal>
        <div className="row">
          <div className="col-12">
            <div className="h1" style={{height:'auto'}}>What To Do?</div>
          </div>
        </div>
        <Form>
          <Input type="email" placeholder="Enter your email.."
            value={this.state.email} className="NameInput"
            onChange={(event) => this.onEmailChange(event)} />
          <br />
          <Input type="password" placeholder="Enter your password.."
            value={this.state.password} className="NameInput"
            onChange={(event) => this.onPasswordChange(event)} autoComplete="true"/>
          <br />
          </Form>

          <div className="row">
            <div className="col-6 offset-md-3 col-md-3">
              <Button color="danger" onClick={this.onNameSubmit}>
                <span className="fa fa-sign-in"></span> Sign In
              </Button>
            </div>
            <div className="col-6 col-md-3">
              <SignUpForm/>
            </div>
          </div>
        </div>
    )
  }
}

export default Login;