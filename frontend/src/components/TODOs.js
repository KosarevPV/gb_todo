import React from 'react'
import {Link, useParams} from "react-router-dom";


const TODOItem = ({todo}) => {
    return (
        <tr>
            <td>{todo.id}</td>
            <td>{todo.text}</td>
            <td>{todo.created}</td>
            <td>{todo.updated}</td>
            <td><Link to={`/projects-todos/${todo.project}`}>{todo.project}</Link></td>
            <td>{todo.userCreator}</td>
        </tr>
    )
}

export const TODOList = ({todos}) => {
    return (
        <table>
            <tr>
                <th>ID</th>
                <th>Text</th>
                <th>Created</th>
                <th>Updated</th>
                <th>Project</th>
                <th>User Creator</th>
            </tr>
            {todos.map((todo) => <TODOItem todo={todo}/>)}
        </table>
    )
}

export const ProjectTODOs = ({todos}) => {
    let {id} = useParams()

    let filter_items = todos.filter((todo) => todo.project === parseInt(id))

    return (
        <table>
            <tr>
                <th>ID</th>
                <th>Text</th>
                <th>Created</th>
                <th>Updated</th>
                <th>Project</th>
                <th>User Creator</th>
            </tr>
            {filter_items.map((todo) => <TODOItem todo={todo}/>)}
        </table>
    )
}