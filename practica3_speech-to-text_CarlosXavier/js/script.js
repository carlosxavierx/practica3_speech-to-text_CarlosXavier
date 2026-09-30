// Obtener elementos del HTML
const btnIniciar = document.getElementById("btnIniciar");
const btnDetener = document.getElementById("btnDetener");
const transcript = document.getElementById("transcript");

btnDetener.disabled = true;

// Crear reconocimiento de voz
const reconocimiento =
    new (window.SpeechRecognition || window.webkitSpeechRecognition)();



// Configuración
reconocimiento.lang = "es-ES";
reconocimiento.continuous = true;
reconocimiento.interimResults = true;



// Iniciar grabación
btnIniciar.addEventListener("click", () => {



    reconocimiento.start();

    btnIniciar.classList.add("grabando");


    btnIniciar.disabled = true;
    btnDetener.disabled = false;



    transcript.textContent = "Escuchando...";
});



// Detener grabación
btnDetener.addEventListener("click", () => {



    reconocimiento.stop();

    btnIniciar.classList.remove("grabando");



    btnIniciar.disabled = false;
    btnDetener.disabled = true;
});



// Mostrar transcripción
reconocimiento.addEventListener("result", (evento) => {



    let texto = "";



    for (let i = 0; i < evento.results.length; i++) {
        texto += evento.results[i][0].transcript + " ";
    }

    setTimeout(() => {
        transcript.textContent =
            "El texto transcrito aparecerá aquí...";
    }, 10000);

    transcript.textContent = texto;
});



// Mostrar errores
reconocimiento.addEventListener("error", (evento) => {



    transcript.textContent =
        "Error al utilizar el reconocimiento de voz: " + evento.error;
});



// Estado inicial
btnDetener.disabled = true;

const audioFile =
    document.getElementById("audioFile");

const nombreArchivo =
    document.getElementById("nombreArchivo");

audioFile.addEventListener("change", () => {

    if (audioFile.files.length > 0) {

        nombreArchivo.textContent =
            audioFile.files[0].name;

    } else {

        nombreArchivo.textContent =
            "Ningún archivo seleccionado";
    }
});

// =================================
// GEMINI + FLASK
// =================================

const btnEnviar = document.getElementById("btnEnviar");
const transcriptGemini =
    document.getElementById("transcriptGemini");

btnEnviar.addEventListener("click", async () => {

    const archivo =
        audioFile.files[0];

    if (!archivo) {

        alert("Selecciona un archivo de audio.");

        return;
    }

    const formData = new FormData();

    formData.append("audio", archivo);

    try {

        transcriptGemini.textContent =
            "Procesando audio...";

        const response = await fetch(
            "http://127.0.0.1:5000/transcribir",
            {
                method: "POST",
                body: formData
            }
        );

        const data = await response.json();

        if (data.transcripcion) {

            transcriptGemini.textContent =
                data.transcripcion;

        } else {

            transcriptGemini.textContent =
                data.error;
        }

    } catch (error) {

        transcriptGemini.textContent =
            "Error al conectar con Flask.";
    }
});
