import { useState, useEffect } from 'react'
import personService from './services/persons'

const Notification = ( {message, success} ) => {
  if(message == null) {
    return null
  }
  if(success) {
    return (
      <div className="success">
      {message}
      </div>
    ) 
  } else {
    return (
      <div className="error">
        {message}
      </div>
    )
  }
}

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

const DeleteButton = (props) => {
  const handleDelete = () => {
    const confirmation = window.confirm(`Delete ${(props.persons.find((x) => x.id === props.id)).name}`)
    
    if(confirmation) {
      personService
      .deletePerson(props.id)
      .then(() => {
        const filtered = props.persons.filter((person) => person.id !== props.id)
        props.setPersons(filtered)
        props.setSuccessMessage(
          `Deleted ${props.persons.find((x) => x.id === props.id).name}`
        )
        setTimeout(() => {
          props.setSuccessMessage(null)
        }, 5000)
      })
    }
  }
  
  return (
    <>
      <button onClick={handleDelete}>
        delete
      </button>
    </>
  )
}

const Persons = (props) => {
  const persons = props.persons
  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(props.newFilter.toLowerCase()))

  return (
    <>
      {personsToShow.map(person =>
        <div key={person.id}>
          {person.name} {person.number} <DeleteButton id={person.id} persons={props.persons} setPersons={props.setPersons} setSuccessMessage={props.setSuccessMessage} />
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
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(persons.concat(response.data))
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const person = {
      name: newName,
      number: newNumber
    }
    
    if(persons.some((x) => x.name === newName)) {
      const existing = persons.find((y) => y.name === newName)
      const newPerson = { ...existing, number: newNumber }
      const id = existing.id

      const confirmation = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
      if(confirmation) {
        personService
          .update(id, newPerson)
          .then(response => {
            setPersons(
              persons.map((person) =>
                person.id !== id ? person : response.data
              )
            )
            setSuccessMessage(
              `Changed the number of ${person.name} to ${person.number}`
            )
            setTimeout(() => {
              setSuccessMessage(null)
            }, 5000)
          })
          .catch(error => {
            setErrorMessage(
              `Information of ${person.name} has already been removed from server`
            )
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          })  
      }
      setNewName('')
      setNewNumber('')
      return
    }

    personService
      .create(person)
      .then(response => {
        setPersons(persons.concat(response.data))
        setNewName('')
        setNewNumber('')
        setSuccessMessage(
          `Added ${person.name}`
        )
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
      })
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={successMessage} success={true} />
      <Notification message={errorMessage} success={false}/>
      <Input text={'filter shown with'} value={newFilter} change={setNewFilter} />
      <h2>add a new</h2>
      <PersonForm addPerson={addPerson} newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber}/>
      <h2>Numbers</h2>
      <Persons persons={persons} newFilter={newFilter} setPersons={setPersons} setSuccessMessage={setSuccessMessage} />
    </div>
  )

}

export default App