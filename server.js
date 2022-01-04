const express = require('express');
const bodyParser = require('body-parser');
const {Client} = require('pg');
const cors = require('cors');



const db = new Client({
    host: 'localhost',
    user: 'postgres',
    port: '5432',
    password: '0000',
    database: 'my_mail'
})

// db.connect(err => {
//     if (err){
//         console.error('connection error', err.stack)
//     } else {
//         console.log('Connected to database')
//     }
// });

const app = express();

app.use(cors())
app.use(express.static(__dirname+"/public"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))


app.post('/signin', (req, res) => {
    console.log('signin api accessed')
    db.query(`SELECT password FROM users WHERE username = '${req.body.username}'`)
            .then(response => {
                if(response.rows[0].password === req.body.password){
                    console.log(`access granted 1`)
                    res.json(1)
                } else {
                    console.log(`wrong password 2`)
                    res.json(2)
                }
            })
            .catch(err => {
                console.log(err.message)
                res.json(3)
            })
})

app.post('/test',(req,res) =>{
    console.log('working')
    res.json('well done Ose')
})



app.post('/signup', (req, res) => {
    const {firstName, lastName, username, password} = req.body;
    db.query(`INSERT INTO users (firstname, lastname, username, password)
        VALUES ('${firstName}', '${lastName}', '${username}', '${password}')`)
        .then(response => {
            const signupStatus = true;
            res.json(signupStatus)
        })
        .catch(err => {
            const signupStatus = false;
            console.log(err.message)
            res.json(signupStatus)
        })
})

app.post('/mails', (req,res) => { 
    console.log(`getting mails for ${req.body.username}`)   
     db.query(`SELECT * FROM mails WHERE receiver = '${req.body.username}' ORDER BY mailid`)
        .then(response => res.json(response.rows))
        .catch(err => {
            console.log(`Error getting mails; ${err}`)
            res.json(false)
        })
    })

app.put('/sendmail',(req,res) => {
    const { sender, receiver, mailContent, starred, read, time} = req.body;
    console.log(`sending mail from ${sender} to ${receiver}`)   
     db.query(`INSERT INTO mails (sender, receiver, mailContent, starred, read, time)
        VALUES ('${sender}', '${receiver}', '${mailContent}', '${starred}', 
        '${read}', '${time}') `)
        .then(response => {
            res.json(true)
        })
        .catch(err => {
            console.log(`Error getting mails; ${err}`)
            res.json(false)
        })
})

app.put('/changestar', (req, res) => {
  const {mailID} = req.body;
    db.query(`SELECT starred FROM mails WHERE mailid = ${mailID}`)
        .then(data => {
            if(data.rows[0].starred === false){
                db.query(`UPDATE mails SET starred = true WHERE mailid = ${mailID}`)
                res.json(1)
                console.log('now starred')
            } else {
                db.query(`UPDATE mails SET starred = false WHERE mailid = ${mailID}`)
                res.json(2)
                console.log('now unstarred')
            }
        })
        .catch(err => {
            console.log(err.message)
            res.json(3)
        })
    .catch(err => {
        console.log(`error 2 starring`)
        res.json(false)
    })  
})

app.put('/changeread', (req, res) => {
     const {mailID} = req.body;
    db.query(`SELECT read FROM mails WHERE mailid = ${mailID}`)
        .then(data => {
            if(data.rows[0].read === false){
                db.query(`UPDATE mails SET read = true WHERE mailid = ${mailID}`)
                res.json(1)
                console.log('now read')
            } else {
                db.query(`UPDATE mails SET read = false WHERE mailid = ${mailID}`)
                res.json(2)
                console.log('now unread')
            }
        })
        .catch(err => {
            console.log(err.message)
            res.json(3)
        })
    .catch(err => {
        console.log(`error 2 starring`)
        res.json(false)
    })   
})

app.delete('/delete', (req,res) => {
    const {mailID, username} = req.body;
    console.log(`deleting mail for ${username}`)
    db.query(` DELETE FROM mails WHERE mailid = '${mailID}'`)
    .then(response => res.json(true))
    .catch(err => {
        console.log(`error deleting mail`)
        res.json(false)
    })
})


port = 3000;
app.listen((port), () => {
    console.log(`app is running on port ${port}`);
})