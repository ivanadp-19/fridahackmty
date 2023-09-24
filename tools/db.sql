CREATE TABLE IF NOT EXISTS subject (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL
    );

CREATE TABLE IF NOT EXISTS file (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        subject_id INTEGER NOT NULL,
        name TEXT NOT NULL,
        FOREIGN KEY (subject_id) REFERENCES subject (id)
    );