const express = require('express');
const app = express();
const {check, validationResult} = require('express-validator');
const users = require('./data/users');
const mongojs = require('mongojs');
const db = mongojs('costumerapp', ['users']);
const ObjectId = mongojs.ObjectId;

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(__dirname + '/public'));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');


app.get('/', (req, res) => {
    db.users.find(function (err, docs) {
        res.render('index', {
            title: "This is ejs title",
            users: docs
        });
    })
    // console.log(users)
});

//Validation post method
app.post('/register', [
    check('firstname', 'First Name is required!').exists().isLength({min: 3}),
    check('lastname', 'Last Name is required!').exists().isLength({min: 3}),
    check('email', 'Please enter a valid email address').isEmail().normalizeEmail()
    ], (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            const alert = errors.array()
            res.render('index',{
                alert
            })
        }else {
                var newUser = {
                    first_name: req.body.firstname,
                    last_name: req.body.lastname,
                    email: req.body.email
                };
            }
         //Insert to db
        db.users.insert(newUser, (err, result) =>{
            if(err){
                console.error(err)
            }
            res.redirect('/');
        })
        
    });
    app.delete('/users/delete/:id', (req, res) => {
        db.users.remove({_id: ObjectId(req.params.id)}, (err, result) => {
            if(err){
                console.log(err)
            }
            else{
                res.redirect('/');
            }
        })  
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

// app.post('/users/add', (req, res) => {
//     check('firstname').isLength({min: 1}).withMessage("First Name is required!")
//     check('lastname').isLength({min: 1}).withMessage("Last Name is required!")
//     check('email').isLength({min: 1}).withMessage("Email is required!")
    
//     // let newUser = {
//     //     first_name: req.body.first_name,
//     //     last_name: req.body.last_name,
//     //     email: req.body.email,
//     // }
//     // console.log(newUser);
// });

// if(!errors.isEmpty()) {
//     res.render('index', {
//         title: 'Costumers',
//         users: [],
//         errors: errors.array()
//     });
// } else {
//     let newUsers = {
//         first_name: req.body.firstname,
//         last_name: req.body.lastname,
//         email: req.body.email
//     };
//     // db.users.insert(newUser, (err, result) => {
//     //     if(err){
//     //         console.log(err);
//     //     }
//     //     res.redirect('/');
//     // });
// }
 // check('firstname').isLength({min: 1}).withMessage("First Name is required!"),
    // check('lastname').isLength({min: 1}).withMessage("Last Name is required!"),
    // check('email').isLength({min: 1}).withMessage("Email is required!")