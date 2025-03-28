"use client";
export default function Navbar() {
  return (
    <header className='backdrop-blur-md bg-white/10 border-b border-white/20 shadow-neon text-white p-4 flex justify-between items-center'>
      <h1 className='text-2xl font-bold tracking-wide'>Chi-Chi v2.0</h1>
      <div className='flex items-center gap-4'>
        <button className='px-4 py-2 bg-neon text-black font-bold rounded-lg shadow-neon hover:bg-cyan-400 transition'>
          Settings
        </button>
      </div>
    </header>
  );
}
