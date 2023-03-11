import React from "react";
import './App.css';
import UserList from "./components/User";
import {TODOList, ProjectTODOs} from "./components/TODOs";
import Footer from "./components/Footer";
import Menu from "./components/Menu";
import axios from "axios";
import {ProjectList, ProjectDetail} from "./components/Projects";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import NotFound404 from "./components/NotFound404";


class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            users: [],
            todos: [],
            projects: [],
        }
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/users/').then(response => {
            this.setState(
                {
                    users: response.data.results
                }
            )
        }).catch(error => console.log(error))

        axios.get('http://127.0.0.1:8000/api/todo/').then(response => {
            this.setState(
                {
                    todos: response.data.results
                }
            )
        }).catch(error => console.log(error))

        axios.get('http://127.0.0.1:8000/api/projects/').then(response => {
            this.setState(
                {
                    projects: response.data.results
                }
            )
        }).catch(error => console.log(error))
    }


    render() {
        return (
            <div>
                <BrowserRouter>
                    <header>
                        <Menu/>
                    </header>
                    <main>
                        <div>
                            <Switch>
                                <Route exact path='/' component={() =>
                                    <ProjectList projects={this.state.projects}/>}/>
                                <Route exact path='/users' component={() =>
                                    <UserList users={this.state.users}/>}/>
                                <Route exact path='/todos' component={() =>
                                    <TODOList todos={this.state.todos}/>}/>
                                <Route path="/projects-todos/:id">
                                    <ProjectTODOs todos={this.state.todos}/>
                                </Route>
                                <Route path="/project/:id">
                                    <ProjectDetail projects={this.state.projects}
                                                   users={this.state.users}/>
                                </Route>
                                <Route component={NotFound404}/>
                            </Switch>
                        </div>
                    </main>
                    <Footer/>
                </BrowserRouter>
            </div>

        )
            ;
    }
}

export default App;
