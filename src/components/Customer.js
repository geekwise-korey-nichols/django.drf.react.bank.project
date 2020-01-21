import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';
import CreateCustomer from "./CreateCustomer";

export default class Customer extends Component{
    constructor(props) {
        super(props);
        this.state = {
            activeItem: {
                customer_name: "",
                customer_email: ""
            },
            customers: [],
            // url: "https://bank-backend-korey.herokuapp.com",
            url: "http://localhost:8000"
        }
    };
    
componentDidMount() {
    this.refreshCustomerList();
}

refreshCustomerList() {
    axios
        .get(`${this.state.url}/customer/`)
        .then(res => this.setState({customers: res.data}))
        .catch(err => console.log(err));
}

createCustomer = () => {
    const customer = {customer_name: "", customer_email: "", branch: `${this.state.url}/branch/${this.props.bankId}/`};
    this.setState({ activeItem: customer, modal: !this.state.modal});
  };

  // set customer to only have name, email and branch
editCustomer = target_customer => {
    console.log(target_customer)
    const customer = {id: target_customer.id, customer_name: target_customer.customer_name, customer_email: target_customer.customer_email, branch: `${this.state.url}/branch/${this.props.bankId}/`};
    this.setState({ activeItem: customer, modal: !this.state.modal });
}



handleDelete(item) {
    axios
          .delete(`${this.state.url}/customer/${item.id}`)
          .then(res => this.refreshCustomerList())
          .catch(err => console.log(err));
  }

renderCustomers() {
    let customers = []
    customers = this.state.customers
    return customers.map(customer => (
        <div key={customer.id}>
            {this.props.bankId === customer.branch_id &&
                <li className="list-group-item d-flex justify-content-between align-items-center" key={customers.id}>
                    {customer.customer_name}
                    <button
                        onClick={() => this.editCustomer(customer)}
                    >
                        Edit{" "}
                    </button>
                    <button
                        onClick={() => this.handleDelete(customer)}
                    >
                        Delete{" "}
                    </button>
                </li>
            }
        </div>
    ))
}

toggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  handleSubmit = item => {
    this.toggle();
    console.log(item)
    if(item.id){
        axios
            .put(`${this.state.url}/customer/${item.id}/`, item)
            .then(res => this.refreshCustomerList())
            .catch(err => console.log(err));
        return;
    }
      axios
        .post(`${this.state.url}/customer/`, item)
        .then(res => this.refreshCustomerList())
        .catch(err => console.log(err));
       };

render() {
    return (
        <div>
            <main className="content">
                <div className="row ">
                    <div className="col-md-6 col-sm-10 mx-auto p-0">
                        <div className="card p-3">
                        <ul className="list-group list-group-flush">{this.renderCustomers()}</ul>
            <button onClick={this.createCustomer} className="">
                      New Customer
                    </button>
            {this.state.modal ? (
              <CreateCustomer
                bankId={this.props.bankId}
                activeItem={this.state.activeItem}
                toggle={this.toggle}
                onSave={this.handleSubmit}
              />
            ) : null}  
             </div>
            </div>
            </div>
            </main>    
        </div>  
    )  
}
}
