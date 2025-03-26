const commands = [
  {
    command: "Chi-Chi, tell me the weather",
    description: "Get current weather updates.",
  },
  {
    command: "Chi-Chi, play music",
    description: "Plays music from your favorite playlist.",
  },
  {
    command: "Chi-Chi, set a reminder",
    description: "Set a personal reminder.",
  },
];

export default function CommandsPage() {
  return (
    <div className='p-6'>
      <h1 className='text-3xl text-neon mb-4'>Commands List</h1>
      <ul>
        {commands.map((cmd, index) => (
          <li
            key={index}
            className='p-4 bg-white/10 rounded-lg mb-2 shadow-neon'>
            <strong className='text-neon'>{cmd.command}</strong>
            <p className='text-white/80'>{cmd.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
