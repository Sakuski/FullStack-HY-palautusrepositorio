const Header = (props) => {
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}

const Part = (props) => {
  return (
    <div>
      <p>{props.part} {props.exercises}</p>
    </div>
  )
}

const Content = (props) => {
  const first = props.parts[0]
  const second = props.parts[1]
  const third = props.parts[2]
  
  return (
    <div>
      <Part part={first.name} exercises={first.exercises}/>
      <Part part={second.name} exercises={second.exercises}/>
      <Part part={third.name} exercises={third.exercises}/>
    </div>
  )
}

const Total = (props) => {
  const first = props.parts[0]
  const second = props.parts[1]
  const third = props.parts[2]
  
  return (
    <div>
      <p>Number of exercises {first.exercises + second.exercises + third.exercises}</p>
    </div>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </div>
  )
}

export default App;
