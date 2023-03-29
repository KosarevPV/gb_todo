import React from 'react'
import {Link, useParams} from "react-router-dom";


const TODOItem = ({todo, deleteTODO}) => {
    return (
        <tr>
            <td>{todo.id}</td>
            <td>{todo.text}</td>
            <td>{todo.created}</td>
            <td>{todo.updated}</td>
            <td><Link to={`/projects-todos/${todo.project}`}>{todo.project}</Link></td>
            <td>{todo.userCreator}</td>
            <td>{todo.active ? 'Active' : 'Closed'}</td>
            <td>
                <button onClick={() => deleteTODO(todo.id)}
                        type='button'>Delete
                </button>
            </td>
        </tr>
    )
}

export const TODOList = ({todos, deleteTODO}) => {
    return (
        <div>
            <table>
                <tr>
                    <th>ID</th>
                    <th>Text</th>
                    <th>Created</th>
                    <th>Updated</th>
                    <th>Project</th>
                    <th>User Creator</th>
                    <th>Active</th>
                    <th></th>
                </tr>
                {todos.map((todo) => <TODOItem todo={todo} deleteTODO={deleteTODO}/>)}
            </table>
            <Link to='/todos/create'>Create</Link>
        </div>
    )
}

export const ProjectTODOs = ({todos, deleteTODO}) => {
    let {id} = useParams()

    let filter_items = todos.filter((todo) => todo.project === parseInt(id))

    return (
        <div>
            <table>
                <tr>
                    <th>ID</th>
                    <th>Text</th>
                    <th>Created</th>
                    <th>Updated</th>
                    <th>Project</th>
                    <th>User Creator</th>
                    <th>Active</th>
                    <th></th>
                </tr>
                {filter_items.map((todo) => <TODOItem todo={todo} deleteTODO={deleteTODO}/>)}
            </table>
            <Link to='/todos/create'>Create</Link>
        </div>
    )
}