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

app.get('/activities', (req,res) => {
    res.json({"activities":[{"type":"report","title":"You have scheduled an interview with Michael Okoh"},{"type":"report","title":"You have scheduled an interview with Michael Okoh"},{"type":"report","title":"You have scheduled an interview with Michael Okoh"},{"type":"interview","title":"You have scheduled an interview with Michael Okoh"}]})
})

app.get('/patients', (req,res) => {
    res.json({"scheduledAppointments":"4","totalPatients":"12,345","waitinfRoom":"21,045","appointments":[{"id":"1","createdAt":"2020-11-22T23:10:24.998Z","name":"Christina Murphy","avatar":"https://cdn.fakercloud.com/avatars/akashsharma39_128.jpg","verification_status":true,"email":"Sylvan71@yahoo.com"},{"id":"2","createdAt":"2020-11-23T02:47:59.159Z","name":"Boyd Feeney","avatar":"https://cdn.fakercloud.com/avatars/andysolomon_128.jpg","verification_status":false,"email":"Keven_Bode98@hotmail.com"},{"id":"3","createdAt":"2020-11-23T01:49:53.526Z","name":"Deshaun Koepp","avatar":"https://cdn.fakercloud.com/avatars/cocolero_128.jpg","verification_status":false,"email":"Hardy_Schmidt16@yahoo.com"},{"id":"4","createdAt":"2020-11-22T17:23:37.502Z","name":"Mrs. Joyce Jones","avatar":"https://cdn.fakercloud.com/avatars/jamiebrittain_128.jpg","verification_status":false,"email":"Eleanore65@hotmail.com"},{"id":"5","createdAt":"2020-11-23T00:52:18.380Z","name":"Anderson Lang","avatar":"https://cdn.fakercloud.com/avatars/jamiebrittain_128.jpg","verification_status":true,"email":"Weston90@gmail.com"},{"id":"6","createdAt":"2020-11-22T16:13:59.190Z","name":"Riley Altenwerth","avatar":"https://cdn.fakercloud.com/avatars/jamiebrittain_128.jpg","verification_status":true,"email":"Roslyn.Conn50@hotmail.com"},{"id":"7","createdAt":"2020-11-23T05:04:53.377Z","name":"Heaven Kris","avatar":"https://cdn.fakercloud.com/avatars/jamiebrittain_128.jpg","verification_status":false,"email":"Gavin88@gmail.com"},{"id":"8","createdAt":"2020-11-23T09:34:49.310Z","name":"Judah Baumbach","avatar":"https://cdn.fakercloud.com/avatars/victor_haydin_128.jpg","verification_status":true,"email":"Cletus92@hotmail.com"},{"id":"9","createdAt":"2020-11-22T17:41:50.525Z","name":"Vaughn Little","avatar":"https://cdn.fakercloud.com/avatars/victor_haydin_128.jpg","verification_status":false,"email":"Titus.Hackett@gmail.com"},{"id":"10","createdAt":"2020-11-23T00:28:29.830Z","name":"Eveline Koss","avatar":"https://cdn.fakercloud.com/avatars/victor_haydin_128.jpg","verification_status":false,"email":"Antoinette.Rempel1@yahoo.com"}]})
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