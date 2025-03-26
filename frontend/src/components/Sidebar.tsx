export default function Sidebar() {
  return (
    <aside className='w-64 p-4 bg-white/10 backdrop-blur-md shadow-neon h-full'>
      <nav className='flex flex-col gap-4'>
        <a
          href='#'
          className='p-3 bg-neon text-black font-bold rounded-md shadow-neon hover:bg-cyan-400 transition'>
          Chat
        </a>
        <a
          href='#'
          className='p-3 text-white font-bold rounded-md hover:bg-white/20 transition'>
          Commands
        </a>
        <a
          href='#'
          className='p-3 text-white font-bold rounded-md hover:bg-white/20 transition'>
          Settings
        </a>
      </nav>
    </aside>
  );
}
