import * as React from 'react';

import Container from './components/Container';
import Footer from './components/Footer';
import Form from './components/Form';

function App() {
  const [schedule, setSchedule] = React.useState({
    data: null,
    error: null,
    status: 'idle',
  });

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
        <Form setSchedule={setSchedule} />
      </main>
      <Footer />
    </Container>
  );
}

export default App;
