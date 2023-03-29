import React from 'react'
import {Link, useParams} from "react-router-dom";

const ProjectItem = ({project, deleteProject}) => {
    return (
        <tr>
            <td><Link to={`/project/${project.id}`}>{project.id}</Link></td>
            <td>{project.name}</td>
            <td>{project.repoUrl}</td>
            <td>{project.users}</td>
            <td>
                <button onClick={() => deleteProject(project.id)}
                        type='button'>Delete
                </button>
            </td>
        </tr>
    )
}

export const ProjectList = ({projects, deleteProject}) => {
    return (
        <div>
            <table>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Url</th>
                    <th>Users</th>
                    <th></th>
                </tr>
                {projects.map((project) => <ProjectItem project={project}
                                                        deleteProject={deleteProject}/>)}
            </table>
            <Link to='/projects/create'>Create</Link>
        </div>

    )
}


const ProjectUser = ({item}) => {
    return (
        <li>
            {item.username} ({item.email})
        </li>
    )
}

const ProjectDetailItem = ({project, users}) => {
    return (
        <div>
            <h1>{project.name}</h1>
            <h4>URL: {project.repoUrl ? project.repoUrl : 'not entered'}</h4>
            <ul>
                {project.users.map((user) => <ProjectUser item={users[user - 1]}/>)}
            </ul>
        </div>
    )
}

export const ProjectDetail = ({projects, users}) => {
    let {id} = useParams();
    let item = projects.filter((project) => project.id === parseInt(id))
    return (
        <div>
            {item.map((project) => <ProjectDetailItem project={project} users={users}/>)}
        </div>
    )
}
