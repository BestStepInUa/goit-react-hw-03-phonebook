import { Component } from "react";
import { nanoid } from 'nanoid'

import AddContactForm from "components/AddContactForm";
import ContactsList from "components/ContactsList";
import ContactsFilter from "components/ContactsFilter";

import AppContainer from "./App.styled";

export default class App extends Component {
  state = {
  contacts: [
    {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
    {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
    {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
    {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
  ],
  filter: ''  
  }
  
  handleAddContactFormSubmit = ({ name, number }) => {
    const contact = { id: nanoid(), name, number }
    const { contacts } = this.state
    const isDublicated = contacts.find(contact => contact.name === name)
    if (isDublicated) {
      alert(`${name} is already in contacts.`)
      return
    }
    this.setState((prevState) => ({
      contacts: [...prevState.contacts, contact]
    }))
  }

  handleContactsFilter = evt => {        
    this.setState({filter: evt.currentTarget.value})
  }

  getVisibleContacts = () => {
    const { contacts, filter } = this.state
    const normalizedFilter = filter.toLocaleLowerCase()
    return contacts.filter(({name}) => name.toLocaleLowerCase().includes(normalizedFilter))
  }

  deleteContact = (id) => {
    this.setState((prevState) => ({
      contacts: [...prevState.contacts.filter(contact => contact.id !== id)]      
    }))

  }

  render() {
    const { filter } = this.state
    const visibleContacts = this.getVisibleContacts()
    
    return (
      <AppContainer>
        <h1>Phonebook</h1>
        <AddContactForm onFormSubmit={this.handleAddContactFormSubmit} />
        <ContactsFilter value={filter} onFilterChange={this.handleContactsFilter} />
        <ContactsList contacts={visibleContacts} deleteContact={this.deleteContact} />
    </AppContainer>
    )
  }
}