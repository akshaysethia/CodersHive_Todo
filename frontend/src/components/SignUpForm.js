import React from 'react';
import axios from 'axios';
import { Button, Label, Modal, ModalBody, ModalHeader } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';

const required = (val) => {
  return (val && val.length);
}
  
const maxLength = (len) => (val) => {
  return (!(val) || (val.length <= len));
}

const minLength = (len) => (val) => {
  return ( val && (val.length >= len));
}

class SignUpForm extends React.Component {

  state = {
    isModalOpen: false,
    isConfirmationModalOpen: false,
    isErrorModalOpen: false
  }

  toggleModal = () => {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  }

  toggleConfirmationModal = () => {
      this.setState({
          isConfirmationModalOpen: !this.state.isConfirmationModalOpen
      })
  }

  toggleErrorModal = () => {
    this.setState({
      isErrorModalOpen: !this.state.isErrorModalOpen
    })
  }
  
  handleSubmit = (values) => {
    this.toggleModal();

      const user = {
        username: values.username,
        password: values.password,
        email: values.email
      }
      
      //this.props.enterName(user.username);
      axios.post('http://localhost:5001/users/add', user)
        .then(res => {
          this.toggleConfirmationModal();
          console.log(res.status)
        })
        .catch(error => {
          console.log(error);
          this.toggleErrorModal();
        });
  }
  
  render(){
    return(
      <div>
        <Button color="danger" onClick={() => this.toggleModal()}>
          <span className="fa fa-user-plus"></span> Sign Up
        </Button>

        <Modal isOpen={this.state.isConfirmationModalOpen} toggle={this.toggleConfirmationModal} 
          style={{color:'black'}} className="modal-dialog modal-dialog-centered">
          
          <ModalBody><h3>You are successfully resgistered.</h3></ModalBody>
          <Button color="primary" onClick={() => this.toggleConfirmationModal()}>Close</Button>
        </Modal>

        <Modal isOpen={this.state.isErrorModalOpen} toggle={this.toggleErrorModal} 
          style={{color:'black'}} className="modal-dialog modal-dialog-centered">
          
          <ModalBody><h3>Sorry this email id is already in use. </h3></ModalBody>
          <Button color="primary" onClick={() => this.toggleErrorModal()}>Close</Button>
        </Modal>

        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal} 
          style={{color:'black'}} className="modal-dialog modal-dialog-centered">
          <ModalHeader toggle={this.toggleModal}>Sign Up</ModalHeader>
          <ModalBody>
            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>

              <div className="form-group">
                <Label htmlFor="username">Name</Label>
                <Control.text model=".username" id="username"
                  name="username" placeholder="Enter name"
                  className="form-control" 
                  validators={{ minLength: minLength(3), 
                    maxLength: maxLength(15)
                  }}
                />

                <Errors className="text-danger"
                  model=".username" show="touched"
                  messages={{minLength: 'Must be greater than 2 characters',
                      maxLength: 'Must be 15 characters or less'
                  }}
                />
              </div>

              <div className="form-group">
                <Label htmlFor="email">Email</Label>
                <Control type="email" model=".email" id="email"
                  name="email" placeholder="Enter email"
                  className="form-control"
                  validators={{ required}} />

                <Errors className="text-danger"
                  model=".email" show="touched"
                  messages={{ required: 'Required'
                  }}
                />
              </div>

              <div className="form-group">
                <Label htmlFor="password">Password</Label>
                <Control type="password" model=".password" id="password"
                  name="password" placeholder="Enter password"
                  className="form-control"
                  validators={{ required}} />

                <Errors className="text-danger"
                  model=".password" show="touched"
                  messages={{ required: 'Required'
                  }}
                />
              </div>

              <Button type="submit" value="submit" color="primary">Register</Button>
                            
            </LocalForm>
              
          </ModalBody>
        </Modal>
      </div>
    )
  }
}

export default SignUpForm;