import * as React from 'react';

function App() {
  return (
    <main>
      <h1>Generador de agenda</h1>
      <p>
        Ingrese la URL de un archivo CSV y obtenga la agenda en dos versiones: texto con
        formato y lista para enviar por Whatsapp
      </p>
      <form action=''>
        <input id='csv-url' name='csv-url' type='text' />
        <button type='submit'>Dame la agenda</button>
      </form>
    </main>
  );
}

export default App;
