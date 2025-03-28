"use client";
export default function Card({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className='p-4 bg-white/10 rounded-lg shadow-neon text-center'>
      <h2 className='text-neon text-xl'>{title}</h2>
      <p className='text-white text-3xl font-bold'>{value}</p>
    </div>
  );
}
