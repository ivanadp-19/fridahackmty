# DocumentAI File Upload and Management API

## API Endpoints

### 1. Upload a Document

- **Endpoint:** `/upload`
- **Method:** `POST`
- **Parameters:**
  - `file`: The document file to upload.
  - `subject_name`: The name of the subject associated with the document.

This endpoint allows you to upload documents. Supported file types include `.pdf`, `.txt`, `.jpeg`, `.png`, `.jpg`, and `.webp`.

### 2. Delete a Document

- **Endpoint:** `/delete_file`
- **Method:** `POST`
- **Parameters:**
  - `file_name`: The name of the document file to delete.

This endpoint allows you to delete a document from both the database and Google Cloud Storage.

### 3. Add a Subject

- **Endpoint:** `/add_subject`
- **Method:** `POST`
- **Parameters:**
  - `subject_name`: The name of the subject.
  - `thumbnail`: The thumbnail image file for the subject.

This endpoint allows you to add a new subject to the database, including a thumbnail image. Supported image file types include `.png`, `.jpg`, and `.jpeg`.

### 4. Get Subject Names

- **Endpoint:** `/get_subjects`
- **Method:** `GET`

This endpoint retrieves a list of subject names from the database.

### 5. Get Subject Information

- **Endpoint:** `/get_subject/<subject_name>`
- **Method:** `GET`
- **Parameters:**
  - `subject_name`: The name of the subject.

This endpoint retrieves detailed information about a specific subject.

## Prerequisites

Before using the API, make sure you have:

1. Python and Flask installed.
2. Google Cloud Storage credentials (JSON key) stored as `credentials.json`.
3. Access to a Google Cloud Storage bucket.
4. SQLite database (`info.db`) for storing information.

## Running the Application

To run the Flask application, use the following command:

```bash
flask run