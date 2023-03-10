import React, {Component} from 'react'
import {Link} from "react-router-dom";

class Menu extends Component {
    render() {
        return (
            <div>
                <ul>
                    <li><Link to='/'>Projects</Link></li>
                    <li><Link to='/users'>Users</Link></li>
                    <li><Link to='/todos'>TODOs</Link></li>
                </ul>
            </div>
        );
    }
}

export default Menu;