import React from 'react'

class TODOForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {text: '', active: true, project: 1, userCreator: 1}
    }

    handleChange(event) {
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        );
    }

    handleSubmit(event) {
        // console.log(this.props.users)
        // console.log(this.state.text)
        // console.log(this.state.active)
        // console.log(this.state.project)
        // console.log(this.state.userCreator)
        this.props.createTODO(this.state.text, this.state.active, +this.state.project, this.state.userCreator)
        event.preventDefault()
    }

    render() {
        return (
            <form onSubmit={(event) => this.handleSubmit(event)}>
                <div className="form-group">
                    <label for="login">text</label>
                    <input type="text" className="form-control" name="text"
                           value={this.state.text} onChange={(event) => this.handleChange(event)}/>
                </div>
                <div className="form-group">
                    <label for="users">project</label>
                    <select name="project" className='form-control'
                            onChange={(event) => this.handleChange(event)}>
                        {this.props.projects.map((item) => <option
                            value={item.id}>{item.name}</option>)}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="users">users</label>
                    <select name="users" className='form-control'
                            onChange={(event) => this.handleChange(event)}>
                        {this.props.users.map((item) => <option
                            value={item.id}>{item.username}</option>)}
                    </select>
                </div>
                <input type="submit" className="btn btn-primary" value="Save"/>
            </form>
        );
    }
}

export default TODOForm
