import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Preview from './Preview';
import Images from './Images';

import M from 'materialize-css'

class Nav extends Component {

    constructor(props) {
        super(props);
        document.addEventListener('DOMContentLoaded', function() {
                var elems = document.querySelectorAll('.sidenav');
                var instances = M.Sidenav.init(elems, {});
        });

    }

    render() {
        return (
                <nav>
                <div className="nav-wrapper blue-grey darken-4">
                <a href="#" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></a>
                <ul id="nav-mobile" className="hide-on-med-and-down">
                <li><a href="/"><i className="material-icons left">image_search</i>Images</a></li>
                <li><a href="/preview"><i className="material-icons left">remove_red_eye</i>Preview</a></li>
                </ul>
                </div>
                <ul className="sidenav" id="mobile-demo">
                <li><a href="/"><i className="material-icons left">image_search</i>Images</a></li>
                <li><a href="/preview"><i className="material-icons left">remove_red_eye</i>Preview</a></li>
                </ul>
                <Route path="/" exact component={Images} />
                <Route path="/preview" component={Preview} />
                </nav>
               );
    }
}

export default Nav;
