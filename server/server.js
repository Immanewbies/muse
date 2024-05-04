import express from 'express';
import mysql from 'mysql';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import cookieParser from 'cookie-parser';
import moment from 'moment';
import os from 'os';
const port = process.env.PORT || 8081;
const salt = process.env.SALT || 10;
const Host = process.env.EC2_HOST;
const ipV4 = process.env.EC2_IPV4;
const User = process.env.DB_USER || "root";
const Pwd = process.env.DB_PWD|| "";
const DB = process.env.DB_DB || "muse";
const Address = Host || "http://localhost:3000";

const app = express();
app.use(express.json());
app.use(cors({
    origin: [Address, ipV4],
    method: ["POST", "GET"],
    credentials: true
}));
app.use(cookieParser());

const db = mysql.createConnection({
    host: Host,
    user: User,
    password: Pwd,
    database: DB,
    port: 3306
})

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

app.post('/register', (req, res) => {
    const sql = "INSERT INTO user (`username`,`password`,`profile_name`) VALUES (?)";
    bcrypt.hash(req.body.password, salt, (err, hash) => {
        if (err) return res.json({ Error: "Error for hashing password" });
        const values = [
            req.body.username,
            hash,
            req.body.profile_name
        ]
        db.query(sql, [values], (err, results) => {
            if (err) return res.json({ Error: "Inserting data error in server" });
            return res.json({ Status: "Success" });
        })
    })
})

app.post('/login', (req, res) => {
    const sql = "SELECT * FROM user WHERE username = ?";
    db.query(sql, [req.body.username], (err, data) => {
        if (err) return res.json({ Error: "Login error in server" });
        if (data.length > 0) {
            bcrypt.compare(req.body.password.toString(), data[0].password, (err, result) => {
                if (err) return res.json({ Error: "Password compare error" });
                if (result) {
                    const profile_name = data[0].profile_name;
                    const token = jwt.sign({ profile_name }, "jwt-secret-key", { expiresIn: '1d' });
                    res.cookie('token', token);
                    res.json({ Status: "Success" });
                } else {
                    res.json({ Error: "Password not matched" });
                }
            })
        } else {
            return res.json({ Error: "No username existed" })
        }
    })
})

app.get('/logout', (req, res) => {
    res.clearCookie('token');
    return res.json({ Status: "Success" });
})

app.post('/chord/findchord', (req, res) => {
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

    db.query(sql, params, (err, results) => {
        if (err) return res.json({ error: "No chords found in the server" });
        return res.json(results);
    });
});


app.post('/scale/findscale', (req, res) => {
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

    db.query(sql, params, (err, results) => {
        if (err) return res.json({ error: "No scales found in the server" });
        return res.json(results);
    });
})

app.post('/eartrain/question', (req, res) => {
    const sql = `
    SELECT E.eartrain_text, E.quiz1, E.quiz2, E.quiz3, E.quiz4, E.quiz5
    FROM Eartrain E
    INNER JOIN Quiz QS ON E.quiz_set_id = QS.quiz_set_id
    INNER JOIN Difficulty D ON QS.difficulty_id = D.difficulty_id
    INNER JOIN Category C ON QS.category_id = C.category_id
    WHERE D.difficulty_name = ? 
    AND C.category_name = ?
    `;
    const params = [req.body.difficulty_name, req.body.category_name];

    db.query(sql, params, (err, results) => {
        if (err) return res.json({ error: "No Question" });
        return res.json(results);
    });
})

app.get('/eartrain/note', (req, res) => {
    const sql = "SELECT note_name FROM Note";
    db.query(sql, (err, results) => {
        if (err) return res.json({ error: "No Notes found in the server" });
        return res.json(results);
    });
})

app.get('/eartrain/chord', (req, res) => {
    const sql = "SELECT chord_name FROM Chord";
    db.query(sql, (err, results) => {
        if (err) return res.json({ error: "No Notes found in the server" });
        return res.json(results);
    });
})

app.post('/quiz/question', (req, res) => {
    const sql = `
    SELECT Q.question_text, Q.option1, Q.option2, Q.option3, Q.option4, Q.ans	
    FROM Question Q
    INNER JOIN Quiz QS ON Q.quiz_set_id = QS.quiz_set_id
    INNER JOIN Difficulty D ON QS.difficulty_id = D.difficulty_id
    INNER JOIN Category C ON QS.category_id = C.category_id
    WHERE D.difficulty_name = ? 
    AND C.category_name = ?
    `;
    const params = [req.body.difficulty_name, req.body.category_name];

    db.query(sql, params, (err, results) => {
        if (err) return res.json({ error: "No Question" });
        return res.json(results);
    });
})

app.post('/user/score', (req, res) => {
    const sqlProfile = "SELECT user_id FROM user WHERE profile_name = ?";
    const currentDateTime = moment().format('YYYY-MM-DD HH:mm:ss');
    db.query(sqlProfile, [req.body.profile_name], (err, results) => {
        if (err) return res.json({ Error: "No user found in server" });
        else {
            const userid = results[0].user_id;
            const sqlQSid = `
            SELECT QS.quiz_set_id
            FROM Quiz QS
            INNER JOIN Difficulty D ON QS.difficulty_id = D.difficulty_id
            INNER JOIN Category C ON QS.category_id = C.category_id
            WHERE D.difficulty_name = ? 
            AND C.category_name = ?
            `;
            const params = [req.body.difficulty_name, req.body.category_name];
            db.query(sqlQSid, params, (err, results) => {
                if (err) return res.json({ Error: "Can't find quiz id" });
                else {
                    const quizsetid = results[0].quiz_set_id;
                    const sql = "INSERT INTO score (`user_id`,`quiz_set_id`,`score`,`submit_date`) VALUES (?)";
                    const values = [
                        userid,
                        quizsetid,
                        req.body.score,
                        currentDateTime
                    ]
                    db.query(sql, [values], (err, results) => {
                        if (err) return res.json({ Error: "Inserting data error in server" });
                        return res.json({ Status: "Success" });
                    })
                }
            })
        }
    })

})

app.post('/user/getscore', (req, res) => {
    const sql = "SELECT user_id FROM user WHERE profile_name = ?";
    db.query(sql, [req.body.profile_name], (err, results) => {
        if (err) return res.json({ Error: "No user found in server" });
        else {
            const userid = results[0].user_id;
            const sql = "SELECT quiz_set_id, score, submit_date FROM score WHERE user_id = ?";
            db.query(sql, [userid], (err, results) => {
                if (err) return res.json({ Error: "Inserting data error in server" });
                return res.json(results);
            })
        }
    })
})

app.listen(port, () => {
    console.log("Start server");
})

export default app;