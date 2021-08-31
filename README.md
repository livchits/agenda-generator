# Agenda Generator

Se trata de una app hecha en React que consume datos de una API para generar texto en dos formatos con la información de las actividades de una agenda. Los datos originalmente son cargados en una planilla de Google Sheets para luego ser consumidos, procesados y expuestos por una serverless function que se ejecuta en Vercel.

El objetivo de la aplicación es obtener el texto de la agenda con dos formatos con solo presionar un botón y cargando los datos una sola vez. Antes esta tarea se realizaba en Google Docs y para obtener el resultado final era necesario duplicar el texto para darle los distintos formatos.

## Herramientas utilizadas

- React
- TailwindCSS
- Axios
- Papaparse
- ViteJS
- Google Sheets
- Vercel Serverless Functions
