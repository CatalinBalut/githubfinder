import React from 'react';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import axios from 'axios';

import './App.css';

class App extends React.Component{
  state = {
    users: [],
    loading: false,
    alert: null
  }

  //if the data isn t loaded => show a spinner : show the data
  // async componentDidMount(){
  //   this.setState({loading: true});

  //   //if we run out of requests:
  //   const res = await axios.get(`https://api.github.com/users?
  //                               client_id= ${process.env.REACT_APP_GITHUB_CLIENT_ID}
  //                               &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
  //     //.then(res => console.log(res.data));
  //   this.setState({users:res.data, loading:false});
  // }

  //Search github users
  searchUsers = async (text) => {
    this.setState({loading:true})
    console.log(text);
    const res = await axios.get(`https://api.github.com/search/users?q=${text}&
                                client_id= ${process.env.REACT_APP_GITHUB_CLIENT_ID}
                                &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
      //.then(res => console.log(res.data));
    this.setState({users:res.data.items, loading:false});
  }

  //Clear users from state
  clearUsers = () => {
    this.setState({users:[], loading:false});
  }

  //Set alert for empty field
  setAlert = (msg, type) => {
    this.setState({alert: {msg, type}});

    setTimeout(() => this.setState({alert: null}), 3000);
  };

  render(){
    const {users, loading} = this.state;
    return (
      //jsx
      <div className="App">
        <Navbar />
        <div className="container">
          <Alert alert={this.state.alert} />
          <Search searchUsers={this.searchUsers} 
                  clearUsers={this.clearUsers}
                  showClear={users.length > 0 ? true : false }
                  setAlert={this.setAlert}/>
                  
          <Users loading={loading} users={users}/>
        </div>    
      </div>
    );
  }

  
}

export default App;
