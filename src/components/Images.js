import React, { Component } from 'react';
import M from 'materialize-css'

class Images extends Component {

    browse(dir) {
        console.log(dir);
        this.socket.send(dir);
        this.setState({currDir: dir});
    }

    constructor(props) {
        super(props);
	this.state = {
	    currDir: "/",
	    dirs: [],
	    imgs: [],
	}
        var socket = new WebSocket( "ws://" + document.domain + ':8000', "images" );
        //this.socket = new WebSocket( "ws://127.0.0.1:8000", "images" );
        this.socket.onopen = () => {
	    console.log("socket open"); 
            this.socket.send(this.state.currDir);
	    this.setState({currDir: "/"});
	}
        this.socket.onclose = function() { console.log("socket close"); }
        this.socket.onmessage = (msg) => {
	    console.log(msg.data)
	    var obj = JSON.parse(msg.data);
	    if(obj["dirs"] !== undefined) {
		let dirs = obj["dirs"].map((dir) => <a onClick={() => this.browse(dir)} className=" blue-grey darken-4 waves-effect waves-light btn-large"><i className="material-icons left">folder</i>{dir}</a>)
		this.setState({dirs: dirs})
	    }
	    if(obj["imgs"] !== undefined) {
		let imgs = obj["imgs"].map((img) => <img className="responsive-img" src={"/Dumps/"+this.state.currDir+"/"+img} />)
		this.setState({imgs: imgs})
	    }
        }

    }

    render() {
        return (
            <div className="container">
		<br />
		{this.state.dirs}
		<br />
                {this.state.imgs}
	    </div>
	)
    }
}

export default Images;
