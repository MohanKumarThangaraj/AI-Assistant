export default function ProfilePage() {
  return (
    <div className='p-6'>
      <h1 className='text-3xl text-neon mb-4'>User Profile</h1>
      <div className='p-4 bg-white/10 rounded-lg shadow-neon'>
        <p className='text-white'>
          <strong>Name:</strong> John Doe
        </p>
        <p className='text-white'>
          <strong>Email:</strong> johndoe@example.com
        </p>
      </div>
    </div>
  );
}
