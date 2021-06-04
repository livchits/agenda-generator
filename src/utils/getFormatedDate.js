function getFormatedDate() {
  const now = new Date().getTime();
  const tomorrow = new Date(now + 86400000);
  const day = new Intl.DateTimeFormat('es-AR', { weekday: 'long' }).format(tomorrow); //'martes'
  const date = tomorrow.getDate(); //1 (número del día, fecha)
  const month = new Intl.DateTimeFormat('es-AR', { month: 'long' }).format(tomorrow); //'junio'

  return `${day} ${date} de ${month}`;
}

export default getFormatedDate;
