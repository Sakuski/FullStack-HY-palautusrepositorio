import { useState, useEffect } from 'react'
import axios from 'axios'

const Input = (props) => {

  const handleChange = (event) => {
    props.change(event.target.value)
  }
  
  return (
    <div>
      {props.text}<input
        value={props.value}
        onChange={handleChange}
      />
    </div>
  )
}

const PersonForm = (props) => {

  return (
    <div>
      <form onSubmit={props.addPerson}>
        <Input text={'name:'} value={props.newName} change={props.setNewName}/>
        <Input text={'number:'} value={props.newNumber} change={props.setNewNumber}/>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}

const Persons = (props) => {
  const persons = props.persons
  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(props.newFilter.toLowerCase()))

  return (
    <>
      {personsToShow.map(person =>
        <div key={person.name}>
          {person.name} {person.number}
        </div>  
      )}
    </>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const person = {
      name: newName,
      number: newNumber
    }
    if(!persons.map(x => x.name).includes(person.name)) {
      setPersons(persons.concat(person))
    } else {
      alert(`${newName} is already added to phonebook`)
    }
    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Input text={'filter shown with:'} value={newFilter} change={setNewFilter} />
      <h2>add a new</h2>
      <PersonForm addPerson={addPerson} newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber}/>
      <h2>Numbers</h2>
      <Persons persons={persons} newFilter={newFilter} />
    </div>
  )

}

export default App