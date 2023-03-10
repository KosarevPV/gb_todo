import React from 'react'
import {Link} from "react-router-dom";

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

export default ProjectList