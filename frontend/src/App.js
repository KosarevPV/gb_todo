import React from "react";
import logo from './logo.svg';
import './App.css';
import UserList from "./components/User";
import Footer from "./components/Footer";
import Menu from "./components/Menu";
import axios from "axios";

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'users': []
        }
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/users/').then(response => {
            this.setState(
                {
                    'users': response.data
                }
            )
        }).catch(error => console.log(error))
    }

    render() {
        return [
            <Menu/>,
            <div>
                <UserList users={this.state.users}/>
            </div>,
            <Footer/>
        ]
    }
}

export default App;
