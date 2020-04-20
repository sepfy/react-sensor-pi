import React, { Component } from 'react';
import M from 'materialize-css'
import './App.css';


function preview(base64_image) { 
    var image = document.getElementById('image');
    image.src = "data:image/jpeg;base64," + base64_image; 
}

function detect(detect_results) {
    var content = document.getElementById('detect');
    var str = JSON.stringify(detect_results, undefined, 4);
    content.innerHTML = str;
}

const pre_style = {
  fontSize: "24px"
};

class App extends Component {

    constructor(props) {
        super(props);
        document.addEventListener('DOMContentLoaded', function() {
                var elems = document.querySelectorAll('.sidenav');
                var instances = M.Sidenav.init(elems, {});
                });


        var socket = new WebSocket( "ws://" + document.domain + ':8000', "preview" );
        socket.onopen = function() { console.log("socket open"); }
        socket.onclose = function() { console.log("socket close"); }
        socket.onmessage = function(msg) {
            //console.log("socket message: " + msg.data);
            var obj = JSON.parse(msg.data);
            if(obj["detect"] !== undefined) {
                detect(obj["detect"]);
            }
            else if(obj["base64"] !== undefined) {
                preview(obj["base64"]); 
            }
        }



    }

    render() {
        return (
                <div>
                <nav>
                <div className="nav-wrapper blue-grey darken-4">
                <a href="#" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></a>
                <ul id="nav-mobile" className="hide-on-med-and-down">
                <li><a href="/"><i className="material-icons left">remove_red_eye</i>Preview</a></li>
                </ul>
                </div>
                <ul className="sidenav" id="mobile-demo">
                <li><a href="/"><i className="material-icons left">remove_red_eye</i>Preview</a></li>
                </ul>
                </nav>
                <br />
                <div className="container">
                <div className="row">
                <div className="col s12 l6">
                <img className="responsive-img" id="image" alt="Preview" />
                </div>

                <div className="col s12 l6">
                  <pre style={pre_style} id="detect"></pre>
                </div>
                </div>
                </div>
                </div>

                );
    }
}

export default App;
