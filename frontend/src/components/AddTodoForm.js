import React from 'react';
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

class ADDTODOFORM extends React.Component {

  state = {
    isModalOpen: false,
  }

  toggleModal = () => {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  }
  
  handleSubmit = (values) => {
    this.toggleModal();
    this.props.addtask(values);
  }
  
  render(){
    return(
      <div>
        <Button style={{background:'black', fontWeight:'500'}} onClick={() => this.toggleModal()}>
          <span className="fa fa-plus-square"></span> Add Todo
        </Button>

        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal} 
          style={{color:'black'}} className="modal-dialog modal-dialog-centered">
          <ModalHeader toggle={this.toggleModal}>Add Todo</ModalHeader>
          <ModalBody>
            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>

              <div className="form-group">
                <Label htmlFor="category">Category</Label>
                <Control.select model=".category" name="category"
                  className="form-control" defaultValue="Personal">
                  <option>Personal</option>
                  <option>Work</option>
                  <option>Shopping</option>
                  <option>Other</option>
                </Control.select>
              </div>

              <div className="form-group">
                <Label htmlFor="task">Task</Label>
                <Control.text model=".task" id="task"
                  name="task" placeholder="Enter Task"
                  className="form-control" 
                  validators={{ minLength: minLength(3), 
                    maxLength: maxLength(15)
                  }}
                />

                <Errors className="text-danger"
                  model=".task" show="touched"
                  messages={{minLength: 'Must be greater than 2 characters',
                      maxLength: 'Must be 15 characters or less'
                  }}
                />
              </div>

              <div className="form-group">
                <Label htmlFor="duedate">Due Date</Label>
                <Control type="date" model=".duedate" id="duedate"
                  name="duedate" className="form-control"
                  validators={{ required}} />

                <Errors className="text-danger"
                  model=".duedate" show="touched"
                  messages={{ required: 'Required'
                  }}
                />
              </div>

              <div className="form-group">
                <Label htmlFor="remarks">Remarks</Label>
                <Control.textarea model=".remarks" id="remarks" 
                  name="remarks" rows="6" 
                  className="form-control" 
                  validators={{ required}}
                  />

                <Errors className="text-danger"
                  model=".remarks" show="touched"
                  messages={{ required: 'Required'
                  }}
                />
              </div>

              <Button type="submit" value="submit" color="primary">Submit</Button>
                            
            </LocalForm>
              
          </ModalBody>
        </Modal>
      </div>
    )
  }
}

export default ADDTODOFORM;