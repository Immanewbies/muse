CREATE TABLE User (
    user_id int PRIMARY KEY AUTO_INCREMENT NOT NULL,
    username VARCHAR(16) NOT NULL,
    password VARCHAR(16) NOT NULL,
    profile_name VARCHAR(16) NOT NULL
);

CREATE TABLE Category (
    category_id int PRIMARY KEY AUTO_INCREMENT NOT NULL,
    category_name VARCHAR(16) NOT NULL
);

CREATE TABLE Difficulty (
    difficulty_id int PRIMARY KEY AUTO_INCREMENT NOT NULL,
    difficulty_name VARCHAR(16) NOT NULL
);

CREATE TABLE Note (
    note_id int PRIMARY KEY AUTO_INCREMENT NOT NULL,
    note_name VARCHAR(2) NOT NULL,
    img_src VARCHAR(255) NOT NULL,
    audio_src VARCHAR(255) NOT NULL
);

CREATE TABLE Chord (
    chord_id int PRIMARY KEY AUTO_INCREMENT NOT NULL,
    chord_name VARCHAR(11) NOT NULL,
    chord_note VARCHAR(2) NOT NULL,
    chord_tension VARCHAR(11) NOT NULL,
    img_src VARCHAR(255) NOT NULL,
    audio_src VARCHAR(255) NOT NULL
);

CREATE TABLE Scale (
    scale_id int PRIMARY KEY AUTO_INCREMENT NOT NULL,
    scale_name VARCHAR(11) NOT NULL,
    scale_note VARCHAR(2) NOT NULL,
    scale_tension VARCHAR(11) NOT NULL,
    img_src VARCHAR(255) NOT NULL,
    audio_src VARCHAR(255) NOT NULL
);

CREATE TABLE Quiz (
    quiz_set_id int PRIMARY KEY AUTO_INCREMENT NOT NULL,
    category_id int NOT NULL,
    difficulty_id int NOT NULL,
    FOREIGN KEY (category_id) REFERENCES Category(category_id),
    FOREIGN KEY (difficulty_id) REFERENCES Difficulty(difficulty_id)
);

CREATE TABLE Score (
    score_id int PRIMARY KEY AUTO_INCREMENT NOT NULL,
    user_id int NOT NULL,
    quiz_set_id int NOT NULL,
    score int NOT NULL,
    submit_date DATETIME NOT NULL,
    FOREIGN KEY (user_id) REFERENCES User(user_id),
    FOREIGN KEY (quiz_set_id) REFERENCES Quiz(quiz_set_id)
);

CREATE TABLE Question (
    question_id int PRIMARY KEY AUTO_INCREMENT NOT NULL,
    quiz_set_id int NOT NULL,
    question_text VARCHAR(255) NOT NULL,
    FOREIGN KEY (quiz_set_id) REFERENCES Quiz(quiz_set_id)
);

CREATE TABLE Choice (
    choice_id int PRIMARY KEY AUTO_INCREMENT NOT NULL,
    question_id int NOT NULL,
    choice_text VARCHAR(255) NOT NULL,
    is_correct int(1) NOT NULL,
    FOREIGN KEY (question_id) REFERENCES Question(question_id)
);

CREATE TABLE SubQuestion (
    sub_question_id int PRIMARY KEY AUTO_INCREMENT NOT NULL,
    question_id int NOT NULL,
    note_id int NOT NULL,
    chord_id int NOT NULL,
    sub_question_position int(1) NOT NULL,
    FOREIGN KEY (question_id) REFERENCES Question(question_id),
    FOREIGN KEY (note_id) REFERENCES Note(note_id),
    FOREIGN KEY (chord_id) REFERENCES Chord(chord_id)
);

CREATE TABLE ScaleNote (
    scale_note_id int PRIMARY KEY AUTO_INCREMENT NOT NULL,
    scale_id int NOT NULL,
    note_id int NOT NULL,
    FOREIGN KEY (scale_id) REFERENCES Scale(scale_id),
    FOREIGN KEY (note_id) REFERENCES Note(note_id)
);

CREATE TABLE ScaleChord (
    scale_chord_id int PRIMARY KEY AUTO_INCREMENT NOT NULL,
    scale_id int NOT NULL,
    chord_id int NOT NULL,
    FOREIGN KEY (scale_id) REFERENCES Scale(scale_id),
    FOREIGN KEY (chord_id) REFERENCES Chord(chord_id)
);

CREATE TABLE ChordNote (
    chord_note_id int PRIMARY KEY AUTO_INCREMENT NOT NULL,
    chord_id int NOT NULL,
    note_id int NOT NULL,
    FOREIGN KEY (chord_id) REFERENCES Chord(chord_id),
    FOREIGN KEY (note_id) REFERENCES Note(note_id)
);

INSERT INTO User (username, password, profile_name) VALUES("admin", "@admin123456789", "admin");
INSERT INTO Category (category_name) VALUES("Quiz");
INSERT INTO Category (category_name) VALUES("Note");
INSERT INTO Category (category_name) VALUES("Chord");
INSERT INTO Difficulty (difficulty_name) VALUES("Easy");
INSERT INTO Difficulty (difficulty_name) VALUES("Normal");
INSERT INTO Difficulty (difficulty_name) VALUES("Hard");
INSERT INTO Note (note_name, img_src, audio_src) VALUES("C", "C:/" ,"C:/");
INSERT INTO Chord (chord_name,chord_note,chord_tension, img_src, audio_src) VALUES("C","C","Major", "C:/" ,"C:/");
INSERT INTO Chord (chord_name,chord_note,chord_tension, img_src, audio_src) VALUES("Cm","C","Minor", "C:/" ,"C:/");
INSERT INTO Chord (chord_name,chord_note,chord_tension, img_src, audio_src) VALUES("Cmaj7","C","Major 7","C:/" ,"C:/");
INSERT INTO Chord (chord_name,chord_note,chord_tension, img_src, audio_src) VALUES("Cm7","C","Minor 7","C:/" ,"C:/");
INSERT INTO Scale (scale_name, scale_note,scale_tension, img_src, audio_src) VALUES("C Major","C","Major", "C:/" ,"C:/");
INSERT INTO Scale (scale_name,scale_note,scale_tension, img_src, audio_src) VALUES("C Minor","C","Minor", "C:/" ,"C:/");

INSERT INTO Chord (chord_name,chord_note,chord_tension, img_src, audio_src) VALUES("D","D","Major", "C:/" ,"C:/");
INSERT INTO Chord (chord_name,chord_note,chord_tension, img_src, audio_src) VALUES("Dm","D","Minor", "C:/" ,"C:/");
INSERT INTO Chord (chord_name,chord_note,chord_tension, img_src, audio_src) VALUES("Dmaj7","D","Major 7","C:/" ,"C:/");
INSERT INTO Chord (chord_name,chord_note,chord_tension, img_src, audio_src) VALUES("Dm7","D","Minor 7","C:/" ,"C:/");