# app.py
import os
from flask import Flask, request, render_template
from werkzeug.utils import secure_filename
from google.cloud import storage
from db_functions import *
from google.cloud import documentai_v1beta3 as documentai
from document_ai import get_content


app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = 'uploads'
app.config['ALLOWED_EXTENSIONS'] = {'txt', 'pdf'}  # Add allowed file extensions

# Configure Google Cloud Storage
os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = 'credentials.json'
storage_client = storage.Client()
bucket_name = os.environ.get('BUCKET_NAME')
bucket = storage_client.bucket(bucket_name)

@app.route('/')
def index():
    return render_template('index.html')

from flask import request

@app.route('/upload', methods=['POST'])
def upload():
    if 'file' not in request.files:
        return 'No file part'

    file = request.files['file']
    subject_name = request.form.get('subject_name')
    
    if file.filename == '':
        return 'No selected file'

    if file and subject_name:
        file_name = secure_filename(file.filename)
        file_name = file_name.replace(' ', '_')
        
        # Check the file extension
        file_extension = os.path.splitext(file_name)[1].lower()
        
        if file_extension in ['.pdf', '.txt']:
            # Handle PDF and TXT files
            process_pdf_txt_file(file, file_name, subject_name)
        elif file_extension in ['.jpeg', '.png', '.jpg', '.webp']:
            # Handle image files with OCR and directly upload the TXT file
            txt_blob_name = process_image_with_ocr(file, file_name, subject_name)
            return f'File uploaded successfully to Google Cloud Storage as {txt_blob_name}'
        else:
            return 'Unsupported file type'

        return 'File uploaded successfully to Google Cloud Storage and added to the database'
    
    return 'File uploaded successfully to Google Cloud Storage'

def process_pdf_txt_file(file, file_name, subject_name):
    # Check if a document with the same name already exists
    if document_exists(file_name):
        return 'Document with the same name already exists'
    
    # Upload the file to Google Cloud Storage
    blob = bucket.blob(file_name)
    blob.upload_from_file(file)

    # Get the subject_id based on subject_name
    subject_id = get_subject_id(subject_name)

    # Insert a new row into the file table
    insert_file_record(subject_id, file_name)

def process_image_with_ocr(file, file_name, subject_name):

    # Extract the text content from the OCR result

    extracted_text = get_content(file.read(), file_name)

    # Create a new TXT blob with the extracted text
    txt_blob_name = os.path.splitext(file_name)[0] + '.txt'
    txt_blob = bucket.blob(txt_blob_name)
    txt_blob.upload_from_string(extracted_text)

    # Get the subject_id based on subject_name
    subject_id = get_subject_id(subject_name)

    # Insert a new row into the file table for the TXT file
    insert_file_record(subject_id, txt_blob_name)

    return txt_blob_name

@app.route('/delete_file', methods=['POST'])
def delete_file():
    file_name = request.form.get('file_name')

    if not file_name:
        return 'No file name provided'

    file_name = file_name.replace(' ', '_')

    # Delete the file record from the database
    if delete_file_record(file_name):
        # Delete the file from Google Cloud Storage
        if delete_file_from_storage(file_name):
            return 'File deleted successfully from the database and Google Cloud Storage'
        else:
            return 'Failed to delete the file from Google Cloud Storage'
    else:
        return 'Failed to delete the file record from the database'

def delete_file_from_storage(file_name):
    try:
        # Delete the file from Google Cloud Storage
        blob = bucket.blob(file_name)
        blob.delete()

        return True

    except Exception as e:
        print("Google Cloud Storage error:", e)
        return False

@app.route('/add_subject', methods=['POST'])
def add_subject():
    subject_name = request.form.get('subject_name')

    if not subject_name:
        return 'No subject name provided'

    # Check if the subject already exists in the database
    if subject_exists(subject_name):
        return 'Subject already exists in the database'

    # If the subject doesn't exist, add it to the database
    if insert_subject(subject_name):
        return 'Subject added to the database'
    else:
        return 'Failed to add the subject to the database'


# for my flask app, create two routes
# 1 /login
# receives two parameters, user and password
# looks in a local sqlite3 database called files.db 
# checks in a table called users if 