from typing import Optional

from google.api_core.client_options import ClientOptions
from google.cloud import documentai  # type: ignore
from werkzeug.utils import secure_filename

import os

# TODO(developer): Uncomment these variables before running the sample.
# project_id = "YOUR_PROJECT_ID"
# location = "YOUR_PROCESSOR_LOCATION" # Format is "us" or "eu"
# processor_id = "YOUR_PROCESSOR_ID" # Create processor before running sample
# file_path = "/path/to/local/pdf"
# mime_type = "application/pdf" # Refer to https://cloud.google.com/document-ai/docs/file-types for supported file types
# field_mask = "text,entities,pages.pageNumber"  # Optional. The fields to return in the Document object.
# processor_version_id = "YOUR_PROCESSOR_VERSION_ID" # Optional. Processor version to use
os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = 'credentials.json'

def process_document_sample(
    project_id: str,
    location: str,
    processor_id: str,
    file_content: bytes,
    mime_type: str,
    field_mask: Optional[str] = None,
    processor_version_id: Optional[str] = None,
) -> None:
    # You must set the `api_endpoint` if you use a location other than "us".
    opts = ClientOptions(api_endpoint=f"{location}-documentai.googleapis.com")

    client = documentai.DocumentProcessorServiceClient(client_options=opts)

    if processor_version_id:
        # The full resource name of the processor version, e.g.:
        # `projects/{project_id}/locations/{location}/processors/{processor_id}/processorVersions/{processor_version_id}`
        name = client.processor_version_path(
            project_id, location, processor_id, processor_version_id
        )
    else:
        # The full resource name of the processor, e.g.:
        # `projects/{project_id}/locations/{location}/processors/{processor_id}`
        name = client.processor_path(project_id, location, processor_id)

    # Load binary data
    raw_document = documentai.RawDocument(content=file_content, mime_type=mime_type)

    # Configure the process request
    request = documentai.ProcessRequest(
        name=name, raw_document=raw_document, field_mask=field_mask
    )

    result = client.process_document(request=request)

    # For a full list of `Document` object attributes, reference this page:
    # https://cloud.google.com/document-ai/docs/reference/rest/v1/Document
    document = result.document

    # Read the text recognition output from the processor
    print("The document contains the following text:")
    print(document.text)
    return document.text

def get_mime_type(file_name):
    # Create a dictionary to map file extensions to MIME types
    mime_types = {
        ".pdf": "application/pdf",
        ".gif": "image/gif",
        ".tiff": "image/tiff",
        ".tif": "image/tiff",
        ".jpg": "image/jpeg",
        ".jpeg": "image/jpeg",
        ".png": "image/png",
        ".bmp": "image/bmp",
        ".webp": "image/webp",
    }

    # Get the file extension from the file name
    file_extension = os.path.splitext(file_name)[1]

    # Look up the MIME type in the dictionary
    mime_type = mime_types.get(file_extension.lower())

    if mime_type:
        return mime_type
    else:
        return "Unknown"

def get_mime_type(file_name):
    # Create a dictionary to map file extensions to MIME types
    mime_types = {
        ".pdf": "application/pdf",
        ".gif": "image/gif",
        ".tiff": "image/tiff",
        ".tif": "image/tiff",
        ".jpg": "image/jpeg",
        ".jpeg": "image/jpeg",
        ".png": "image/png",
        ".bmp": "image/bmp",
        ".webp": "image/webp",
    }

    # Get the file extension from the file name
    file_extension = os.path.splitext(file_name)[1]

    # Look up the MIME type in the dictionary
    mime_type = mime_types.get(file_extension.lower())

    if mime_type:
        return mime_type
    else:
        return "Unknown"
        

def get_content(file_bytes: bytes, file_name: str):
    return process_document_sample(os.environ.get('PROJECT_ID'), 'us', os.environ.get('PROCCESSOR_ID'), file_bytes, get_mime_type(file_name))

