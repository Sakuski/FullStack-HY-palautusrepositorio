import Part from './Part'

const Content = ({ parts }) => {
    
  const total = parts.reduce( (s, p) => {
    return s + p.exercises
  }, 0)

    return (
      <div>
        {parts.map(part =>
          <p key={part.id}>
          <Part part={part.name} exercises={part.exercises} />
          </p>
        )}
        <p><b>Total of {total} exercises</b></p>
      </div>
    )
  }

  export default Content