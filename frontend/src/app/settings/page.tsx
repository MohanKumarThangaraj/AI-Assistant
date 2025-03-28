"use client";
export default function SettingsPage() {
  return (
    <div className='p-6'>
      <h1 className='text-3xl text-neon mb-4'>Settings</h1>
      <div className='p-4 bg-white/10 rounded-lg shadow-neon'>
        <label className='block text-white mb-2'>Enable Dark Mode</label>
        <input
          type='checkbox'
          className='w-6 h-6 bg-transparent border border-white/30'
        />
      </div>
    </div>
  );
}
