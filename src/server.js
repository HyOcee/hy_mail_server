// require('dotenv').config()
import express from 'express';

import bodyParser from 'body-parser';
import cors from 'cors';

import {transporter} from './mailer/mailer.js';

import { createUser, findUser } from './database/database.js';
import { response } from 'express';

const app = express();

app.use(cors())
// app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

const PORT = process.env.PORT || 3000;

const users = [
    {username: 'eosemegbe@yahoo.com',password: 'qwe'},
    {username: 'Tobi',password: 'qwer'},
    {username: 'Kenny',password: 'qwerty'}
]

app.get('/', (req, res) => {
    console.log('api accessed')
    res.send('<h1>This is a test application</h1>')
})

app.post('/signin', (req, res) => {
    const {username, password} = req.body
    let userToFind = {
        username
    }

    findUser(userToFind)
        .then(user => {
            console.log(user)
            // send mail
            const mailOptions = {
                from: 'eosemegbe@gmail.com',
                to: user.email,
                subject: 'Someone logged into your account',
                text: 'That was easy!'
              };

              transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  console.log(error);
                } else {
                  console.log('Email sent: ' + info.response);
                  myResponse = 1;
                }
              });
        })
    res.json('ma nigga')      
})

app.get('/test', (req, res) => {
    console.log('working')
    res.json('well done Onos')
})

app.post('/signup', (req, res) => {
    createUser(req.body)
        .then(response => {
            res.json(true)
        }).catch(err => res.json(err))
})

app.listen((PORT), () => {
    console.log(`app is running on port ${PORT}`);
})