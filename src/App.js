import { Add } from './components/Add.js';
import './App.css';
import { Table } from './components/Table.js';
import { useState } from 'react';

function App() {
  const [jobId, setJobId] = useState('');
  const getJobIdHandler = (id) => {
    //console.log('Id-edited:', id);
    setJobId(id);
  };

  return (
    <div className='container'>
      <main className="main">
        <section className='addJob'>
          <Add id={jobId} setJobId={setJobId} />
        </section>
        <section className='tableJob'>
          <Table getJobId={getJobIdHandler} />
        </section>
      </main>
    </div>

  );
}

export default App;
