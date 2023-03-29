import React from "react";
import './App.css';
import UserList from "./components/User";
import {TODOList, ProjectTODOs} from "./components/TODOs";
import Footer from "./components/Footer";
import axios from "axios";
import {ProjectList, ProjectDetail} from "./components/Projects";
import {BrowserRouter, Link, Route, Switch} from "react-router-dom";
import NotFound404 from "./components/NotFound404";
import LoginForm from './components/Auth.js';
import Cookies from 'universal-cookie';


class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            users: [],
            todos: [],
            projects: [],
        }
    }

    deleteProject(id) {
        const headers = this.get_headers()
        axios.delete(`http://127.0.0.1:8000/api/projects/${id}`, {headers})
            .then(response => {
                this.setState({
                    projects: this.state.projects.filter((item) => item.id !==
                        id)
                })
            }).catch(error => console.log(error))
    }


    set_token(token, username) {
        const cookies = new Cookies()
        cookies.set('token', token)
        cookies.set('username', username)
        this.setState({'token': token, 'username': username}, () => this.load_data())
    }


    is_authenticated() {
        return this.state.token !== ''
    }

    logout() {
        this.set_token('', '')
    }

    get_token_from_storage() {
        const cookies = new Cookies()
        const token = cookies.get('token')
        const username = cookies.get('username')
        this.setState({'token': token, 'username': username}, () => this.load_data())
    }


    get_token(username, password) {
        axios.post('http://127.0.0.1:8000/api-token-auth/', {
            username: username,
            password: password
        })
            .then(response => {
                this.set_token(response.data['token'], username)
            }).catch(error => alert('Неверный логин или пароль'))
    }

    get_headers() {
        let headers = {
            'Content-Type': 'application/json'
        }
        if (this.is_authenticated()) {
            headers['Authorization'] = 'Token ' + this.state.token
        }
        return headers
    }


    load_data() {
        const headers = this.get_headers()
        axios.get('http://127.0.0.1:8000/api/users/', {headers}).then(response => {
            this.setState(
                {
                    users: response.data.results
                }
            )
        }).catch(error => {
            console.log(error)
            this.setState({
                users: []
            })
        })

        axios.get('http://127.0.0.1:8000/api/todo/', {headers}).then(response => {
            this.setState(
                {
                    todos: response.data.results
                }
            )
        }).catch(error => {
            console.log(error)
            this.setState({
                todos: []
            })
        })

        axios.get('http://127.0.0.1:8000/api/projects/', {headers}).then(response => {
            this.setState(
                {
                    projects: response.data.results
                }
            )
        }).catch(error => {
            console.log(error)
            this.setState({
                projects: []
            })
        })
    }

    componentDidMount() {
        this.get_token_from_storage()
    }

    render() {
        return (
            <div>
                <BrowserRouter>
                    <header>
                        <h3>{this.state.username
                            ? `Вы вошли под пользователем ${this.state.username}`
                            : 'Вы не авторизованы'}</h3>
                        <ul>
                            <li><Link to='/'>Projects</Link></li>
                            <li><Link to='/users'>Users</Link></li>
                            <li><Link to='/todos'>TODOs</Link></li>
                            {this.is_authenticated() ?
                                <button onClick={() => this.logout()}>Logout</button> :
                                <Link to='/login'>Login</Link>}

                        </ul>
                    </header>
                    <main>
                        <div>
                            <Switch>
                                <Route exact path='/'>
                                    <ProjectList projects={this.state.projects}
                                                 deleteProject={(id) => this.deleteProject(id)}/>
                                </Route>
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
                                <Route exact path='/login' component={() => <LoginForm
                                    get_token={(username, password) => this.get_token(username, password)}/>}/>
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
