import React, { Component } from 'react';
import '../App.css';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form,
    FormGroup,
    Input,
    Label
  } from "reactstrap";

export default class CreateCustomer extends Component{
    constructor(props) {
        super(props);
        this.state = {
            testItem: this.props.activeItem,
            activeItem: this.props.activeItem
        }
    };

    handleChange = e => {
      let { name, value } = e.target;
      const activeItem = { ...this.state.activeItem, [name]: value };
      this.setState({ activeItem });
    };

  render() {
      console.log(this.state.testItem)
      const { toggle, onSave } = this.props;
      return(
          <Modal isOpen={true} toggle={toggle}>
          <ModalHeader toggle={toggle}> Customer Info </ModalHeader>
          <ModalBody>
          <Form>
                  <FormGroup>
                    <Label for="customer_name">Customer Name</Label>
                    <Input
                      type="text"
                      name="customer_name"
                      value={this.state.activeItem.customer_name}
                      onChange={this.handleChange}
                      placeholder="Enter customer name"
                      maxLength="256"
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="customer_email">Customer Email</Label>
                    <Input
                      type="text"
                      name="customer_email"
                      value={this.state.activeItem.customer_email}
                      onChange={this.handleChange}
                      placeholder="Enter customer email"
                      maxLength="256"
                    />
                  </FormGroup>
                </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="success" onClick={() => onSave(this.state.activeItem)}>
              Save
            </Button>
          </ModalFooter>
        </Modal>
      )
  }
}