import React from 'react';
import './App.css';
import Login from './components/LoginComponent';
import Main from './components/MainComponent';

class App extends React.Component{

  state={
    userName:'',
    id:''
  }

  onNameEntered = (userName, id) => {
    this.setState({userName: userName, id: id});
  }

  render(){
    let show;
    if(this.state.userName===''){
      show = (<div className="centerName">
        <Login data={this.onNameEntered} />
        </div>)
    }
    else{
      show = <Main user={this.state} />
    }

    return(
      <React.Fragment>
        <div className="container-fluid App" style={{padding:'0px'}}>
          {show}
        </div>
        
      </React.Fragment>
    )
  }
}

export default App;
