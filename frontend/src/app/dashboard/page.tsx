import Card from "../../components/Card";

export default function DashboardPage() {
  return (
    <div className='p-6'>
      <h1 className='text-3xl text-neon mb-4'>Dashboard</h1>
      <div className='grid grid-cols-3 gap-4'>
        <Card title='Total Messages' value='1524' />
        <Card title='Active Users' value='128' />
        <Card title='AI Accuracy' value='92%' />
      </div>
    </div>
  );
}
