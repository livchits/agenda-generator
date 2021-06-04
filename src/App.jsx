import * as React from 'react';

import Container from './components/Container';
import Footer from './components/Footer';
import Form from './components/Form';

function App() {
  return (
    <Container>
      <main>
        <section className='px-2 text-center'>
          <h1 className='py-8 mt-2 text-4xl font-black text-white'>
            Generador de agenda
          </h1>
          <p className='text-lg leading-snug text-indigo-200'>
            Obtenga la agenda en dos versiones: texto con formato y para enviar por
            Whatsapp
          </p>
        </section>
        <Form />
      </main>
      <Footer />
    </Container>
  );
}

export default App;
