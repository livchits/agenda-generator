import * as React from 'react';

import Container from './components/Container';
import Footer from './components/Footer';
import Form from './components/Form';
import Schedule from './components/Schedule';
import useGetSchedule from './hooks/useGetSchedule';

function App() {
  const { data, error, status, setCsvUrl } = useGetSchedule();

  return (
    <Container>
      <main>
        <section className='px-2 text-center'>
          <h1 className='py-8 my-2 text-4xl sm:text-5xl font-black text-white'>
            Generador de agenda
          </h1>
          <p className='mx-auto max-w-md text-lg leading-snug text-indigo-200'>
            Obtenga la agenda en dos versiones: texto con formato y para enviar por
            Whatsapp
          </p>
        </section>
        <Form setCsvUrl={setCsvUrl} status={status} />
      </main>
      {data && <Schedule data={data} />}
      {error && (
        <div className='py-6 mx-auto mb-20 w-4/5 sm:w-3/4 text-2xl font-bold text-center text-indigo-50 bg-indigo-400 rounded-xl'>
          Ups... algo salió mal
        </div>
      )}
      <Footer />
    </Container>
  );
}

export default App;
