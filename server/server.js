import express from 'express';
import mysql from 'mysql';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import cookieParser from 'cookie-parser';
const salt = 10;

const app = express();
app.use(express.json());
app.use(cors({
    origin: ["http://localhost:3000"],
    method: ["POST", "GET"],
    credentials: true
}));
app.use(cookieParser());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: 'muse'
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
    bcrypt.hash(req.body.password.toString(), salt, (err, hash) => {
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
            bcrypt.compare(req.body.password.toString(), data[0].password, (err, response) => {
                if (err) return res.json({ Error: "Password compare error" });
                if (response) {
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

// app.get('/chord/getallchord', (req, res) => {
//     const sql = "SELECT * FROM chord"
//     db.query(sql, (err, results) => {
//         if(err) return res.json({ Error: "No chord in server"})
//         return res.json(results)
//     })
// })

// app.get('/scale/getallscale', (req, res) => {
//     const sql = "SELECT * FROM scale"
//     db.query(sql, (err, results) => {
//         if(err) return res.json({ Error: "No scale in server"})
//         return res.json(results)
//     })
// })

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

app.post('/eartrain/note/quiz', (req, res) => {
    
})

app.post('/eartrain/chord/quiz', (req, res) => {
    
})

app.listen(8081, () => {
    console.log("Back-End Running...")
})