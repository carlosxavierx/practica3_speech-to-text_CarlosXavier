from flask import Flask, request, jsonify
from google import genai
import os

app = Flask(__name__)

# API Key de Gemini
client = genai.Client(api_key="TU_API_KEY_AQUI")

# Carpeta para guardar audios
CARPETA_AUDIOS = "audios"

os.makedirs(CARPETA_AUDIOS, exist_ok=True)


@app.route("/")
def inicio():
    return "API Speech-to-Text funcionando"


@app.route("/transcribir", methods=["POST"])
def transcribir():

    try:

        # Comprobar si se ha enviado un audio
        if "audio" not in request.files:
            return jsonify({
                "error": "No se ha enviado ningún archivo de audio"
            }), 400

        audio = request.files["audio"]

        # Guardar el audio temporalmente
        ruta_audio = os.path.join(
            CARPETA_AUDIOS,
            audio.filename
        )

        audio.save(ruta_audio)

        # Subir el archivo a Gemini
        archivo_subido = client.files.upload(
            file=ruta_audio
        )

        # Solicitar transcripción
        respuesta = client.models.generate_content(
            model="gemini-3.8-flash",
            contents=[
                "Transcribe este audio en español.",
                archivo_subido
            ]
        )

        return jsonify({
            "archivo": audio.filename,
            "transcripcion": respuesta.text
        })

    except Exception as e:

        return jsonify({
            "error": str(e)
        }), 500


if __name__ == "__main__":
    app.run(debug=True)