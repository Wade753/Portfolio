const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const knex = require('knex');


const db = knex({
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        user: 'costinal_user',          //costinal_user
        password: 'BrjTb2j6+LwC',       // PASSWORD BrjTb2j6+LwC
        database: 'costinal_users'
        }   
})

const app = express ();

let intialPath = path.join(__dirname, "js");

app.use(express.static(__dirname + '/img'));
app.use(express.static(__dirname + '/css'));
app.use(bodyParser.json());
app.use(express.static(intialPath));

//  <<<<DEFAULT >>>>
app.get('/', (req, res) => {
    res.sendFile(path.join(intialPath, "index.html"));
})
//  <<<<HOME >>>>
app.get('/home', (req, res) => {
    res.sendFile(path.join(intialPath, "index.html"));
})
//  <<<<LOGIN >>>>
app.get('/login', (req, res) =>{
    res.sendFile(path.join(intialPath, "login.html"));
})
//  <<<<REGISTER >>>>
app.get('/register', (req, res) =>{
    res.sendFile(path.join(intialPath, "register.html"));
})
//  <<<<PROJECTS >>>>
app.get('/spaceinvaders', (req, res) =>{
    res.sendFile(path.join(intialPath, "spaceinvaders.html"));
})


app.post('/register-user', (req, res) =>{
    const {nume, email, password} = req.body;

    if(!nume.length || !email.length || !password.length){
        res.json('fill all the fields');
    } else{
        db("users").insert({
            name: nume,
            email: email,
            password: password
        })
        .returning(["name", "email"])
        .then(data => {
            res.json(data[0])
        })
        .catch(err => {
            if(err != null && err.detail != null && err.detail.includes('already exist')){
                res.json('email already exist');
            } else {
                console.log(err);
            }
        })
    }
})

app.post('/login-user', (req, res) => {
    const {email, password} = req.body;

    db.select('name', 'email')
    .from('users')
    .where({
        email: email,
        password: password
    })
    .then(data => {
        if(data.length){
            res.json(data[0]);
        } else{
            res.json('email or password is incorrect');
        }
    })
})

app.listen(process.env.PORT ||3000, (req, res) => {
    console.log('listening on port 3000.....')
})