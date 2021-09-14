import React from 'react';
import './App.css';

interface LoginFormState {
    username : string;
    password : string;
    result : string;
}

    export default class LoginForm extends React.Component<{}, LoginFormState> {
    constructor (props: LoginFormState) {
        super(props)
        this.state = {
            username : "",
            password : "",
            result : "",
        };
        this.handleLogin = this.handleLogin.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
        this.updateUsername = this.updateUsername.bind(this);
        this.updatePassword = this.updatePassword.bind(this);
    }
    handleLogin(event : any) {
        let socket = new WebSocket("ws://localhost:8888");
        socket.onopen = (event : Event) => {
            socket.send(JSON.stringify({
                request_type: "LOGIN",
                username: this.state.username,
                password: this.state.password
            }));
        }
        socket.onerror = (event : Event) => {
            this.setState({
                result : "ERROR",
            })
        }
            
        socket.onmessage = (event : MessageEvent) => {
            this.setState({
                result : event.data,
            })
        }
    }
    handleRegister(event : any) {

    }
    updateUsername(event :any) {
        
        this.setState({username : event.target.value, password : this.state.password});
    }
    updatePassword(event :any) {
        this.setState({username : this.state.username, password : event.target.value});
    }

    render() {
        return (
            <div>
                <form className="LoginForm">
                    <h1 className="LoginForm-header">Login</h1>
                    <label className="LoginForm-item">Name</label><input type="text" name="name" onChange={this.updateUsername}/>
                    <label className="LoginForm-item">Password</label><input type="text" name="password" onChange={this.updatePassword}/>
                    <input type="button" className="LoginForm-button" value="Login" onClick={this.handleLogin}/>
                    <input type="button" className="LoginForm-button" value="Register" onClick={this.handleRegister}/>
                </form>
                <p className="LoginForm-result">{this.state.result}</p>
            </div>
        );
    }
}