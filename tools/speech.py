import base64
from google.cloud import speech
from pydub import AudioSegment
import io
import os

def transcribe_mp3_audio(mp3_bytes, language_code="es-MX"):
    try:
        # Convert MP3 bytes to an AudioSegment
        mp3_audio = AudioSegment.from_mp3(io.BytesIO(mp3_bytes))

        # Export the AudioSegment as FLAC format to bytes
        flac_data = mp3_audio.export(format="flac").read()

        # Configure the recognition
        config = speech.RecognitionConfig(
            language_code=language_code,
        )

        # Create a speech client
        client = speech.SpeechClient()

        # Perform speech recognition
        audio = speech.RecognitionAudio(content=flac_data)
        response = client.recognize(config=config, audio=audio)

        # Extract and return the transcript
        transcripts = [result.alternatives[0].transcript for result in response.results]
        return "\n".join(transcripts)

    except Exception as e:
        return str(e)

# Usage example:
if __name__ == "__main__":
    os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = 'credentials.json'
    with open("audio.mp3", "rb") as audio_file:
        mp3_bytes = audio_file.read()
        transcript = transcribe_mp3_audio(mp3_bytes)
        print(transcript)