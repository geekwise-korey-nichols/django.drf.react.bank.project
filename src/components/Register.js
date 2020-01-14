import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';
import {
    Button,
    Form,
    FormGroup,
    Input,
    Label,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle
  } from 'reactstrap'


export default class Register extends Component{
    constructor(props) {
        super(props);
        this.state = {
            activeItem: {
                username: "",
                email: "",
                password: ""
            },
            Groups: []
        }
    };


    handleChange = e => {
        let { name, value } = e.target;
        const activeItem = { ...this.state.activeItem, [name]: value };
        this.setState({ activeItem });
      };
    
    componentDidMount() {
      this.getGroups();
    }

    getGroups() {
      axios
        .get("http://localhost:8000/users/api/auth/groups")
        .then(res => this.setState({Groups: res.data.Groups}))
        .catch(err => console.log(err))
    }

    renderGroupOptions() {
      console.log(this.state.Groups)
      return this.state.Groups.map(group => (
        <option value={`${group.id}`}>{group.name}</option>
      ))
  }

    onSubmit() {
        console.log(this.state.activeItem)
        axios
            .post("http://localhost:8000/users/api/auth/register", this.state.activeItem)
            .then(res => console.log(res.data))
            .catch(err => console.log(err));
    }


render() {
    return(
        <div>
            <Form>
                  <FormGroup>
                    <Label for="username">User Name</Label>
                    <Input
                      type="text"
                      name="username"
                      value={this.state.activeItem.username}
                      onChange={this.handleChange}
                      placeholder="Enter user name"
                      maxLength="256"
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="email">Email</Label>
                    <Input
                      type="text"
                      name="email"
                      value={this.state.activeItem.email}
                      onChange={this.handleChange}
                      placeholder="Enter email"
                      maxLength="256"
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="password">Password</Label>
                    <Input
                      type="password"
                      name="password"
                      value={this.state.activeItem.password}
                      onChange={this.handleChange}
                      placeholder="Enter password"
                      maxLength="256"
                    />
                  </FormGroup>
                  <FormGroup>
                  <select>
                    {this.renderGroupOptions()}
                  </select> 
                  </FormGroup>
                    <Button color="success" onClick={() => this.onSubmit()}>
                        Submit
                    </Button>
                </Form>
        </div>
    )
}
}
