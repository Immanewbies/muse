import express from 'express';
import mysql2 from 'mysql2/promise'; // Import the promise wrapper
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import cookieParser from 'cookie-parser';
import moment from 'moment';
import dotenv from 'dotenv';
dotenv.config();

const port = process.env.PORT;
const salt = process.env.SALT;

const app = express();
app.use(express.json());
app.use(cors({
    origin: [process.env.EC2_IPV4,  "http://localhost:3000"],
    methods: ["POST", "GET"],
    credentials: true
}));
app.use(cookieParser());

// Create a MySQL connection using mysql2
const db = mysql2.createPool({
    host: process.env.MYSQL_HOST || "localhost",
    user: process.env.MYSQL_USER || "root",
    password: process.env.MYSQL_PASSWORD || "",
    database: process.env.MYSQL_DATABASE || "muse",
    connectionLimit: 10,
    queueLimit: 0
});

db.getConnection((err, connection) => {
    if (err) {
        console.error("Failed to connect to the database:", err);
    } else {
        console.log("Database connection successfully established.");
        connection.release(); // release to pool
    }
});

const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.json({ Error: "UR not authenticated" });
    } else {
        jwt.verify(token, "jwt-secret-key", (err, decoded) => {
            if (err) {
                return res.json({ Error: "token is expired" });
            } else {
                req.profile_name = decoded.profile_name;
                next();
            }
        })
    }
}

app.get('/', verifyUser, (req, res) => {
    return res.json({ Status: "Success", profile_name: req.profile_name })
})

app.post('/register', async (req, res) => {
    const sql = "INSERT INTO user (`username`,`password`,`profile_name`) VALUES (?, ?, ?)";
    try {
        const hash = await bcrypt.hash(req.body.password.toString(), Number(salt));
        const values = [req.body.username, hash, req.body.profile_name];
        const connection = await db; // Ensure the db connection is awaited
        const [results] = await connection.query(sql, values);
        res.json({ Status: "Success" });
    } catch (err) {
        console.error(err);
        res.json({ Error: "Error occurred on the server" });
    }
});

app.post('/login', async (req, res) => {
    const sql = "SELECT * FROM user WHERE username = ?";
    try {
        const connection = await db;
        const [data] = await connection.query(sql, [req.body.username]);
        if (data.length > 0) {
            const match = await bcrypt.compare(req.body.password.toString(), data[0].password);
            if (match) {
                const profile_name = data[0].profile_name;
                const token = jwt.sign({ profile_name }, "jwt-secret-key", { expiresIn: '1d' });
                res.cookie('token', token, { httpOnly: true });
                res.json({ Status: "Success" });
            } else {
                res.json({ Error: "Password not matched" });
            }
        } else {
            res.json({ Error: "No username existed" });
        }
    } catch (err) {
        console.error(err);
        res.json({ Error: "Login error in server" });
    }
});

app.get('/logout', (req, res) => {
    res.clearCookie('token');
    return res.json({ Status: "Success" });
})

app.post('/chord/findchord', async (req, res) => {
    let sql = "SELECT * FROM chord WHERE 1=1";
    const params = [];

    if (req.body.chord_note) {
        sql += " AND chord_note = ?";
        params.push(req.body.chord_note);
    }

    if (req.body.chord_tension) {
        sql += " AND chord_tension = ?";
        params.push(req.body.chord_tension);
    }

    try {
        const connection = await db;
        const [results] = await connection.query(sql, params);
        if (results.length === 0) {
            return res.status(404).json({ error: "No chords found matching the criteria." });
        }
        return res.json(results);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "An error occurred on the server." });
    }
});

app.post('/scale/findscale', async (req, res) => {
    let sql = "SELECT * FROM scale WHERE 1=1";
    const params = [];

    if (req.body.scale_note) {
        sql += " AND scale_note = ?";
        params.push(req.body.scale_note);
    }

    if (req.body.scale_tension) {
        sql += " AND scale_tension = ?";
        params.push(req.body.scale_tension);
    }

    try {
        const connection = await db;
        const [results] = await connection.query(sql, params);
        if (results.length === 0) {
            return res.status(404).json({ error: "No scales found matching the criteria." });
        }
        return res.json(results);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "An error occurred on the server." });
    }
});

app.post('/eartrain/question', async (req, res) => {
    const sql = `
    SELECT E.eartrain_text, E.quiz1, E.quiz2, E.quiz3, E.quiz4, E.quiz5
    FROM eartrain E
    INNER JOIN quiz QS ON E.quiz_set_id = QS.quiz_set_id
    INNER JOIN difficulty D ON QS.difficulty_id = D.difficulty_id
    INNER JOIN category C ON QS.category_id = C.category_id
    WHERE D.difficulty_name = ? 
    AND C.category_name = ?
    `;
    const params = [req.body.difficulty_name, req.body.category_name];

    try {
        const connection = await db;
        const [results] = await connection.query(sql, params);
        if (results.length === 0) {
            return res.status(404).json({ error: "No questions found matching the criteria." });
        }
        return res.json(results);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "An error occurred while querying the database." });
    }
});

app.get('/eartrain/note', async (req, res) => {
    const sql = "SELECT note_name FROM note";
    try {
        const connection = await db;
        const [results] = await connection.query(sql, params);
        if (results.length === 0) {
            return res.status(404).json({ error: "No notes found." });
        }
        return res.json(results);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "An error occurred while querying the database." });
    }
});

app.get('/eartrain/chord', async (req, res) => {
    const sql = "SELECT chord_name FROM chord";
    try {
        const connection = await db;
        const [results] = await connection.query(sql, params);
        if (results.length === 0) {
            return res.status(404).json({ error: "No chords found." });
        }
        return res.json(results);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "An error occurred while querying the database." });
    }
});

app.post('/quiz/question', async (req, res) => {
    const sql = `
    SELECT Q.question_text, Q.option1, Q.option2, Q.option3, Q.option4, Q.ans	
    FROM question Q
    INNER JOIN quiz QS ON Q.quiz_set_id = QS.quiz_set_id
    INNER JOIN difficulty D ON QS.difficulty_id = D.difficulty_id
    INNER JOIN category C ON QS.category_id = C.category_id
    WHERE D.difficulty_name = ? 
    AND C.category_name = ?
    `;
    const params = [req.body.difficulty_name, req.body.category_name];

    try {
        const connection = await db;
        const [results] = await connection.query(sql, params);
        if (results.length === 0) {
            return res.status(404).json({ error: "No questions found matching the criteria." });
        }
        return res.json(results);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "An error occurred while querying the database." });
    }
});

app.post('/user/score', async (req, res) => {
    const sqlProfile = "SELECT user_id FROM user WHERE profile_name = ?";
    const currentDateTime = moment().format('YYYY-MM-DD HH:mm:ss');

    try {
        const connection = await db;
        const [userResults] = await connection.query(sqlProfile, [req.body.profile_name]);
        if (userResults.length === 0) {
            return res.status(404).json({ Error: "User not found in server" });
        }
        const userid = userResults[0].user_id;

        const sqlQSid = `
        SELECT QS.quiz_set_id
        FROM quiz QS
        INNER JOIN difficulty D ON QS.difficulty_id = D.difficulty_id
        INNER JOIN category C ON QS.category_id = C.category_id
        WHERE D.difficulty_name = ? 
        AND C.category_name = ?
        `;
        const params = [req.body.difficulty_name, req.body.category_name];
        const [quizResults] = await connection.query(sqlQSid, params);
        if (quizResults.length === 0) {
            return res.status(404).json({ Error: "Quiz set not found" });
        }
        const quizsetid = quizResults[0].quiz_set_id;

        const sql = "INSERT INTO score (`user_id`,`quiz_set_id`,`score`,`submit_date`) VALUES (?, ?, ?, ?)";
        const values = [userid, quizsetid, req.body.score, currentDateTime];
        await connection.query(sql, values);
        return res.json({ Status: "Success" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ Error: "An error occurred while inserting data into server" });
    }
});

app.post('/user/getscore', async (req, res) => {
    const sql = "SELECT user_id FROM user WHERE profile_name = ?";
    try {
        const connection = await db;
        const [results] = await connection.query(sql, [req.body.profile_name]);
        if (results.length === 0) {
            return res.status(404).json({ Error: "User not found in server." });
        }
        const userid = results[0].user_id;
        const scoreSql = `SELECT d.difficulty_name, c.category_name, s.score, s.submit_date, s.quiz_set_id
        FROM score s
        JOIN quiz q ON s.quiz_set_id = q.quiz_set_id
        JOIN difficulty d ON q.difficulty_id = d.difficulty_id
        JOIN category c ON q.category_id = c.category_id
        WHERE s.user_id = ?
        `;
        const [scoreResults] = await connection.query(scoreSql, [userid]);
        return res.json(scoreResults);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ Error: "An error occurred while querying the database." });
    }
});



app.listen(port, () => {
    console.log("Start server");
})

export default app;