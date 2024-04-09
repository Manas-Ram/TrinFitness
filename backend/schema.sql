CREATE TABLE Students (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    photo TEXT,
    privileges TEXT
);
CREATE TABLE Teachers (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    photo TEXT,
    privileges TEXT
);
CREATE TABLE Dining (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    privileges TEXT
);
CREATE TABLE Prospective (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    privileges TEXT
);