import React, { Component } from "react";
import Router from "./router/Router";
import { v4 as uuidv4 } from "uuid";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            input: {
                name: "",
                email: "",
                subject: "",
                category: "",
                message: "",
            },
            contacts: JSON.parse(localStorage.getItem("contacts")) || [],
            currentId: -1,
        };
        this.handleEdit = this.handleEdit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        localStorage.setItem("contacts", JSON.stringify(this.state.contacts));
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.contacts !== this.state.contacts) {
            localStorage.setItem(
                "contacts",
                JSON.stringify(this.state.contacts)
            );
        }
    }

    handleSubmit = (values, callBackAction) => {
        const { name, email, subject, category, message } = values;
        this.setState(
            (prevState) => {
                let newContacts = [...prevState.contacts];
                if (this.state.currentId === -1) {
                    newContacts.push({
                        id: uuidv4(),
                        name,
                        email,
                        subject,
                        category,
                        message,
                    });
                } else {
                    let userIndex = newContacts.findIndex(
                        (contact) => contact.id === this.state.currentId
                    );
                    newContacts[userIndex] = {
                        id: this.state.currentId,
                        name,
                        email,
                        subject,
                        category,
                        message,
                    };
                }
                localStorage.setItem("contacts", JSON.stringify(newContacts));
                return {
                    contacts: newContacts,
                    input: {
                        name: "",
                        email: "",
                        subject: "",
                        category: "",
                        message: "",
                    },
                    currentId: -1,
                };
            },
            () => {
                callBackAction;
            }
        );
    };

    handleEdit(event, callBackAction) {
        let idContact = event.target.value;
        this.setState((prevState) => ({
            currentId: idContact,
            input: {
                ...prevState.input,
                ...this.state.contacts.find(
                    (contact) => contact.id === idContact
                ),
            },
        }));
        callBackAction;
    }

    handleDelete = (event) => {
        let idContact = event.target.value;
        this.setState((prevState) => ({
            contacts: prevState.contacts.filter(
                (contact) => contact.id !== idContact
            ),
        }));
    };

    render() {
        return (
            <div
                className="bg-white dark:bg-gray-500"
                style={{ height: "100vh" }}
            >
                <Router
                    contacts={this.state.contacts}
                    handleEdit={this.handleEdit}
                    handleDelete={this.handleDelete}
                    input={this.state.input}
                    handleSubmit={this.handleSubmit}
                />
            </div>
        );
    }
}

export default App;
