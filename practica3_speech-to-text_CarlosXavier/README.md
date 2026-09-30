# Práctica 3 - Speech-to-Text con Flask y Gemini

## Autor

**Carlos Eduardo Xavier Pereira**

---

# Descripción del Proyecto

El objetivo de esta práctica es desarrollar una solución Speech-to-Text utilizando una API desarrollada con Flask y la API de Gemini.

La aplicación es capaz de recibir archivos de audio enviados por un cliente, almacenarlos temporalmente en el servidor, enviarlos a Gemini para su procesamiento y devolver la transcripción obtenida en formato JSON.

Además, se realiza una comparación entre dos métodos diferentes de transcripción de voz:

- Web Speech API.
- Gemini API.

---

# Objetivos

## Speech-to-Text

Implementar un sistema capaz de:

- Recibir archivos de audio.
- Procesar peticiones HTTP mediante Flask.
- Enviar audios a Gemini.
- Obtener una transcripción automática.
- Devolver respuestas en formato JSON.

---

## Desarrollo de API

Implementar un endpoint capaz de:

- Recibir un archivo de audio.
- Guardar el archivo en el servidor.
- Procesarlo mediante Gemini.
- Devolver la transcripción al cliente.

---

# Tecnologías Utilizadas

- Python 3
- Flask
- Gemini API
- Google GenAI SDK
- JSON
- HTTP
- REST API

---

# Estructura del Proyecto

```text
practica3_speech-to-text_CarlosXavier/
│
├── audios/
│
├── app.py
│
├── README.md
│
└── requirements.txt
```

---

# Instalación

## Instalar Flask

```bash
pip install flask
```

## Instalar Google GenAI

```bash
pip install google-genai
```

## Comprobar la instalación

```bash
pip show flask
```

```bash
pip show google-genai
```

---

# Configuración de la API Key

Es necesario disponer de una API Key válida de Gemini.

Configurar la clave dentro del archivo:

```python
client = genai.Client(api_key="TU_API_KEY")
```

Por motivos de seguridad, la API Key real no debe publicarse en repositorios públicos.

---

# Funcionamiento de la API

La aplicación utiliza Flask para crear un servidor web local.

Una vez iniciada, la API escucha peticiones en:

```text
http://127.0.0.1:5000
```

---

## Endpoint Principal

### Ruta

```text
/
```

### Método

```text
GET
```

### Respuesta

```text
API Speech-to-Text funcionando
```

Este endpoint permite verificar que el servidor Flask se encuentra operativo.

---

## Endpoint de Transcripción

### Ruta

```text
/transcribir
```

### Método

```text
POST
```

### Función

Este endpoint recibe un archivo de audio enviado por el cliente, lo almacena temporalmente en el servidor y lo envía a Gemini para obtener su transcripción.

---

# Flujo de Funcionamiento

1. El cliente envía un archivo de audio.
2. Flask recibe la petición.
3. El servidor comprueba que se ha enviado un archivo válido.
4. El audio se almacena en la carpeta `audios`.
5. El archivo se envía a Gemini.
6. Gemini genera la transcripción.
7. La API devuelve una respuesta JSON con el resultado.

---

# Arquitectura de Red

```text
+------------------+
|     Cliente      |
| (Audio .wav/.mp3 |
|      o .m4a)     |
+--------+---------+
         |
         | POST /transcribir
         v
+------------------+
|     Flask API    |
|      app.py      |
+--------+---------+
         |
         | Guarda audio
         v
+------------------+
|     audios/      |
+--------+---------+
         |
         | Envío a Gemini
         v
+------------------+
|    Gemini API    |
+--------+---------+
         |
         | Transcripción
         v
+------------------+
| Respuesta JSON   |
+------------------+
```

---

# Ejemplo de Respuesta JSON

```json
{
    "archivo": "audio.m4a",
    "transcripcion": "Hola, esta es una prueba de transcripción."
}
```

---

# Evidencia de Funcionamiento

Se realizó una prueba real utilizando Postman enviando un archivo de audio al endpoint:

```text
POST /transcribir
```

Archivo utilizado:

```text
Carlos.m4a
```

Respuesta obtenida:

```json
{
    "archivo": "Carlos.m4a",
    "transcripcion": "Hola, mi nombre es Carlos y tengo 20 años."
}
```

La API devolvió correctamente un código:

```text
200 OK
```

confirmando el correcto funcionamiento del endpoint y del proceso de transcripción.

---

# Comparativa: Web Speech API vs Gemini

| Característica | Web Speech API | Gemini |
|---------------|---------------|---------|
| Tiempo real | Sí | No |
| API Key necesaria | No | Sí |
| Coste | Gratuito | Puede tener límites de uso |
| Implementación | Muy sencilla | Más compleja |
| Procesamiento por lotes | No | Sí |
| Precisión | Buena | Generalmente superior |
| Compatibilidad | Navegador | API y aplicaciones |
| Ideal para | Aplicaciones web en tiempo real | Transcripción de audios completos |

---

## Ventajas de la Web Speech API

- Gratuita.
- No requiere API Key.
- Integrada en el navegador.
- Transcripción inmediata en tiempo real.
- Fácil integración con JavaScript.
- Ideal para aplicaciones web interactivas.

---

## Desventajas de la Web Speech API

- Dependencia del navegador.
- Compatibilidad limitada fuera de algunos navegadores.
- Menor precisión en determinadas situaciones.
- No está orientada al procesamiento de grandes cantidades de audio.

---

## Ventajas de Gemini

- Mayor precisión en la transcripción.
- Puede procesar archivos completos.
- Permite trabajar con distintos formatos de audio.
- Adecuada para procesamiento por lotes.
- Fácil integración con servicios backend y APIs.

---

## Desventajas de Gemini

- Requiere una API Key.
- Puede estar sujeto a límites de uso y cuotas.
- Mayor complejidad de configuración.
- Dependencia de servicios externos.

---

# Resultados Obtenidos

Durante el desarrollo de la práctica se consiguió:

- Crear una API REST utilizando Flask.
- Implementar un endpoint para la recepción de archivos de audio.
- Almacenar los audios recibidos en el servidor.
- Integrar la API con Gemini.
- Obtener transcripciones automáticas.
- Devolver respuestas estructuradas en formato JSON.
- Verificar el correcto funcionamiento mediante pruebas realizadas con Postman.

---

# Conclusiones

Esta práctica ha permitido trabajar con tecnologías de reconocimiento de voz e inteligencia artificial mediante la creación de una API basada en Flask.

Se han aplicado conocimientos relacionados con:

- APIs REST.
- Comunicación cliente-servidor.
- Procesamiento de archivos.
- Integración con servicios de inteligencia artificial.
- Transcripción automática de audio.
- Respuestas JSON.

Además, se han comparado dos métodos distintos de Speech-to-Text, identificando las ventajas y limitaciones de cada uno según el contexto de uso.

La solución desarrollada demuestra cómo integrar Gemini en una arquitectura backend para automatizar la transcripción de archivos de audio.

---

# Licencia

Proyecto desarrollado con fines educativos como parte de una práctica de aprendizaje sobre Speech-to-Text, Flask y Gemini.