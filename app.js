const express = require('express');
const app = express();
const expressValidator = require('express-validator');
const users = require('./data/users');

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');


app.get('/', (req, res) => {
    res.render('index', {
        title: "This is ejs title",
        users: users,
    });
    console.log(users)
})

app.post('/users/add', (req, res) => {

    req.checkBody('first_name', "First Name is required").notEmpty();
    req.checkBody('last_name', "Last Name is required").notEmpty();
    req.checkBody('email', "Email is required").notEmpty();

    let newUser = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
    }
    console.log(newUser);
});

app.listen(7000, () => {
    console.log("Server running on port 7000");
});


//-----------------------------------
//create middleware
// let logger = (req, res, next) => {
//     console.log("Logging... .")
//     next();
// }
// app.use(logger);

// app.use(express.static(__dirname + "/public"));

//create json 
// let people = [
//     {
//         name: 'Kei',
//         age: 101
//     },
//     {
//         name: 'Mart',
//         age: 102
//     }
// ]

// //json response
// app.get('/', (req, res) => {
//     res.json(people);
// })
