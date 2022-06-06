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

const Country = (props) => {
  const country = props.country
  const languages = Object.values(country.languages)

  return (
    <div>
      <h2>{country.name.common}</h2>

      <div>
        capital {country.capital}
      </div>
      <div>
        area {country.area}
      </div>

      <p>
        <b>languages: </b>
      </p>

      <div>
        <ul>
          {languages.map(l =>
            <li key={l}>
              {l}
            </li>
          )}
        </ul>
      </div>

      <p>
        <img src={country.flags.png} alt={''} />
      </p>
    </div>
  )
}

const ShownCountry = (props) => {
  const country = props.country

  return (
    <div>
      {country.name.common} <Button country={country} setFilter={props.setFilter} />
    </div>
  )
  
}

const Button = (props) => {
  const country = props.country
  const handleClick = () => {
    props.setFilter(country.name.common)
  }
  
  return (
    <>
      <button onClick={handleClick}>
        show
      </button>
    </>
  )
}

const Countries = (props) => {
  const countries = props.countries
  const countriesToShow = countries.filter(country => country.name.common.toLowerCase().includes(props.filter.toLowerCase()))

  if(countriesToShow.length > 10) {
    return (
    <div>
      Too many matches, specify another filter
    </div>)
  } else if(countriesToShow.length === 1) {
    return (
      <Country country={countriesToShow[0]}/>
    )
  } else {
    return (
      <div>
        {countriesToShow.map(country =>
          <div key={country.name.common}>
            <ShownCountry country={country} setFilter={props.setFilter} />
          </div>
        )}
      </div>
    )
  }
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])
  console.log('render', countries.length, 'countries')

  return (
    <div>
    <Input text={'find countries'} change={setFilter} />
    <Countries countries={countries} filter={filter} setFilter={setFilter} />
    </div>
  )
}

export default App;
