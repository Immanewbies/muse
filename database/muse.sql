CREATE TABLE user (
    user_id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    username VARCHAR(16) NOT NULL,
    password VARCHAR(255) NOT NULL,
    profile_name VARCHAR(16) NOT NULL
);

CREATE TABLE category (
    category_id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    category_name VARCHAR(16) NOT NULL
);

CREATE TABLE difficulty (
    difficulty_id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    difficulty_name VARCHAR(16) NOT NULL
);

CREATE TABLE note (
    note_id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    note_name VARCHAR(5) NOT NULL
);

CREATE TABLE chord (
    chord_id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    chord_name VARCHAR(11) NOT NULL,
    chord_note VARCHAR(2) NOT NULL,
    chord_tension VARCHAR(11) NOT NULL,
    piano_src VARCHAR(255) NOT NULL,
    guitar_src VARCHAR(255) NOT NULL
);

CREATE TABLE scale (
    scale_id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    scale_name VARCHAR(11) NOT NULL,
    scale_note VARCHAR(2) NOT NULL,
    scale_tension VARCHAR(11) NOT NULL,
    scale_src VARCHAR(255) NOT NULL
);

CREATE TABLE quiz (
    quiz_set_id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    category_id INT NOT NULL,
    difficulty_id INT NOT NULL,
    FOREIGN KEY (category_id) REFERENCES category(category_id),
    FOREIGN KEY (difficulty_id) REFERENCES difficulty(difficulty_id)
);

CREATE TABLE notechordmapping (
    mapping_id INT PRIMARY KEY AUTO_INCREMENT,
    note_id INT,
    chord_id INT,
    FOREIGN KEY (note_id) REFERENCES note (note_id),
    FOREIGN KEY (chord_id) REFERENCES chord (chord_id)
);

CREATE TABLE score (
    score_id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    user_id INT NOT NULL,
    quiz_set_id INT NOT NULL,
    score INT NOT NULL,
    submit_date DATETIME NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user(user_id),
    FOREIGN KEY (quiz_set_id) REFERENCES quiz(quiz_set_id)
);

CREATE TABLE question (
    question_id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    quiz_set_id INT NOT NULL,
    question_text VARCHAR(255) NOT NULL,
    option1 VARCHAR(255) NOT NULL,
    option2 VARCHAR(255) NOT NULL,
    option3 VARCHAR(255) NOT NULL,
    option4 VARCHAR(255) NOT NULL,
    ans INT NOT NULL,
    FOREIGN KEY (quiz_set_id) REFERENCES quiz(quiz_set_id)
);

CREATE TABLE eartrain (
    ear_question_id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    quiz_set_id INT NOT NULL,
    eartrain_text VARCHAR(255) NOT NULL,
    quiz1 INT NULL,
    quiz2 INT NULL,
    quiz3 INT NULL,
    quiz4 INT NULL,
    quiz5 INT NULL,
    FOREIGN KEY (quiz_set_id) REFERENCES quiz(quiz_set_id),
    FOREIGN KEY (quiz1) REFERENCES notechordmapping(mapping_id),
    FOREIGN KEY (quiz2) REFERENCES notechordmapping(mapping_id),
    FOREIGN KEY (quiz3) REFERENCES notechordmapping(mapping_id),
    FOREIGN KEY (quiz4) REFERENCES notechordmapping(mapping_id)
);


INSERT INTO user (username, password, profile_name) VALUES("fresh2", "$2b$10$ZU50Ifu7pdePcEb6H8tOLuFtW5cbKEJYDRg5cq6Qx2op1aT.4JvEG", "fresh2");
INSERT INTO category (category_name) VALUES ("note"), ("chord"), ("quiz");
INSERT INTO difficulty (difficulty_name) VALUES ("Easy"), ("Normal"), ("Hard");

DELIMITER //
CREATE TRIGGER insert_note_mapping_trigger
AFTER INSERT ON note
FOR EACH ROW
BEGIN
    INSERT INTO notechordmapping (note_id, chord_id)
    VALUES (NEW.note_id, NULL);
END//
DELIMITER ;
INSERT INTO note (note_name) VALUES ("C"), ("C#/Db"), ("D"), ("D#/Eb"), ("E"), ("F"), ("F#/Gb"), ("G"), ("G#/Ab"), ("A"), ("A#/Bb"), ("B");

DELIMITER //
CREATE TRIGGER insert_chord_mapping_trigger
AFTER INSERT ON chord
FOR EACH ROW
BEGIN
    INSERT INTO notechordmapping (note_id, chord_id)
    VALUES (NULL, NEW.chord_id);
END//
DELIMITER ;
INSERT INTO chord (chord_name, chord_note, chord_tension, piano_src, guitar_src) VALUES ('C', 'C', 'Major', 'p_c.png', 'g_c.png');
INSERT INTO chord (chord_name, chord_note, chord_tension, piano_src, guitar_src) VALUES ('Cm', 'C', 'Minor', 'p_cm.png', 'g_cm.png'); 
INSERT INTO chord (chord_name, chord_note, chord_tension, piano_src, guitar_src) VALUES ('Cmaj7', 'C', 'Major 7', 'p_cmaj7.png', 'g_cmaj7.png'); 
INSERT INTO chord (chord_name, chord_note, chord_tension, piano_src, guitar_src) VALUES ('Cm7', 'C', 'Minor 7', 'p_cm7.png', 'g_cm7.png'); 
INSERT INTO chord (chord_name, chord_note, chord_tension, piano_src, guitar_src) VALUES ('C7', 'C', '7', 'p_c7.png', 'g_c7.png'); 
INSERT INTO chord (chord_name, chord_note, chord_tension, piano_src, guitar_src) VALUES ('Cdim', 'C', 'Dim', 'p_cdim.png', 'g_cdim.png'); 
INSERT INTO chord (chord_name, chord_note, chord_tension, piano_src, guitar_src) VALUES ('C9', 'C', '9', 'p_c9.png', 'g_c9.png');
INSERT INTO chord (chord_name, chord_note, chord_tension, piano_src, guitar_src) VALUES ('C#', 'C#', 'Major', 'p_cs.png', 'g_cs.png'); 
INSERT INTO chord (chord_name, chord_note, chord_tension, piano_src, guitar_src) VALUES ('C#m', 'C#', 'Minor', 'p_csm.png', 'g_csm.png'); 
INSERT INTO chord (chord_name, chord_note, chord_tension, piano_src, guitar_src) VALUES ('C#maj7', 'C#', 'Major 7', 'p_csmaj7.png', 'g_csmaj7.png'); 
INSERT INTO chord (chord_name, chord_note, chord_tension, piano_src, guitar_src) VALUES ('C#m7', 'C#', 'Minor 7', 'p_csm7.png', 'g_csm7.png'); 
INSERT INTO chord (chord_name, chord_note, chord_tension, piano_src, guitar_src) VALUES ('C#7', 'C#', '7', 'p_cs7.png', 'g_cs7.png'); 
INSERT INTO chord (chord_name, chord_note, chord_tension, piano_src, guitar_src) VALUES ('C#dim', 'C#', 'Dim', 'p_csdim.png', 'g_csdim.png'); 
INSERT INTO chord (chord_name, chord_note, chord_tension, piano_src, guitar_src) VALUES ('C#9', 'C#', '9', 'p_cs9.png', 'g_cs9.png');
INSERT INTO chord (chord_name, chord_note, chord_tension, piano_src, guitar_src) VALUES ('D', 'D', 'Major', 'p_d.png', 'g_d.png'); 
INSERT INTO chord (chord_name, chord_note, chord_tension, piano_src, guitar_src) VALUES ('Dm', 'D', 'Minor', 'p_dm.png', 'g_dm.png'); 
INSERT INTO chord (chord_name, chord_note, chord_tension, piano_src, guitar_src) VALUES ('Dmaj7', 'D', 'Major 7', 'p_dmaj7.png', 'g_dmaj7.png'); 
INSERT INTO chord (chord_name, chord_note, chord_tension, piano_src, guitar_src) VALUES ('Dm7', 'D', 'Minor 7', 'p_dm7.png', 'g_dm7.png'); 
INSERT INTO chord (chord_name, chord_note, chord_tension, piano_src, guitar_src) VALUES ('D7', 'D', '7', 'p_d7.png', 'g_d7.png'); 
INSERT INTO chord (chord_name, chord_note, chord_tension, piano_src, guitar_src) VALUES ('Ddim', 'D', 'Dim', 'p_ddim.png', 'g_ddim.png'); 
INSERT INTO chord (chord_name, chord_note, chord_tension, piano_src, guitar_src) VALUES ('D9', 'D', '9', 'p_d9.png', 'g_d9.png');
INSERT INTO chord (chord_name, chord_note, chord_tension, piano_src, guitar_src) VALUES ('Eb', 'Eb', 'Major', 'p_eb.png', 'g_eb.png'); 
INSERT INTO chord (chord_name, chord_note, chord_tension, piano_src, guitar_src) VALUES ('Ebm', 'Eb', 'Minor', 'p_ebm.png', 'g_ebm.png'); 
INSERT INTO chord (chord_name, chord_note, chord_tension, piano_src, guitar_src) VALUES ('Ebmaj7', 'Eb', 'Major 7', 'p_ebmaj7.png', 'g_ebmaj7.png'); 
INSERT INTO chord (chord_name, chord_note, chord_tension, piano_src, guitar_src) VALUES ('Ebm7', 'Eb', 'Minor 7', 'p_ebm7.png', 'g_ebm7.png'); 
INSERT INTO chord (chord_name, chord_note, chord_tension, piano_src, guitar_src) VALUES ('Eb7', 'Eb', '7', 'p_eb7.png', 'g_eb7.png'); 
INSERT INTO chord (chord_name, chord_note, chord_tension, piano_src, guitar_src) VALUES ('Ebdim', 'Eb', 'Dim', 'p_ebdim.png', 'g_ebdim.png'); 
INSERT INTO chord (chord_name, chord_note, chord_tension, piano_src, guitar_src) VALUES ('Eb9', 'Eb', '9', 'p_eb9.png', 'g_eb9.png');
INSERT INTO chord (chord_name, chord_note, chord_tension, piano_src, guitar_src) VALUES ('E', 'E', 'Major', 'p_e.png', 'g_e.png'); 
INSERT INTO chord (chord_name, chord_note, chord_tension, piano_src, guitar_src) VALUES ('Em', 'E', 'Minor', 'p_em.png', 'g_em.png'); 
INSERT INTO chord (chord_name, chord_note, chord_tension, piano_src, guitar_src) VALUES ('Emaj7', 'E', 'Major 7', 'p_emaj7.png', 'g_emaj7.png'); 
INSERT INTO chord (chord_name, chord_note, chord_tension, piano_src, guitar_src) VALUES ('Em7', 'E', 'Minor 7', 'p_em7.png', 'g_em7.png'); 
INSERT INTO chord (chord_name, chord_note, chord_tension, piano_src, guitar_src) VALUES ('E7', 'E', '7', 'p_e7.png', 'g_e7.png'); 
INSERT INTO chord (chord_name, chord_note, chord_tension, piano_src, guitar_src) VALUES ('Edim', 'E', 'Dim', 'p_edim.png', 'g_edim.png'); 
INSERT INTO chord (chord_name, chord_note, chord_tension, piano_src, guitar_src) VALUES ('E9', 'E', '9', 'p_e9.png', 'g_e9.png');
INSERT INTO chord (chord_name, chord_note, chord_tension, piano_src, guitar_src) VALUES ('F', 'F', 'Major', 'p_f.png', 'g_f.png'); 
INSERT INTO chord (chord_name, chord_note, chord_tension, piano_src, guitar_src) VALUES ('Fm', 'F', 'Minor', 'p_fm.png', 'g_fm.png'); 
INSERT INTO chord (chord_name, chord_note, chord_tension, piano_src, guitar_src) VALUES ('Fmaj7', 'F', 'Major 7', 'p_fmaj7.png', 'g_fmaj7.png'); 
INSERT INTO chord (chord_name, chord_note, chord_tension, piano_src, guitar_src) VALUES ('Fm7', 'F', 'Minor 7', 'p_fm7.png', 'g_fm7.png'); 
INSERT INTO chord (chord_name, chord_note, chord_tension, piano_src, guitar_src) VALUES ('F7', 'F', '7', 'p_f7.png', 'g_f7.png'); 
INSERT INTO chord (chord_name, chord_note, chord_tension, piano_src, guitar_src) VALUES ('Fdim', 'F', 'Dim', 'p_fdim.png', 'g_fdim.png'); 
INSERT INTO chord (chord_name, chord_note, chord_tension, piano_src, guitar_src) VALUES ('F9', 'F', '9', 'p_f9.png', 'g_f9.png');
INSERT INTO chord (chord_name, chord_note, chord_tension, piano_src, guitar_src) VALUES ('F#', 'F#', 'Major', 'p_fs.png', 'g_fs.png'); 
INSERT INTO chord (chord_name, chord_note, chord_tension, piano_src, guitar_src) VALUES ('F#m', 'F#', 'Minor', 'p_fsm.png', 'g_fsm.png'); 
INSERT INTO chord (chord_name, chord_note, chord_tension, piano_src, guitar_src) VALUES ('F#maj7', 'F#', 'Major 7', 'p_fsmaj7.png', 'g_fsmaj7.png'); 
INSERT INTO chord (chord_name, chord_note, chord_tension, piano_src, guitar_src) VALUES ('F#m7', 'F#', 'Minor 7', 'p_fsm7.png', 'g_fsm7.png'); 
INSERT INTO chord (chord_name, chord_note, chord_tension, piano_src, guitar_src) VALUES ('F#7', 'F#', '7', 'p_fs7.png', 'g_fs7.png'); 
INSERT INTO chord (chord_name, chord_note, chord_tension, piano_src, guitar_src) VALUES ('F#dim', 'F#', 'Dim', 'p_fsdim.png', 'g_fsdim.png'); 
INSERT INTO chord (chord_name, chord_note, chord_tension, piano_src, guitar_src) VALUES ('F#9', 'F#', '9', 'p_fs9.png', 'g_fs9.png');
INSERT INTO chord (chord_name, chord_note, chord_tension, piano_src, guitar_src) VALUES ('G', 'G', 'Major', 'p_g.png', 'g_g.png'); 
INSERT INTO chord (chord_name, chord_note, chord_tension, piano_src, guitar_src) VALUES ('Gm', 'G', 'Minor', 'p_gm.png', 'g_gm.png'); 
INSERT INTO chord (chord_name, chord_note, chord_tension, piano_src, guitar_src) VALUES ('Gmaj7', 'G', 'Major 7', 'p_gmaj7.png', 'g_gmaj7.png'); 
INSERT INTO chord (chord_name, chord_note, chord_tension, piano_src, guitar_src) VALUES ('Gm7', 'G', 'Minor 7', 'p_gm7.png', 'g_gm7.png'); 
INSERT INTO chord (chord_name, chord_note, chord_tension, piano_src, guitar_src) VALUES ('G7', 'G', '7', 'p_g7.png', 'g_g7.png'); 
INSERT INTO chord (chord_name, chord_note, chord_tension, piano_src, guitar_src) VALUES ('Gdim', 'G', 'Dim', 'p_gdim.png', 'g_gdim.png'); 
INSERT INTO chord (chord_name, chord_note, chord_tension, piano_src, guitar_src) VALUES ('G9', 'G', '9', 'p_g9.png', 'g_g9.png');
INSERT INTO chord (chord_name, chord_note, chord_tension, piano_src, guitar_src) VALUES ('G#', 'G#', 'Major', 'p_gs.png', 'g_gs.png'); 
INSERT INTO chord (chord_name, chord_note, chord_tension, piano_src, guitar_src) VALUES ('G#m', 'G#', 'Minor', 'p_gsm.png', 'g_gsm.png'); 
INSERT INTO chord (chord_name, chord_note, chord_tension, piano_src, guitar_src) VALUES ('G#maj7', 'G#', 'Major 7', 'p_gsmaj7.png', 'g_gsmaj7.png'); 
INSERT INTO chord (chord_name, chord_note, chord_tension, piano_src, guitar_src) VALUES ('G#m7', 'G#', 'Minor 7', 'p_gsm7.png', 'g_gsm7.png'); 
INSERT INTO chord (chord_name, chord_note, chord_tension, piano_src, guitar_src) VALUES ('G#7', 'G#', '7', 'p_gs7.png', 'g_gs7.png'); 
INSERT INTO chord (chord_name, chord_note, chord_tension, piano_src, guitar_src) VALUES ('G#dim', 'G#', 'Dim', 'p_gsdim.png', 'g_gsdim.png'); 
INSERT INTO chord (chord_name, chord_note, chord_tension, piano_src, guitar_src) VALUES ('G#9', 'G#', '9', 'p_gs9.png', 'g_gs9.png');
INSERT INTO chord (chord_name, chord_note, chord_tension, piano_src, guitar_src) VALUES ('A', 'A', 'Major', 'p_a.png', 'g_a.png'); 
INSERT INTO chord (chord_name, chord_note, chord_tension, piano_src, guitar_src) VALUES ('Am', 'A', 'Minor', 'p_am.png', 'g_am.png'); 
INSERT INTO chord (chord_name, chord_note, chord_tension, piano_src, guitar_src) VALUES ('Amaj7', 'A', 'Major 7', 'p_amaj7.png', 'g_amaj7.png'); 
INSERT INTO chord (chord_name, chord_note, chord_tension, piano_src, guitar_src) VALUES ('Am7', 'A', 'Minor 7', 'p_am7.png', 'g_am7.png'); 
INSERT INTO chord (chord_name, chord_note, chord_tension, piano_src, guitar_src) VALUES ('A7', 'A', '7', 'p_a7.png', 'g_a7.png'); 
INSERT INTO chord (chord_name, chord_note, chord_tension, piano_src, guitar_src) VALUES ('Adim', 'A', 'Dim', 'p_adim.png', 'g_adim.png'); 
INSERT INTO chord (chord_name, chord_note, chord_tension, piano_src, guitar_src) VALUES ('A9', 'A', '9', 'p_a9.png', 'g_a9.png');
INSERT INTO chord (chord_name, chord_note, chord_tension, piano_src, guitar_src) VALUES ('Bb', 'Bb', 'Major', 'p_bb.png', 'g_bb.png'); 
INSERT INTO chord (chord_name, chord_note, chord_tension, piano_src, guitar_src) VALUES ('Bbm', 'Bb', 'Minor', 'p_bbm.png', 'g_bbm.png'); 
INSERT INTO chord (chord_name, chord_note, chord_tension, piano_src, guitar_src) VALUES ('Bbmaj7', 'Bb', 'Major 7', 'p_bbmaj7.png', 'g_bbmaj7.png'); 
INSERT INTO chord (chord_name, chord_note, chord_tension, piano_src, guitar_src) VALUES ('Bbm7', 'Bb', 'Minor 7', 'p_bbm7.png', 'g_bbm7.png'); 
INSERT INTO chord (chord_name, chord_note, chord_tension, piano_src, guitar_src) VALUES ('Bb7', 'Bb', '7', 'p_bb7.png', 'g_bb7.png'); 
INSERT INTO chord (chord_name, chord_note, chord_tension, piano_src, guitar_src) VALUES ('Bbdim', 'Bb', 'Dim', 'p_bbdim.png', 'g_bbdim.png'); 
INSERT INTO chord (chord_name, chord_note, chord_tension, piano_src, guitar_src) VALUES ('Bb9', 'Bb', '9', 'p_bb9.png', 'g_bb9.png');
INSERT INTO chord (chord_name, chord_note, chord_tension, piano_src, guitar_src) VALUES ('B', 'B', 'Major', 'p_b.png', 'g_b.png'); 
INSERT INTO chord (chord_name, chord_note, chord_tension, piano_src, guitar_src) VALUES ('Bm', 'B', 'Minor', 'p_bm.png', 'g_bm.png'); 
INSERT INTO chord (chord_name, chord_note, chord_tension, piano_src, guitar_src) VALUES ('Bmaj7', 'B', 'Major 7', 'p_bmaj7.png', 'g_bmaj7.png'); 
INSERT INTO chord (chord_name, chord_note, chord_tension, piano_src, guitar_src) VALUES ('Bm7', 'B', 'Minor 7', 'p_bm7.png', 'g_bm7.png'); 
INSERT INTO chord (chord_name, chord_note, chord_tension, piano_src, guitar_src) VALUES ('B7', 'B', '7', 'p_b7.png', 'g_b7.png'); 
INSERT INTO chord (chord_name, chord_note, chord_tension, piano_src, guitar_src) VALUES ('Bdim', 'B', 'Dim', 'p_bdim.png', 'g_bdim.png'); 
INSERT INTO chord (chord_name, chord_note, chord_tension, piano_src, guitar_src) VALUES ('B9', 'B', '9', 'p_b9.png', 'g_b9.png');

INSERT INTO scale (scale_name, scale_note, scale_tension, scale_src) VALUES ( 'C Major', 'C', 'Major', 's_c.png'); 
INSERT INTO scale (scale_name, scale_note, scale_tension, scale_src) VALUES ( 'C# Major', 'C#', 'Major', 's_csh.png'); 
INSERT INTO scale (scale_name, scale_note, scale_tension, scale_src) VALUES ( 'D Major', 'D', 'Major', 's_d.png'); 
INSERT INTO scale (scale_name, scale_note, scale_tension, scale_src) VALUES ( 'Eb Major', 'Eb', 'Major', 's_ef.png'); 
INSERT INTO scale (scale_name, scale_note, scale_tension, scale_src) VALUES ( 'E Major', 'E', 'Major', 's_e.png'); 
INSERT INTO scale (scale_name, scale_note, scale_tension, scale_src) VALUES ( 'F Major', 'F', 'Major', 's_f.png');
INSERT INTO scale (scale_name, scale_note, scale_tension, scale_src) VALUES ( 'F# Major', 'F#', 'Major', 's_fsh.png');
INSERT INTO scale (scale_name, scale_note, scale_tension, scale_src) VALUES ( 'G Major', 'G', 'Major', 's_g.png');
INSERT INTO scale (scale_name, scale_note, scale_tension, scale_src) VALUES ( 'Ab Major', 'Ab', 'Major', 's_af.png');
INSERT INTO scale (scale_name, scale_note, scale_tension, scale_src) VALUES ( 'A Major', 'A', 'Major', 's_a.png');
INSERT INTO scale (scale_name, scale_note, scale_tension, scale_src) VALUES ( 'Bb Major', 'Bb', 'Major', 's_bf.png'); 
INSERT INTO scale (scale_name, scale_note, scale_tension, scale_src) VALUES ( 'B Major', 'B', 'Major', 's_b.png'); 

INSERT INTO scale (scale_name, scale_note, scale_tension, scale_src) VALUES ('A Minor', 'A', 'Minor', 's_am.png');
INSERT INTO scale (scale_name, scale_note, scale_tension, scale_src) VALUES ('D Minor', 'D', 'Minor', 's_dm.png');
INSERT INTO scale (scale_name, scale_note, scale_tension, scale_src) VALUES ('G Minor', 'G', 'Minor', 's_gm.png');
INSERT INTO scale (scale_name, scale_note, scale_tension, scale_src) VALUES ('C Minor', 'C', 'Minor', 's_cm.png'); 
INSERT INTO scale (scale_name, scale_note, scale_tension, scale_src) VALUES ('F Minor', 'F', 'Minor', 's_fm.png'); 
INSERT INTO scale (scale_name, scale_note, scale_tension, scale_src) VALUES ('Ab Minor', 'Ab', 'Minor', 's_afm.png');
INSERT INTO scale (scale_name, scale_note, scale_tension, scale_src) VALUES ('Eb Minor', 'Eb', 'Minor', 's_efm.png');
INSERT INTO scale (scale_name, scale_note, scale_tension, scale_src) VALUES ('Bb Minor', 'Bb', 'Minor', 's_bfm.png'); 
INSERT INTO scale (scale_name, scale_note, scale_tension, scale_src) VALUES ('E Minor', 'E', 'Minor', 's_em.png'); 
INSERT INTO scale (scale_name, scale_note, scale_tension, scale_src) VALUES ('B Minor', 'B', 'Minor', 's_bm.png'); 
INSERT INTO scale (scale_name, scale_note, scale_tension, scale_src) VALUES ('F# Minor', 'F#', 'Minor', 's_fsm.png');
INSERT INTO scale (scale_name, scale_note, scale_tension, scale_src) VALUES ('C# Minor', 'C#', 'Minor', 's_csm.png');
INSERT INTO scale (scale_name, scale_note, scale_tension, scale_src) VALUES ('G# Minor', 'G#', 'Minor', 's_gsm.png');
INSERT INTO scale (scale_name, scale_note, scale_tension, scale_src) VALUES ('D# Minor', 'D#', 'Minor', 's_dsm.png');
INSERT INTO scale (scale_name, scale_note, scale_tension, scale_src) VALUES ('A# Minor', 'A#', 'Minor', 's_asm.png');

INSERT INTO quiz (category_id, difficulty_id) VALUES(1, 1);
INSERT INTO quiz (category_id, difficulty_id) VALUES(1, 2);
INSERT INTO quiz (category_id, difficulty_id) VALUES(1, 3);
INSERT INTO quiz (category_id, difficulty_id) VALUES(2, 1);
INSERT INTO quiz (category_id, difficulty_id) VALUES(2, 2);
INSERT INTO quiz (category_id, difficulty_id) VALUES(2, 3);
INSERT INTO quiz (category_id, difficulty_id) VALUES(3, 1);
INSERT INTO quiz (category_id, difficulty_id) VALUES(3, 2);
INSERT INTO quiz (category_id, difficulty_id) VALUES(3, 3);

INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (7, "What is the first note of chord A major?", "A", "C#", "E", "G#", 1);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (7, "What is the second note of chord A major?", "A", "C#", "E", "G#", 2);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (7, "What is the third note of chord A major?", "A", "C#", "E", "G#", 3);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (7, "What is the first note of chord A♯/B♭ major?", "A#", "D", "F", "A", 1);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (7, "What is the second note of chord A♯/B♭ major?", "A#", "D", "F", "A", 2);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (7, "What is the third note of chord A♯/B♭ major?", "A#", "D", "F", "A", 3);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (7, "What is the first note of chord B major?", "B", "D#", "F#", "A#", 1);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (7, "What is the second note of chord B major?", "B", "D#", "F#", "A#", 2);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (7, "What is the third note of chord B major?", "B", "D#", "F#", "A#", 3);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (7, "What is the first note of chord C major?", "C", "E", "G", "B", 1);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (7, "What is the second note of chord C major?", "C", "E", "G", "B", 2);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (7, "What is the third note of chord C major?", "C", "E", "G", "B", 3);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (7, "What is the first note of chord C♯/D♭ major?", "C#", "E#", "G#", "B#", 1);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (7, "What is the second note of chord C♯/D♭ major?", "C#", "E#", "G#", "B#", 2);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (7, "What is the third note of chord C♯/D♭ major?", "C#", "E#", "G#", "B#", 3);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (7, "What is the first note of chord D major?", "D", "F#", "A", "C#", 1);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (7, "What is the second note of chord D major?", "D", "F#", "A", "C#", 2);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (7, "What is the third note of chord D major?", "D", "F#", "A", "C#", 3);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (7, "What is the first note of chord D♯/E♭ major?", "D#", "F##", "A#", "C##", 1);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (7, "What is the second note of chord D♯/E♭ major?", "D#", "F##", "A#", "C##", 2);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (7, "What is the third note of chord D♯/E♭ major?", "D#", "F##", "A#", "C##", 3);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (7, "What is the first note of chord E major?", "E", "G#", "B", "D#", 1);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (7, "What is the second note of chord E major?", "E", "G#", "B", "D#", 2);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (7, "What is the third note of chord E major?", "E", "G#", "B", "D#", 3);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (7, "What is the first note of chord F major?", "F", "A", "C", "E", 1);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (7, "What is the second note of chord F major?", "F", "A", "C", "E", 2);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (7, "What is the third note of chord F major?", "F", "A", "C", "E", 3);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (7, "What is the first note of chord F♯/G♭ major?", "F#", "A#", "C#", "E#", 1);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (7, "What is the second note of chord F♯/G♭ major?", "F#", "A#", "C#", "E#", 2);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (7, "What is the third note of chord F♯/G♭ major?", "F#", "A#", "C#", "E#", 3);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (7, "What is the first note of chord G major?", "G", "B", "D", "F#", 1);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (7, "What is the second note of chord G major?", "G", "B", "D", "F#", 2);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (7, "What is the third note of chord G major?", "G", "B", "D", "F#", 3);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (7, "What is the first note of chord A minor?", "A", "C", "E", "G", 1);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (7, "What is the second note of chord A minor?", "A", "C", "E", "G", 2);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (7, "What is the third note of chord A minor?", "A", "C", "E", "G", 3);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (7, "What is the first note of chord A♯/B♭ minor?", "A#", "C#", "F", "A", 1);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (7, "What is the second note of chord A♯/B♭ minor?", "A#", "C#", "F", "A", 2);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (7, "What is the third note of chord A♯/B♭ minor?", "A#", "C#", "F", "A", 3);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (7, "What is the first note of chord B minor?", "B", "D", "F#", "A", 1);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (7, "What is the second note of chord B minor?", "B", "D", "F#", "A", 2);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (7, "What is the third note of chord B minor?", "B", "D", "F#", "A", 3);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (7, "What is the first note of chord C minor?", "C", "D#", "G", "A#", 1);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (7, "What is the second note of chord C minor?", "C", "D#", "G", "A#", 2);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (7, "What is the third note of chord C minor?", "C", "D#", "G", "A#", 3);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (7, "What is the first note of chord C♯/D♭ minor?", "C#", "E", "G#", "B", 1);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (7, "What is the second note of chord C♯/D♭ minor?", "C#", "E", "G#", "B", 2);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (7, "What is the third note of chord C♯/D♭ minor?", "C#", "E", "G#", "B", 3);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (7, "What is the first note of chord D minor?", "D", "F", "A", "C", 1);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (7, "What is the second note of chord D minor?", "D", "F", "A", "C", 2);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (7, "What is the third note of chord D minor?", "D", "F", "A", "C", 3);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (7, "What is the first note of chord D♯/E♭ minor?", "D#", "F#", "A#", "C#", 1);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (7, "What is the second note of chord D♯/E♭ minor?", "D#", "F#", "A#", "C#", 2);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (7, "What is the third note of chord D♯/E♭ minor?", "D#", "F#", "A#", "C#", 3);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (7, "What is the first note of chord E minor?", "E", "G", "B", "D", 1);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (7, "What is the second note of chord E minor?", "E", "G", "B", "D", 2);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (7, "What is the third note of chord E minor?", "E", "G", "B", "D", 3);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (7, "What is the first note of chord F minor?", "F", "G#", "C", "D#", 1);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (7, "What is the second note of chord F minor?", "F", "G#", "C", "D#", 2);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (7, "What is the third note of chord F minor?", "F", "G#", "C", "D#", 3);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (7, "What is the first note of chord F♯/G♭ minor?", "F#", "A", "C#", "E", 1);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (7, "What is the second note of chord F♯/G♭ minor?", "F#", "A", "C#", "E", 2);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (7, "What is the third note of chord F♯/G♭ minor?", "F#", "A", "C#", "E", 3);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (7, "What is the first note of chord G minor?", "G", "A#", "D", "F", 1);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (7, "What is the second note of chord G minor?", "G", "A#", "D", "F", 2);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (7, "What is the third note of chord G minor?", "G", "A#", "D", "F", 3);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (8, "What is the first note of chord A7?", "A", "C#", "E", "G", 1);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (8, "What is the third note of chord A7?", "A", "C#", "E", "G", 3);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (8, "What is the fourth note of chord A7?", "A", "C#", "E", "G", 4);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (8, "What is the first note of chord B7?", "B", "D#", "F#", "A", 1);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (8, "What is the second note of chord B7?", "B", "D#", "F#", "A", 2);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (8, "What is the third note of chord B7?", "B", "D#", "F#", "A", 3);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (8, "What is the fourth note of chord B7?", "B", "D#", "F#", "A", 4);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (8, "What is the first note of chord C7?", "C", "E", "G", "Bb", 1);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (8, "What is the second note of chord C7?", "C", "E", "G", "Bb", 2);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (8, "What is the third note of chord C7?", "C", "E", "G", "Bb", 3);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (8, "What is the fourth note of chord C7?", "C", "E", "G", "Bb", 4);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (8, "What is the first note of chord D7?", "D", "F#", "A", "C", 1);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (8, "What is the second note of chord D7?", "D", "F#", "A", "C", 2);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (8, "What is the third note of chord D7?", "D", "F#", "A", "C", 3);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (8, "What is the fourth note of chord D7?", "D", "F#", "A", "C", 4);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (8, "What is the first note of chord E7?", "E", "G#", "B", "D", 1);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (8, "What is the second note of chord E7?", "E", "G#", "B", "D", 2);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (8, "What is the third note of chord E7?", "E", "G#", "B", "D", 3);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (8, "What is the fourth note of chord E7?", "E", "G#", "B", "D", 4);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (8, "What is the first note of chord F7?", "F", "A", "C", "Eb", 1);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (8, "What is the second note of chord F7?", "F", "A", "C", "Eb", 2);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (8, "What is the third note of chord F7?", "F", "A", "C", "Eb", 3);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (8, "What is the fourth note of chord F7?", "F", "A", "C", "Eb", 4);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (8, "What is the first note of chord G7?", "G", "B", "D", "F", 1);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (8, "What is the second note of chord G7?", "G", "B", "D", "F", 2);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (8, "What is the third note of chord G7?", "G", "B", "D", "F", 3);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (8, "What is the fourth note of chord G7?", "G", "B", "D", "F", 4);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (8, "What is the first note of chord Adim?", "A", "C", "Eb", "Gb", 1);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (8, "What is the second note of chord Adim?", "A", "C", "Eb", "Gb", 2);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (8, "What is the third note of chord Adim?", "A", "C", "Eb", "Gb", 3);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (8, "What is the fourth note of chord Adim?", "A", "C", "Eb", "Gb", 4);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (8, "What is the first note of chord Bdim?", "B", "D", "F", "Ab", 1);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (8, "What is the second note of chord Bdim?", "B", "D", "F", "Ab", 2);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (8, "What is the third note of chord Bdim?", "B", "D", "F", "Ab", 3);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (8, "What is the fourth note of chord Bdim?", "B", "D", "F", "Ab", 4);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (8, "What is the first note of chord Cdim?", "C", "Eb", "Gb", "Bbb", 1);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (8, "What is the second note of chord Cdim?", "C", "Eb", "Gb", "Bbb", 2);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (8, "What is the third note of chord Cdim?", "C", "Eb", "Gb", "Bbb", 3);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (8, "What is the fourth note of chord Cdim?", "C", "Eb", "Gb", "Bbb", 4);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (8, "What is the first note of chord Ddim?", "D", "F", "Ab", "Cb", 1);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (8, "What is the second note of chord Ddim?", "D", "F", "Ab", "Cb", 2);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (8, "What is the third note of chord Ddim?", "D", "F", "Ab", "Cb", 3);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (8, "What is the fourth note of chord Ddim?", "D", "F", "Ab", "Cb", 4);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (8, "What is the first note of chord Edim?", "E", "G", "Bb", "Db", 1);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (8, "What is the second note of chord Edim?", "E", "G", "Bb", "Db", 2);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (8, "What is the third note of chord Edim?", "E", "G", "Bb", "Db", 3);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (8, "What is the fourth note of chord Edim?", "E", "G", "Bb", "Db", 4);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (8, "What is the first note of chord Fdim?", "F", "Ab", "Cb", "Ebb", 1);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (8, "What is the second note of chord Fdim?", "F", "Ab", "Cb", "Ebb", 2);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (8, "What is the third note of chord Fdim?", "F", "Ab", "Cb", "Ebb", 3);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (8, "What is the fourth note of chord Fdim?", "F", "Ab", "Cb", "Ebb", 4);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (8, "What is the first note of chord Gdim?", "G", "Bb", "Db", "Fb", 1);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (8, "What is the second note of chord Gdim?", "G", "Bb", "Db", "Fb", 2);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (8, "What is the third note of chord Gdim?", "G", "Bb", "Db", "Fb", 3);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (8, "What is the fourth note of chord Gdim?", "G", "Bb", "Db", "Fb", 4);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (8, "What is the first note of chord Aaug?", "A", "C#", "E#", "G##", 1);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (8, "What is the second note of chord Aaug?", "A", "C#", "E#", "G##", 2);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (8, "What is the third note of chord Aaug?", "A", "C#", "E#", "G##", 3);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (8, "What is the first note of chord Baug?", "B", "D#", "F##", "A##", 1);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (8, "What is the second note of chord Baug?", "B", "D#", "F##", "A##", 2);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (8, "What is the third note of chord Baug?", "B", "D#", "F##", "A##", 3);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (8, "What is the first note of chord Caug?", "C", "E", "G#", "B#", 1);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (8, "What is the second note of chord Caug?", "C", "E", "G#", "B#", 2);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (8, "What is the third note of chord Caug?", "C", "E", "G#", "B#", 3);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (8, "What is the first note of chord Daug?", "D", "F#", "A#", "C##", 1);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (8, "What is the second note of chord Daug?", "D", "F#", "A#", "C##", 2);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (8, "What is the third note of chord Daug?", "D", "F#", "A#", "C##", 3);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (8, "What is the first note of chord C#7?", "C#", "E#", "G#", "B", 1);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (8, "What is the second note of chord C#7?", "C#", "E#", "G#", "B", 2);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (8, "What is the third note of chord C#7?", "C#", "E#", "G#", "B", 3);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (8, "What is the fourth note of chord C#7?", "C#", "E#", "G#", "B", 4);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (8, "What is the first note of chord F#7?", "F#", "A#", "C#", "E", 1);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (8, "What is the second note of chord F#7?", "F#", "A#", "C#", "E", 2);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (8, "What is the third note of chord F#7?", "F#", "A#", "C#", "E", 3);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (8, "What is the fourth note of chord F#7?", "F#", "A#", "C#", "E", 4);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (8, "What is the first note of chord G#7?", "G#", "B#", "D#", "F#", 1);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (8, "What is the second note of chord G#7?", "G#", "B#", "D#", "F#", 2);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (8, "What is the third note of chord G#7?", "G#", "B#", "D#", "F#", 3);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (8, "What is the fourth note of chord G#7?", "G#", "B#", "D#", "F#", 4);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (8, "What is the first note of chord C#dim?", "C#", "E", "G", "Bb", 1);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (8, "What is the second note of chord C#dim?", "C#", "E", "G", "Bb", 2);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (8, "What is the third note of chord C#dim?", "C#", "E", "G", "Bb", 3);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (8, "What is the fourth note of chord C#dim?", "C#", "E", "G", "Bb", 4);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (8, "What is the first note of chord F#dim?", "F#", "A", "C", "Eb", 1);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (8, "What is the second note of chord F#dim?", "F#", "A", "C", "Eb", 2);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (8, "What is the third note of chord F#dim?", "F#", "A", "C", "Eb", 3);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (8, "What is the fourth note of chord F#dim?", "F#", "A", "C", "Eb", 4);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (8, "What is the first note of chord G#dim?", "G#", "B", "D", "F", 1);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (8, "What is the second note of chord G#dim?", "G#", "B", "D", "F", 2);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (8, "What is the third note of chord G#dim?", "G#", "B", "D", "F", 3);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (8, "What is the fourth note of chord G#dim?", "G#", "B", "D", "F", 4);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (8, "What is the first note of chord C#aug?", "C#", "E#", "G##", "B#", 1);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (8, "What is the second note of chord C#aug?", "C#", "E#", "G##", "B#", 2);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (8, "What is the third note of chord C#aug?", "C#", "E#", "G##", "B#", 3);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (8, "What is the first note of chord F#aug?", "F#", "A#", "C##", "E#", 1);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (8, "What is the second note of chord F#aug?", "F#", "A#", "C##", "E#", 2);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (8, "What is the third note of chord F#aug?", "F#", "A#", "C##", "E#", 3);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (8, "What is the first note of chord G#aug?", "G#", "B#", "D##", "F##", 1);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (8, "What is the second note of chord G#aug?", "G#", "B#", "D##", "F##", 2);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (8, "What is the third note of chord G#aug?", "G#", "B#", "D##", "F##", 3);

INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (9, 'What note of chord Cmaj7?', 'C E G A#', 'C D G A', 'C E G B', 'C E F G', 3);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (9, 'What note of chord Dmaj7?', 'D F# A# C', 'D F# G# A', 'D E G A', 'D F# A C#', 4);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (9, 'What note of chord Emaj7?', 'E G# A B', 'E G# B D#', 'E G# B# D##', 'E F# A B', 2);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (9, 'What note of chord Fmaj7?', 'F A B C', 'F A C D#', 'F G C D', 'F A C E', 4);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (9, 'What note of chord Gmaj7?', 'G B D F#', 'G B D# F', 'G A D E', 'G B C D', 1);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (9, 'What note of chord Amaj7?', 'A C# E G#', 'A C# E#', 'A C# D# E', 'A B D E', 1);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (9, 'What note of chord Bmaj7?', 'B D# E# F#', 'B D# F# A', 'B D# F# A#', 'B C# F# G#', 3);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (9, 'What note of chord Cm7?', 'C D G A', 'C Eb G Bb', 'C Eb G A#', 'C Eb F G', 2);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (9, 'What note of chord Dm7?', 'D E G A', 'D F G A', 'D F A# C#', 'D F A C', 4);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (9, 'What note of chord Em7?', 'E G A B', 'E G B# D#', 'E G B D', 'E F# A B', 3);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (9, 'What note of chord Fm7?', 'F Ab Bb C', 'F Ab C D#', 'F G C D', 'F Ab C Eb', 4);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (9, 'What note of chord Gm7?', 'G Bb D F', 'G Bb D# F#', 'G Bb C D', 'G A# D E', 1);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (9, 'What note of chord Am7?', 'A B D E', 'A C D E', 'A C E G', 'A C E G#', 3);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (9, 'What note of chord Bm7?', 'B C# F# G#', 'B D E F#', 'B D F# A#', 'B D F# A', 4);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (9, 'What note of chord C7?', 'C D G A', 'C E F G', 'C E G A#', 'C E G Bb', 4);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (9, 'What note of chord D7?', 'D E G A', 'D F# A C', 'D F# A# C#', 'D F# G A', 2);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (9, 'What note of chord E7?', 'E F# A B', 'E G# A B', 'E G# B# D#', 'E G# B D', 4);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (9, 'What note of chord F7?', 'F A C Eb', 'G B D F', 'F G C D', 'F A Bb C', 1);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (9, 'What note of chord G7?', 'G A D E', 'G B C D', 'G B D# F#', 'F A C D#', 2);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (9, 'What note of chord A7?', 'A B D E', 'A C D E', 'A C# E G', 'A C# E#', 3);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (9, 'What note of chord B7?', 'B C# F# G#', 'B D E F#', 'B D# F# A', 'B D# F# A#', 3);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (9, 'What note of chord Cdim?', 'C D G A', 'C Eb F G', 'C Eb G Bb', 'C Eb Gb A', 4);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (9, 'What note of chord Ddim?', 'D E G A', 'D F Ab Cb', 'D F Ab B', 'D F G A', 2);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (9, 'What note of chord Edim?', 'E F# A B', 'E G A B', 'E G B Db', 'E G Bb Db', 4);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (9, 'What note of chord Fdim?', 'F Ab Cb Ebb', 'F Ab Cb D#', 'F G C D', 'F Ab Bb C', 1);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (9, 'What note of chord Gdim?', 'G A D E', 'G Bb D F', 'G Bb Db Fb', 'G Bb Db F', 3);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (9, 'What note of chord Adim?', 'A B D E', 'A C Eb Gb', 'A C Eb Bb', 'A C D E', 2);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (9, 'What note of chord Bdim?', 'B C# F# G#', 'B D F Ab', 'B D E F', 'B D F', 4);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (9, 'What note of chord C♯maj7?', 'C# D# G# A#', 'C# E# G# B#', 'C# E# F# G#', 'C# E# G# A#', 2);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (9, 'What note of chord F♯maj7?', 'F# A# C# D#', 'F# G# C# D#', 'F# A# C# E#', 'F# A# C E#', 3);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (9, 'What note of chord G♯maj7?', 'G# B# D# F#', 'G# A# D# F#', 'G# B# D# F##', 'G# A# D# F#', 3);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (9, 'What note of chord C♭maj7?', 'Cb Eb Gb Bb', 'Cb Eb Gb Ab', 'Cb Db Gb Bb', 'Cb Eb Gb A', 1);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (9, 'What note of chord F♭maj7?', 'Fb Ab Cb Db', 'Fb Ab Cb Eb', 'Fb Gb Cb Eb', 'Fb Ab Db Eb', 2);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (9, 'What note of chord G♭maj7?', 'Gb Bb Db Fb', 'Gb Bb Cb Fb', 'Gb Bb Db Ebb', 'Gb Cb Db Fb', 1);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (9, 'What note of chord C♯m7?', 'C# E# G# A#', 'C# D# G# A#', 'C# E# G# B', 'C# E# G# A#', 3);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (9, 'What note of chord F♯m7?', 'F# A C# E', 'F# G# C# D#', 'F# A C# D#', 'F# A C# E', 4);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (9, 'What note of chord G♯m7?', 'G# B D# F#', 'G# A# D# F#', 'G# B D# F', 'G# B D F', 1);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (9, 'What note of chord C♭m7?', 'Cb Ebb Gb Bbb', 'Cb Ebb Gb A', 'Cb Db Gb Bbb', 'Cb Ebb G Bbb', 1);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (9, 'What note of chord F♭m7?', 'Fb Ab Cb Db', 'Fb Ab Cb Ebb', 'Fb Gb Cb Ebb', 'Fb Ab Gb Ebb', 2);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (9, 'What note of chord G♭m7?', 'Gb Bbb Db Fb', 'Gb Abb Db Fb', 'Gb Bbb Db Eb', 'Gb Bbb Cb Fb', 1);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (9, 'What note of chord C♯7?', 'C# E# G# A#', 'C# D# G# A#', 'C# E# G# B', 'C# E# G# A#', 3);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (9, 'What note of chord F♯7?', 'F# A# C# D#', 'F# G# C# D#', 'F# A# C# E', 'F# A# C# D#', 3);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (9, 'What note of chord G♯7?', 'G# B# D# F##', 'G# A# D# F#', 'G# B# D# F#', 'G# B# D# F#', 1);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (9, 'What note of chord C♭7?', 'Cb Ebb Gb Bbb', 'Cb Ebb Gb A', 'Cb Db Gb Bbb', 'Cb Ebb G Bbb', 1);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (9, 'What note of chord F♭7?', 'Fb Ab Cb Db', 'Fb Ab C Ebb', 'Fb Gb Cb Ebb', 'Fb Ab Cb Ebb', 4);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (9, 'What note of chord G♭7?', 'Gb Bbb Db Fb', 'G Abb Db Fb', 'Gb Bbb Db Eb', 'Gb Bbb D Fb', 1);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (9, 'What note of chord C♯dim?', 'C# E G A', 'C# D# G A', 'C# E G Bb', 'C# E G Bb', 4);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (9, 'What note of chord F♯dim?', 'F# A C D#', 'F# G# C D#', 'F# A C Eb', 'F A C Eb', 3);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (9, 'What note of chord G♯dim?', 'G# B D F', 'G# A# D F#', 'G# B D# F#', 'G# B D F#', 1);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (9, 'What note of chord C♭dim?', 'Cb Eb Gb Bb', 'Cb Eb Gb A', 'Cb Db Gb A', 'Cb Eb Gb Bb', 2);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (9, 'What note of chord F♭dim?', 'Fb Ab Cb D#', 'Fb Ab Cb Ebb', 'Fb Gb Cb E', 'Fb Ab C Ebb', 2);
INSERT INTO question (quiz_set_id, question_text, option1, option2, option3, option4, ans) VALUES (9, 'What note of chord G♭dim?', 'Gb Abb Db F', 'Gb Bbb Db F', 'Gb Bb Db Fb', 'Gb Bb Db F', 3);

INSERT INTO eartrain (quiz_set_id, eartrain_text, quiz1, quiz2, quiz3, quiz4, quiz5) VALUES (1, "Guess what note?", 1, 3, 5, NULL, NULL);
INSERT INTO eartrain (quiz_set_id, eartrain_text, quiz1, quiz2, quiz3, quiz4, quiz5) VALUES (1, "Guess what note?", 6, 8, 10, NULL, NULL);
INSERT INTO eartrain (quiz_set_id, eartrain_text, quiz1, quiz2, quiz3, quiz4, quiz5) VALUES (1, "Guess what note?", 2, 4, 7, NULL, NULL);
INSERT INTO eartrain (quiz_set_id, eartrain_text, quiz1, quiz2, quiz3, quiz4, quiz5) VALUES (1, "Guess what note?", 9, 11, 12, NULL, NULL);
INSERT INTO eartrain (quiz_set_id, eartrain_text, quiz1, quiz2, quiz3, quiz4, quiz5) VALUES (1, "Guess what note?", 5, 3, 1, NULL, NULL);
INSERT INTO eartrain (quiz_set_id, eartrain_text, quiz1, quiz2, quiz3, quiz4, quiz5) VALUES (1, "Guess what note?", 10, 8, 6, NULL, NULL);
INSERT INTO eartrain (quiz_set_id, eartrain_text, quiz1, quiz2, quiz3, quiz4, quiz5) VALUES (1, "Guess what note?", 2, 4, 6, NULL, NULL);
INSERT INTO eartrain (quiz_set_id, eartrain_text, quiz1, quiz2, quiz3, quiz4, quiz5) VALUES (1, "Guess what note?", 7, 9, 11, NULL, NULL);
INSERT INTO eartrain (quiz_set_id, eartrain_text, quiz1, quiz2, quiz3, quiz4, quiz5) VALUES (1, "Guess what note?", 1, 5, 9, NULL, NULL);
INSERT INTO eartrain (quiz_set_id, eartrain_text, quiz1, quiz2, quiz3, quiz4, quiz5) VALUES (1, "Guess what note?", 12, 8, 4, NULL, NULL);
INSERT INTO eartrain (quiz_set_id, eartrain_text, quiz1, quiz2, quiz3, quiz4, quiz5) VALUES (1, "Guess what note?", 6, 4, 2, NULL, NULL);
INSERT INTO eartrain (quiz_set_id, eartrain_text, quiz1, quiz2, quiz3, quiz4, quiz5) VALUES (1, "Guess what note?", 11, 9, 7, NULL, NULL);
INSERT INTO eartrain (quiz_set_id, eartrain_text, quiz1, quiz2, quiz3, quiz4, quiz5) VALUES (1, "Guess what note?", 1, 3, 5, NULL, NULL);
INSERT INTO eartrain (quiz_set_id, eartrain_text, quiz1, quiz2, quiz3, quiz4, quiz5) VALUES (1, "Guess what note?", 6, 8, 10, NULL, NULL);
INSERT INTO eartrain (quiz_set_id, eartrain_text, quiz1, quiz2, quiz3, quiz4, quiz5) VALUES (1, "Guess what note?", 2, 4, 7, NULL, NULL);
INSERT INTO eartrain (quiz_set_id, eartrain_text, quiz1, quiz2, quiz3, quiz4, quiz5) VALUES (1, "Guess what note?", 9, 11, 12, NULL, NULL);
INSERT INTO eartrain (quiz_set_id, eartrain_text, quiz1, quiz2, quiz3, quiz4, quiz5) VALUES (1, "Guess what note?", 5, 3, 1, NULL, NULL);
INSERT INTO eartrain (quiz_set_id, eartrain_text, quiz1, quiz2, quiz3, quiz4, quiz5) VALUES (1, "Guess what note?", 10, 8, 6, NULL, NULL);
INSERT INTO eartrain (quiz_set_id, eartrain_text, quiz1, quiz2, quiz3, quiz4, quiz5) VALUES (1, "Guess what note?", 1, 3, 5, NULL, NULL);
INSERT INTO eartrain (quiz_set_id, eartrain_text, quiz1, quiz2, quiz3, quiz4, quiz5) VALUES (1, "Guess what note?", 6, 8, 10, NULL, NULL);
INSERT INTO eartrain (quiz_set_id, eartrain_text, quiz1, quiz2, quiz3, quiz4, quiz5) VALUES (1, "Guess what note?", 2, 4, 7, NULL, NULL);
INSERT INTO eartrain (quiz_set_id, eartrain_text, quiz1, quiz2, quiz3, quiz4, quiz5) VALUES (1, "Guess what note?", 9, 11, 12, NULL, NULL);
INSERT INTO eartrain (quiz_set_id, eartrain_text, quiz1, quiz2, quiz3, quiz4, quiz5) VALUES (1, "Guess what note?", 5, 3, 1, NULL, NULL);
INSERT INTO eartrain (quiz_set_id, eartrain_text, quiz1, quiz2, quiz3, quiz4, quiz5) VALUES (1, "Guess what note?", 10, 8, 6, NULL, NULL);
INSERT INTO eartrain (quiz_set_id, eartrain_text, quiz1, quiz2, quiz3, quiz4, quiz5) VALUES (1, "Guess what note?", 1, 3, 5, NULL, NULL);
INSERT INTO eartrain (quiz_set_id, eartrain_text, quiz1, quiz2, quiz3, quiz4, quiz5) VALUES (1, "Guess what note?", 6, 8, 10, NULL, NULL);
INSERT INTO eartrain (quiz_set_id, eartrain_text, quiz1, quiz2, quiz3, quiz4, quiz5) VALUES (1, "Guess what note?", 2, 4, 7, NULL, NULL);
INSERT INTO eartrain (quiz_set_id, eartrain_text, quiz1, quiz2, quiz3, quiz4, quiz5) VALUES (1, "Guess what note?", 9, 11, 12, NULL, NULL);
INSERT INTO eartrain (quiz_set_id, eartrain_text, quiz1, quiz2, quiz3, quiz4, quiz5) VALUES (1, "Guess what note?", 5, 3, 1, NULL, NULL);
INSERT INTO eartrain (quiz_set_id, eartrain_text, quiz1, quiz2, quiz3, quiz4, quiz5) VALUES (1, "Guess what note?", 10, 8, 6, NULL, NULL);

INSERT INTO eartrain (quiz_set_id, eartrain_text, quiz1, quiz2, quiz3, quiz4, quiz5) VALUES (2, "Guess what note?", 1, 3, 5, 7, NULL);
INSERT INTO eartrain (quiz_set_id, eartrain_text, quiz1, quiz2, quiz3, quiz4, quiz5) VALUES (2, "Guess what note?", 2, 4, 6, 8, NULL);
INSERT INTO eartrain (quiz_set_id, eartrain_text, quiz1, quiz2, quiz3, quiz4, quiz5) VALUES (2, "Guess what note?", 3, 5, 7, 9, NULL);
INSERT INTO eartrain (quiz_set_id, eartrain_text, quiz1, quiz2, quiz3, quiz4, quiz5) VALUES (2, "Guess what note?", 4, 6, 8, 10, NULL);
INSERT INTO eartrain (quiz_set_id, eartrain_text, quiz1, quiz2, quiz3, quiz4, quiz5) VALUES (2, "Guess what note?", 5, 7, 9, 11, NULL);
INSERT INTO eartrain (quiz_set_id, eartrain_text, quiz1, quiz2, quiz3, quiz4, quiz5) VALUES (2, "Guess what note?", 6, 8, 10, 12, NULL);
INSERT INTO eartrain (quiz_set_id, eartrain_text, quiz1, quiz2, quiz3, quiz4, quiz5) VALUES (2, "Guess what note?", 1, 3, 5, 7, NULL);
INSERT INTO eartrain (quiz_set_id, eartrain_text, quiz1, quiz2, quiz3, quiz4, quiz5) VALUES (2, "Guess what note?", 2, 4, 6, 8, NULL);
INSERT INTO eartrain (quiz_set_id, eartrain_text, quiz1, quiz2, quiz3, quiz4, quiz5) VALUES (2, "Guess what note?", 3, 5, 7, 9, NULL);
INSERT INTO eartrain (quiz_set_id, eartrain_text, quiz1, quiz2, quiz3, quiz4, quiz5) VALUES (2, "Guess what note?", 4, 6, 8, 10, NULL);
INSERT INTO eartrain (quiz_set_id, eartrain_text, quiz1, quiz2, quiz3, quiz4, quiz5) VALUES (2, "Guess what note?", 5, 7, 9, 11, NULL);
INSERT INTO eartrain (quiz_set_id, eartrain_text, quiz1, quiz2, quiz3, quiz4, quiz5) VALUES (2, "Guess what note?", 6, 8, 10, 12, NULL);
INSERT INTO eartrain (quiz_set_id, eartrain_text, quiz1, quiz2, quiz3, quiz4, quiz5) VALUES (2, "Guess what note?", 1, 3, 5, 7, NULL);
INSERT INTO eartrain (quiz_set_id, eartrain_text, quiz1, quiz2, quiz3, quiz4, quiz5) VALUES (2, "Guess what note?", 2, 4, 6, 8, NULL);
INSERT INTO eartrain (quiz_set_id, eartrain_text, quiz1, quiz2, quiz3, quiz4, quiz5) VALUES (2, "Guess what note?", 3, 5, 7, 9, NULL);
INSERT INTO eartrain (quiz_set_id, eartrain_text, quiz1, quiz2, quiz3, quiz4, quiz5) VALUES (2, "Guess what note?", 4, 6, 8, 10, NULL);
INSERT INTO eartrain (quiz_set_id, eartrain_text, quiz1, quiz2, quiz3, quiz4, quiz5) VALUES (2, "Guess what note?", 5, 7, 9, 11, NULL);
INSERT INTO eartrain (quiz_set_id, eartrain_text, quiz1, quiz2, quiz3, quiz4, quiz5) VALUES (2, "Guess what note?", 6, 8, 10, 12, NULL);
INSERT INTO eartrain (quiz_set_id, eartrain_text, quiz1, quiz2, quiz3, quiz4, quiz5) VALUES (2, "Guess what note?", 1, 3, 5, 7, NULL);
INSERT INTO eartrain (quiz_set_id, eartrain_text, quiz1, quiz2, quiz3, quiz4, quiz5) VALUES (2, "Guess what note?", 2, 4, 6, 8, NULL);
INSERT INTO eartrain (quiz_set_id, eartrain_text, quiz1, quiz2, quiz3, quiz4, quiz5) VALUES (2, "Guess what note?", 3, 5, 7, 9, NULL);
INSERT INTO eartrain (quiz_set_id, eartrain_text, quiz1, quiz2, quiz3, quiz4, quiz5) VALUES (2, "Guess what note?", 4, 6, 8, 10, NULL);
INSERT INTO eartrain (quiz_set_id, eartrain_text, quiz1, quiz2, quiz3, quiz4, quiz5) VALUES (2, "Guess what note?", 5, 7, 9, 11, NULL);
INSERT INTO eartrain (quiz_set_id, eartrain_text, quiz1, quiz2, quiz3, quiz4, quiz5) VALUES (2, "Guess what note?", 6, 8, 10, 12, NULL);
INSERT INTO eartrain (quiz_set_id, eartrain_text, quiz1, quiz2, quiz3, quiz4, quiz5) VALUES (2, "Guess what note?", 1, 3, 5, 7, NULL);
INSERT INTO eartrain (quiz_set_id, eartrain_text, quiz1, quiz2, quiz3, quiz4, quiz5) VALUES (2, "Guess what note?", 2, 4, 6, 8, NULL);
INSERT INTO eartrain (quiz_set_id, eartrain_text, quiz1, quiz2, quiz3, quiz4, quiz5) VALUES (2, "Guess what note?", 3, 5, 7, 9, NULL);
INSERT INTO eartrain (quiz_set_id, eartrain_text, quiz1, quiz2, quiz3, quiz4, quiz5) VALUES (2, "Guess what note?", 4, 6, 8, 10, NULL);
INSERT INTO eartrain (quiz_set_id, eartrain_text, quiz1, quiz2, quiz3, quiz4, quiz5) VALUES (2, "Guess what note?", 5, 7, 9, 11, NULL);
INSERT INTO eartrain (quiz_set_id, eartrain_text, quiz1, quiz2, quiz3, quiz4, quiz5) VALUES (2, "Guess what note?", 6, 8, 10, 12, NULL);

INSERT INTO eartrain (quiz_set_id, eartrain_text, quiz1, quiz2, quiz3, quiz4, quiz5) VALUES (3, "Guess what note?", 1, 3, 5, 7, 9);
INSERT INTO eartrain (quiz_set_id, eartrain_text, quiz1, quiz2, quiz3, quiz4, quiz5) VALUES (3, "Guess what note?", 2, 4, 6, 8, 10);
INSERT INTO eartrain (quiz_set_id, eartrain_text, quiz1, quiz2, quiz3, quiz4, quiz5) VALUES (3, "Guess what note?", 3, 5, 7, 9, 11);
INSERT INTO eartrain (quiz_set_id, eartrain_text, quiz1, quiz2, quiz3, quiz4, quiz5) VALUES (3, "Guess what note?", 4, 6, 8, 10, 12);
INSERT INTO eartrain (quiz_set_id, eartrain_text, quiz1, quiz2, quiz3, quiz4, quiz5) VALUES (3, "Guess what note?", 5, 7, 9, 11, 1);
INSERT INTO eartrain (quiz_set_id, eartrain_text, quiz1, quiz2, quiz3, quiz4, quiz5) VALUES (3, "Guess what note?", 6, 8, 10, 12, 2);
INSERT INTO eartrain (quiz_set_id, eartrain_text, quiz1, quiz2, quiz3, quiz4, quiz5) VALUES (3, "Guess what note?", 1, 3, 5, 7, 9);
INSERT INTO eartrain (quiz_set_id, eartrain_text, quiz1, quiz2, quiz3, quiz4, quiz5) VALUES (3, "Guess what note?", 2, 4, 6, 8, 10);
INSERT INTO eartrain (quiz_set_id, eartrain_text, quiz1, quiz2, quiz3, quiz4, quiz5) VALUES (3, "Guess what note?", 3, 5, 7, 9, 11);
INSERT INTO eartrain (quiz_set_id, eartrain_text, quiz1, quiz2, quiz3, quiz4, quiz5) VALUES (3, "Guess what note?", 4, 6, 8, 10, 12);
INSERT INTO eartrain (quiz_set_id, eartrain_text, quiz1, quiz2, quiz3, quiz4, quiz5) VALUES (3, "Guess what note?", 5, 7, 9, 11, 1);
INSERT INTO eartrain (quiz_set_id, eartrain_text, quiz1, quiz2, quiz3, quiz4, quiz5) VALUES (3, "Guess what note?", 6, 8, 10, 12, 2);
INSERT INTO eartrain (quiz_set_id, eartrain_text, quiz1, quiz2, quiz3, quiz4, quiz5) VALUES (3, "Guess what note?", 1, 3, 5, 7, 9);
INSERT INTO eartrain (quiz_set_id, eartrain_text, quiz1, quiz2, quiz3, quiz4, quiz5) VALUES (3, "Guess what note?", 2, 4, 6, 8, 10);
INSERT INTO eartrain (quiz_set_id, eartrain_text, quiz1, quiz2, quiz3, quiz4, quiz5) VALUES (3, "Guess what note?", 3, 5, 7, 9, 11);
INSERT INTO eartrain (quiz_set_id, eartrain_text, quiz1, quiz2, quiz3, quiz4, quiz5) VALUES (3, "Guess what note?", 4, 6, 8, 10, 12);
INSERT INTO eartrain (quiz_set_id, eartrain_text, quiz1, quiz2, quiz3, quiz4, quiz5) VALUES (3, "Guess what note?", 5, 7, 9, 11, 1);
INSERT INTO eartrain (quiz_set_id, eartrain_text, quiz1, quiz2, quiz3, quiz4, quiz5) VALUES (3, "Guess what note?", 6, 8, 10, 12, 2);
INSERT INTO eartrain (quiz_set_id, eartrain_text, quiz1, quiz2, quiz3, quiz4, quiz5) VALUES (3, "Guess what note?", 1, 3, 5, 7, 9);
INSERT INTO eartrain (quiz_set_id, eartrain_text, quiz1, quiz2, quiz3, quiz4, quiz5) VALUES (3, "Guess what note?", 2, 4, 6, 8, 10);
INSERT INTO eartrain (quiz_set_id, eartrain_text, quiz1, quiz2, quiz3, quiz4, quiz5) VALUES (3, "Guess what note?", 3, 5, 7, 9, 11);
INSERT INTO eartrain (quiz_set_id, eartrain_text, quiz1, quiz2, quiz3, quiz4, quiz5) VALUES (3, "Guess what note?", 4, 6, 8, 10, 12);
INSERT INTO eartrain (quiz_set_id, eartrain_text, quiz1, quiz2, quiz3, quiz4, quiz5) VALUES (3, "Guess what note?", 5, 7, 9, 11, 1);
INSERT INTO eartrain (quiz_set_id, eartrain_text, quiz1, quiz2, quiz3, quiz4, quiz5) VALUES (3, "Guess what note?", 6, 8, 10, 12, 2);
INSERT INTO eartrain (quiz_set_id, eartrain_text, quiz1, quiz2, quiz3, quiz4, quiz5) VALUES (3, "Guess what note?", 1, 3, 5, 7, 9);
INSERT INTO eartrain (quiz_set_id, eartrain_text, quiz1, quiz2, quiz3, quiz4, quiz5) VALUES (3, "Guess what note?", 2, 4, 6, 8, 10);
INSERT INTO eartrain (quiz_set_id, eartrain_text, quiz1, quiz2, quiz3, quiz4, quiz5) VALUES (3, "Guess what note?", 3, 5, 7, 9, 11);
INSERT INTO eartrain (quiz_set_id, eartrain_text, quiz1, quiz2, quiz3, quiz4, quiz5) VALUES (3, "Guess what note?", 4, 6, 8, 10, 12);
INSERT INTO eartrain (quiz_set_id, eartrain_text, quiz1, quiz2, quiz3, quiz4, quiz5) VALUES (3, "Guess what note?", 5, 7, 9, 11, 1);
INSERT INTO eartrain (quiz_set_id, eartrain_text, quiz1, quiz2, quiz3, quiz4, quiz5) VALUES (3, "Guess what note?", 6, 8, 10, 12, 2);

INSERT INTO eartrain (quiz_set_id, eartrain_text, quiz1, quiz2, quiz3, quiz4, quiz5) VALUES (4, "Guess what note?", 1, 3, 5, NULL, NULL);
INSERT INTO eartrain (quiz_set_id, eartrain_text, quiz1, quiz2, quiz3, quiz4, quiz5) VALUES (4, "Guess what note?", 6, 8, 10, NULL, NULL);
INSERT INTO eartrain (quiz_set_id, eartrain_text, quiz1, quiz2, quiz3, quiz4, quiz5) VALUES (4, "Guess what note?", 2, 4, 7, NULL, NULL);
INSERT INTO eartrain (quiz_set_id, eartrain_text, quiz1, quiz2, quiz3, quiz4, quiz5) VALUES (4, "Guess what note?", 9, 11, 12, NULL, NULL);
INSERT INTO eartrain (quiz_set_id, eartrain_text, quiz1, quiz2, quiz3, quiz4, quiz5) VALUES (4, "Guess what note?", 5, 3, 1, NULL, NULL);
INSERT INTO eartrain (quiz_set_id, eartrain_text, quiz1, quiz2, quiz3, quiz4, quiz5) VALUES (4, "Guess what note?", 10, 8, 6, NULL, NULL);
INSERT INTO eartrain (quiz_set_id, eartrain_text, quiz1, quiz2, quiz3, quiz4, quiz5) VALUES (4, "Guess what note?", 2, 4, 6, NULL, NULL);
INSERT INTO eartrain (quiz_set_id, eartrain_text, quiz1, quiz2, quiz3, quiz4, quiz5) VALUES (4, "Guess what note?", 7, 9, 11, NULL, NULL);
INSERT INTO eartrain (quiz_set_id, eartrain_text, quiz1, quiz2, quiz3, quiz4, quiz5) VALUES (4, "Guess what note?", 1, 5, 9, NULL, NULL);
INSERT INTO eartrain (quiz_set_id, eartrain_text, quiz1, quiz2, quiz3, quiz4, quiz5) VALUES (4, "Guess what note?", 12, 8, 4, NULL, NULL);
INSERT INTO eartrain (quiz_set_id, eartrain_text, quiz1, quiz2, quiz3, quiz4, quiz5) VALUES (4, "Guess what note?", 6, 4, 2, NULL, NULL);
INSERT INTO eartrain (quiz_set_id, eartrain_text, quiz1, quiz2, quiz3, quiz4, quiz5) VALUES (4, "Guess what note?", 11, 9, 7, NULL, NULL);
INSERT INTO eartrain (quiz_set_id, eartrain_text, quiz1, quiz2, quiz3, quiz4, quiz5) VALUES (4, "Guess what note?", 1, 3, 5, NULL, NULL);
INSERT INTO eartrain (quiz_set_id, eartrain_text, quiz1, quiz2, quiz3, quiz4, quiz5) VALUES (4, "Guess what note?", 6, 8, 10, NULL, NULL);
INSERT INTO eartrain (quiz_set_id, eartrain_text, quiz1, quiz2, quiz3, quiz4, quiz5) VALUES (4, "Guess what note?", 2, 4, 7, NULL, NULL);
INSERT INTO eartrain (quiz_set_id, eartrain_text, quiz1, quiz2, quiz3, quiz4, quiz5) VALUES (4, "Guess what note?", 9, 11, 12, NULL, NULL);
INSERT INTO eartrain (quiz_set_id, eartrain_text, quiz1, quiz2, quiz3, quiz4, quiz5) VALUES (4, "Guess what note?", 5, 3, 1, NULL, NULL);
INSERT INTO eartrain (quiz_set_id, eartrain_text, quiz1, quiz2, quiz3, quiz4, quiz5) VALUES (4, "Guess what note?", 10, 8, 6, NULL, NULL);
INSERT INTO eartrain (quiz_set_id, eartrain_text, quiz1, quiz2, quiz3, quiz4, quiz5) VALUES (4, "Guess what note?", 1, 3, 5, NULL, NULL);
INSERT INTO eartrain (quiz_set_id, eartrain_text, quiz1, quiz2, quiz3, quiz4, quiz5) VALUES (4, "Guess what note?", 6, 8, 10, NULL, NULL);
INSERT INTO eartrain (quiz_set_id, eartrain_text, quiz1, quiz2, quiz3, quiz4, quiz5) VALUES (4, "Guess what note?", 2, 4, 7, NULL, NULL);
INSERT INTO eartrain (quiz_set_id, eartrain_text, quiz1, quiz2, quiz3, quiz4, quiz5) VALUES (4, "Guess what note?", 9, 11, 12, NULL, NULL);
INSERT INTO eartrain (quiz_set_id, eartrain_text, quiz1, quiz2, quiz3, quiz4, quiz5) VALUES (4, "Guess what note?", 5, 3, 1, NULL, NULL);
INSERT INTO eartrain (quiz_set_id, eartrain_text, quiz1, quiz2, quiz3, quiz4, quiz5) VALUES (4, "Guess what note?", 10, 8, 6, NULL, NULL);
INSERT INTO eartrain (quiz_set_id, eartrain_text, quiz1, quiz2, quiz3, quiz4, quiz5) VALUES (4, "Guess what note?", 1, 3, 5, NULL, NULL);
INSERT INTO eartrain (quiz_set_id, eartrain_text, quiz1, quiz2, quiz3, quiz4, quiz5) VALUES (4, "Guess what note?", 6, 8, 10, NULL, NULL);
INSERT INTO eartrain (quiz_set_id, eartrain_text, quiz1, quiz2, quiz3, quiz4, quiz5) VALUES (4, "Guess what note?", 2, 4, 7, NULL, NULL);
INSERT INTO eartrain (quiz_set_id, eartrain_text, quiz1, quiz2, quiz3, quiz4, quiz5) VALUES (4, "Guess what note?", 9, 11, 12, NULL, NULL);
INSERT INTO eartrain (quiz_set_id, eartrain_text, quiz1, quiz2, quiz3, quiz4, quiz5) VALUES (4, "Guess what note?", 5, 3, 1, NULL, NULL);
INSERT INTO eartrain (quiz_set_id, eartrain_text, quiz1, quiz2, quiz3, quiz4, quiz5) VALUES (4, "Guess what note?", 10, 8, 6, NULL, NULL);

INSERT INTO eartrain (quiz_set_id, eartrain_text, quiz1, quiz2, quiz3, quiz4, quiz5) VALUES (5, "Guess what note?", 1, 3, 5, 7, NULL);
INSERT INTO eartrain (quiz_set_id, eartrain_text, quiz1, quiz2, quiz3, quiz4, quiz5) VALUES (5, "Guess what note?", 2, 4, 6, 8, NULL);
INSERT INTO eartrain (quiz_set_id, eartrain_text, quiz1, quiz2, quiz3, quiz4, quiz5) VALUES (5, "Guess what note?", 3, 5, 7, 9, NULL);
INSERT INTO eartrain (quiz_set_id, eartrain_text, quiz1, quiz2, quiz3, quiz4, quiz5) VALUES (5, "Guess what note?", 4, 6, 8, 10, NULL);
INSERT INTO eartrain (quiz_set_id, eartrain_text, quiz1, quiz2, quiz3, quiz4, quiz5) VALUES (5, "Guess what note?", 5, 7, 9, 11, NULL);
INSERT INTO eartrain (quiz_set_id, eartrain_text, quiz1, quiz2, quiz3, quiz4, quiz5) VALUES (5, "Guess what note?", 6, 8, 10, 12, NULL);
INSERT INTO eartrain (quiz_set_id, eartrain_text, quiz1, quiz2, quiz3, quiz4, quiz5) VALUES (5, "Guess what note?", 1, 3, 5, 7, NULL);
INSERT INTO eartrain (quiz_set_id, eartrain_text, quiz1, quiz2, quiz3, quiz4, quiz5) VALUES (5, "Guess what note?", 2, 4, 6, 8, NULL);
INSERT INTO eartrain (quiz_set_id, eartrain_text, quiz1, quiz2, quiz3, quiz4, quiz5) VALUES (5, "Guess what note?", 3, 5, 7, 9, NULL);
INSERT INTO eartrain (quiz_set_id, eartrain_text, quiz1, quiz2, quiz3, quiz4, quiz5) VALUES (5, "Guess what note?", 4, 6, 8, 10, NULL);
INSERT INTO eartrain (quiz_set_id, eartrain_text, quiz1, quiz2, quiz3, quiz4, quiz5) VALUES (5, "Guess what note?", 5, 7, 9, 11, NULL);
INSERT INTO eartrain (quiz_set_id, eartrain_text, quiz1, quiz2, quiz3, quiz4, quiz5) VALUES (5, "Guess what note?", 6, 8, 10, 12, NULL);
INSERT INTO eartrain (quiz_set_id, eartrain_text, quiz1, quiz2, quiz3, quiz4, quiz5) VALUES (5, "Guess what note?", 1, 3, 5, 7, NULL);
INSERT INTO eartrain (quiz_set_id, eartrain_text, quiz1, quiz2, quiz3, quiz4, quiz5) VALUES (5, "Guess what note?", 2, 4, 6, 8, NULL);
INSERT INTO eartrain (quiz_set_id, eartrain_text, quiz1, quiz2, quiz3, quiz4, quiz5) VALUES (5, "Guess what note?", 3, 5, 7, 9, NULL);
INSERT INTO eartrain (quiz_set_id, eartrain_text, quiz1, quiz2, quiz3, quiz4, quiz5) VALUES (5, "Guess what note?", 4, 6, 8, 10, NULL);
INSERT INTO eartrain (quiz_set_id, eartrain_text, quiz1, quiz2, quiz3, quiz4, quiz5) VALUES (5, "Guess what note?", 5, 7, 9, 11, NULL);
INSERT INTO eartrain (quiz_set_id, eartrain_text, quiz1, quiz2, quiz3, quiz4, quiz5) VALUES (5, "Guess what note?", 6, 8, 10, 12, NULL);
INSERT INTO eartrain (quiz_set_id, eartrain_text, quiz1, quiz2, quiz3, quiz4, quiz5) VALUES (5, "Guess what note?", 1, 3, 5, 7, NULL);
INSERT INTO eartrain (quiz_set_id, eartrain_text, quiz1, quiz2, quiz3, quiz4, quiz5) VALUES (5, "Guess what note?", 2, 4, 6, 8, NULL);
INSERT INTO eartrain (quiz_set_id, eartrain_text, quiz1, quiz2, quiz3, quiz4, quiz5) VALUES (5, "Guess what note?", 3, 5, 7, 9, NULL);
INSERT INTO eartrain (quiz_set_id, eartrain_text, quiz1, quiz2, quiz3, quiz4, quiz5) VALUES (5, "Guess what note?", 4, 6, 8, 10, NULL);
INSERT INTO eartrain (quiz_set_id, eartrain_text, quiz1, quiz2, quiz3, quiz4, quiz5) VALUES (5, "Guess what note?", 5, 7, 9, 11, NULL);
INSERT INTO eartrain (quiz_set_id, eartrain_text, quiz1, quiz2, quiz3, quiz4, quiz5) VALUES (5, "Guess what note?", 6, 8, 10, 12, NULL);
INSERT INTO eartrain (quiz_set_id, eartrain_text, quiz1, quiz2, quiz3, quiz4, quiz5) VALUES (5, "Guess what note?", 1, 3, 5, 7, NULL);
INSERT INTO eartrain (quiz_set_id, eartrain_text, quiz1, quiz2, quiz3, quiz4, quiz5) VALUES (5, "Guess what note?", 2, 4, 6, 8, NULL);
INSERT INTO eartrain (quiz_set_id, eartrain_text, quiz1, quiz2, quiz3, quiz4, quiz5) VALUES (5, "Guess what note?", 3, 5, 7, 9, NULL);
INSERT INTO eartrain (quiz_set_id, eartrain_text, quiz1, quiz2, quiz3, quiz4, quiz5) VALUES (5, "Guess what note?", 4, 6, 8, 10, NULL);
INSERT INTO eartrain (quiz_set_id, eartrain_text, quiz1, quiz2, quiz3, quiz4, quiz5) VALUES (5, "Guess what note?", 5, 7, 9, 11, NULL);
INSERT INTO eartrain (quiz_set_id, eartrain_text, quiz1, quiz2, quiz3, quiz4, quiz5) VALUES (5, "Guess what note?", 6, 8, 10, 12, NULL);

INSERT INTO eartrain (quiz_set_id, eartrain_text, quiz1, quiz2, quiz3, quiz4, quiz5) VALUES (6, "Guess what note?", 1, 3, 5, 7, 9);
INSERT INTO eartrain (quiz_set_id, eartrain_text, quiz1, quiz2, quiz3, quiz4, quiz5) VALUES (6, "Guess what note?", 2, 4, 6, 8, 10);
INSERT INTO eartrain (quiz_set_id, eartrain_text, quiz1, quiz2, quiz3, quiz4, quiz5) VALUES (6, "Guess what note?", 3, 5, 7, 9, 11);
INSERT INTO eartrain (quiz_set_id, eartrain_text, quiz1, quiz2, quiz3, quiz4, quiz5) VALUES (6, "Guess what note?", 4, 6, 8, 10, 12);
INSERT INTO eartrain (quiz_set_id, eartrain_text, quiz1, quiz2, quiz3, quiz4, quiz5) VALUES (6, "Guess what note?", 5, 7, 9, 11, 1);
INSERT INTO eartrain (quiz_set_id, eartrain_text, quiz1, quiz2, quiz3, quiz4, quiz5) VALUES (6, "Guess what note?", 6, 8, 10, 12, 2);
INSERT INTO eartrain (quiz_set_id, eartrain_text, quiz1, quiz2, quiz3, quiz4, quiz5) VALUES (6, "Guess what note?", 1, 3, 5, 7, 9);
INSERT INTO eartrain (quiz_set_id, eartrain_text, quiz1, quiz2, quiz3, quiz4, quiz5) VALUES (6, "Guess what note?", 2, 4, 6, 8, 10);
INSERT INTO eartrain (quiz_set_id, eartrain_text, quiz1, quiz2, quiz3, quiz4, quiz5) VALUES (6, "Guess what note?", 3, 5, 7, 9, 11);
INSERT INTO eartrain (quiz_set_id, eartrain_text, quiz1, quiz2, quiz3, quiz4, quiz5) VALUES (6, "Guess what note?", 4, 6, 8, 10, 12);
INSERT INTO eartrain (quiz_set_id, eartrain_text, quiz1, quiz2, quiz3, quiz4, quiz5) VALUES (6, "Guess what note?", 5, 7, 9, 11, 1);
INSERT INTO eartrain (quiz_set_id, eartrain_text, quiz1, quiz2, quiz3, quiz4, quiz5) VALUES (6, "Guess what note?", 6, 8, 10, 12, 2);
INSERT INTO eartrain (quiz_set_id, eartrain_text, quiz1, quiz2, quiz3, quiz4, quiz5) VALUES (6, "Guess what note?", 1, 3, 5, 7, 9);
INSERT INTO eartrain (quiz_set_id, eartrain_text, quiz1, quiz2, quiz3, quiz4, quiz5) VALUES (6, "Guess what note?", 2, 4, 6, 8, 10);
INSERT INTO eartrain (quiz_set_id, eartrain_text, quiz1, quiz2, quiz3, quiz4, quiz5) VALUES (6, "Guess what note?", 3, 5, 7, 9, 11);
INSERT INTO eartrain (quiz_set_id, eartrain_text, quiz1, quiz2, quiz3, quiz4, quiz5) VALUES (6, "Guess what note?", 4, 6, 8, 10, 12);
INSERT INTO eartrain (quiz_set_id, eartrain_text, quiz1, quiz2, quiz3, quiz4, quiz5) VALUES (6, "Guess what note?", 5, 7, 9, 11, 1);
INSERT INTO eartrain (quiz_set_id, eartrain_text, quiz1, quiz2, quiz3, quiz4, quiz5) VALUES (6, "Guess what note?", 6, 8, 10, 12, 2);
INSERT INTO eartrain (quiz_set_id, eartrain_text, quiz1, quiz2, quiz3, quiz4, quiz5) VALUES (6, "Guess what note?", 1, 3, 5, 7, 9);
INSERT INTO eartrain (quiz_set_id, eartrain_text, quiz1, quiz2, quiz3, quiz4, quiz5) VALUES (6, "Guess what note?", 2, 4, 6, 8, 10);
INSERT INTO eartrain (quiz_set_id, eartrain_text, quiz1, quiz2, quiz3, quiz4, quiz5) VALUES (6, "Guess what note?", 3, 5, 7, 9, 11);
INSERT INTO eartrain (quiz_set_id, eartrain_text, quiz1, quiz2, quiz3, quiz4, quiz5) VALUES (6, "Guess what note?", 4, 6, 8, 10, 12);
INSERT INTO eartrain (quiz_set_id, eartrain_text, quiz1, quiz2, quiz3, quiz4, quiz5) VALUES (6, "Guess what note?", 5, 7, 9, 11, 1);
INSERT INTO eartrain (quiz_set_id, eartrain_text, quiz1, quiz2, quiz3, quiz4, quiz5) VALUES (6, "Guess what note?", 6, 8, 10, 12, 2);
INSERT INTO eartrain (quiz_set_id, eartrain_text, quiz1, quiz2, quiz3, quiz4, quiz5) VALUES (6, "Guess what note?", 1, 3, 5, 7, 9);
INSERT INTO eartrain (quiz_set_id, eartrain_text, quiz1, quiz2, quiz3, quiz4, quiz5) VALUES (6, "Guess what note?", 2, 4, 6, 8, 10);
INSERT INTO eartrain (quiz_set_id, eartrain_text, quiz1, quiz2, quiz3, quiz4, quiz5) VALUES (6, "Guess what note?", 3, 5, 7, 9, 11);
INSERT INTO eartrain (quiz_set_id, eartrain_text, quiz1, quiz2, quiz3, quiz4, quiz5) VALUES (6, "Guess what note?", 4, 6, 8, 10, 12);
INSERT INTO eartrain (quiz_set_id, eartrain_text, quiz1, quiz2, quiz3, quiz4, quiz5) VALUES (6, "Guess what note?", 5, 7, 9, 11, 1);
INSERT INTO eartrain (quiz_set_id, eartrain_text, quiz1, quiz2, quiz3, quiz4, quiz5) VALUES (6, "Guess what note?", 6, 8, 10, 12, 2);
