import { useState } from 'react'

const Header = (props) => {
  return (
  <div>
    <h1>{props.title}</h1>
  </div>
  )
}

const Button = (props) => {
  const {label, amount, setAmount} = props
  return (
    <>
      <button onClick={() => setAmount(amount + 1)}>
        {label}
      </button>
    </>
  )
}

const StatLine = (props) => {
  return (
    <>
      <td>{props.name}</td><td>{props.amount}</td>
    </>
  )
}

const Statistics = (props) => { 
  const good = props.good
  const neutral = props.neutral
  const bad = props.bad
  const all = good + neutral + bad
  const average = (good*1 + neutral*0 + bad*(-1))/all
  const positive = good / all

  if(all > 0) {
    return (
      <>
        <table>
          <tbody>
            <tr><StatLine name={'good'} amount={good}/></tr>
            <tr><StatLine name={'neutral'} amount={neutral}/></tr>
            <tr><StatLine name={'bad'} amount={bad}/></tr>
            <tr><StatLine name={'all'} amount={all}/></tr>
            <tr><StatLine name={'average'} amount={average}/></tr>
            <tr><StatLine name={'positive'} amount={positive}/><td>%</td></tr>
          </tbody>
        </table>
      </>
    )
  } else {
    return (
      <>
        No feedback given
      </>
    )
  }
  
}

const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const title = 'give feedback'
  const subTitle = 'statistics'

  return (
    <div>
      <Header title={title}/>

      <p>
        <Button label={'good'} amount={good} setAmount={setGood}/>
        <Button label={'neutral'} amount={neutral} setAmount={setNeutral}/>
        <Button label={'bad'} amount={bad} setAmount={setBad}/>
      </p>

      <Header title={subTitle}/>
      
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App;
