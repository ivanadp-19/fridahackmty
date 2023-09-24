import sqlite3
import os

BUCKET_URL = os.environ.get('BUCKET_URL')

def get_info_by_subject_name(subject_name):
    try:
        # Connect to the SQLite database
        conn = sqlite3.connect('info.db')
        cursor = conn.cursor()

        # Execute a SQL query to retrieve names of files for the given subject name
        cursor.execute('''
            SELECT name FROM file
            WHERE subject_id = (SELECT id FROM subject WHERE name = ?)
        ''', (subject_name,))

        # Fetch all matching names and add the prefix
        names = [BUCKET_URL + row[0] for row in cursor.fetchall()]

        # You can process the rows as needed (e.g., return them or print them)
        return names

    except sqlite3.Error as e:
        print("SQLite error:", e)
        return None

    finally:
        # Close the database connection
        if conn:
            conn.close()

def document_exists(filename):
    try:
        conn = sqlite3.connect('info.db')
        cursor = conn.cursor()
        
        cursor.execute('SELECT COUNT(*) FROM file WHERE name = ?', (filename,))
        count = cursor.fetchone()[0]
        
        return count > 0
    
    except sqlite3.Error as e:
        print("SQLite error:", e)
        return False
    
    finally:
        if conn:
            conn.close()

# Function to insert a new row into the file table
def insert_file_record(subject_id, filename):
    try:
        conn = sqlite3.connect('info.db')
        cursor = conn.cursor()
        
        cursor.execute('INSERT INTO file (subject_id, name) VALUES (?, ?)', (subject_id, filename))
        conn.commit()
        
    except sqlite3.Error as e:
        print("SQLite error:", e)
    
    finally:
        if conn:
            conn.close()

# Function to get subject_id based on subject_name
def get_subject_id(subject_name):
    try:
        conn = sqlite3.connect('info.db')
        cursor = conn.cursor()
        
        cursor.execute('SELECT id FROM subject WHERE name = ?', (subject_name,))
        subject_id = cursor.fetchone()[0]
        
        return subject_id
    
    except sqlite3.Error as e:
        print("SQLite error:", e)
        return None
    
    finally:
        if conn:
            conn.close()


def delete_file_record(file_name):
    try:
        conn = sqlite3.connect('info.db')
        cursor = conn.cursor()

        # Execute the SQL DELETE statement based on the file name
        cursor.execute('DELETE FROM file WHERE name = ?', (file_name,))
        conn.commit()

        return True

    except sqlite3.Error as e:
        print("SQLite error:", e)
        return False

    finally:
        if conn:
            conn.close()


def subject_exists(subject_name):
    try:
        conn = sqlite3.connect('info.db')
        cursor = conn.cursor()

        # Check if the subject_name already exists in the subject table
        cursor.execute('SELECT COUNT(*) FROM subject WHERE name = ?', (subject_name,))
        count = cursor.fetchone()[0]

        return count > 0

    except sqlite3.Error as e:
        print("SQLite error:", e)
        return False

    finally:
        if conn:
            conn.close()

def insert_subject(subject_name):
    try:
        conn = sqlite3.connect('info.db')
        cursor = conn.cursor()

        # Insert the subject_name into the subject table
        cursor.execute('INSERT INTO subject (name) VALUES (?)', (subject_name,))
        conn.commit()

        return True

    except sqlite3.Error as e:
        print("SQLite error:", e)
        return False

    finally:
        if conn:
            conn.close()