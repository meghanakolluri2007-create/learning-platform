// EDIT: put your own name and roll number
const team = [{ name: 'YOUR NAME', roll: 'YOUR ROLL NUMBER' }];

export default function Home() {
  return (
    <div className="card">
      <h1>Online Learning Platform</h1>
      <p>React JS + Spring MVC + MySQL. Browse courses, enroll, take quizzes and track progress.</p>
      <h3>Team Details</h3>
      <ul>{team.map((m) => <li key={m.roll}>{m.name} - {m.roll}</li>)}</ul>
    </div>
  );
}
