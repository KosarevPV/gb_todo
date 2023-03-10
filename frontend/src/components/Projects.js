import React from 'react'
import {Link, useParams} from "react-router-dom";

const ProjectItem = ({project}) => {
    return (
        <tr>
            <td>{project.id}</td>
            <td>{project.name}</td>
            <td>{project.repoUrl}</td>
            <td>{project.users}</td>
        </tr>
    )
}

const ProjectList = ({projects}) => {
    return (
        <table>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Url</th>
                <th>Users</th>
            </tr>
            {projects.map((project) => <ProjectItem project={project}/>)}
        </table>
    )
}

// const ProjectTODOs = ({todos}) => {
//     let {id} = useParams()
//
//     let filter_items = todos.filter((todo) => todo.project === parseInt(id))
//
//     return (
//         <table>
//             <tr>
//                 <th>ID</th>
//                 <th>Text</th>
//                 <th>Created</th>
//                 <th>Updated</th>
//                 <th>Project</th>
//                 <th>User Creator</th>
//             </tr>
//             {filter_items.map((todo) => <TODOItem todo={todo}/>)}
//         </table>
//     )
// }

export default ProjectList