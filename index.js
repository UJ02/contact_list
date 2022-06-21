const express = require('express');
const path = require('path');
const port = 4000;

const db = require('./config/mongoose');
const Contact = require('./models/contact');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'view'));

app.use(express.urlencoded());
app.use(express.static('assests'));

app.get('/', function(req, res){
    Contact.find({}, function(err, contact){
        if(err){
            console.log('Error in fetching from database!');
            return;
        }
        res.render('home',{
            'title': 'Contact List',
            'contactList': contact
        });
    });
});

app.post('/create-contact', function(req, res){
    Contact.create({
        name: req.body.name,
        contact: req.body.contact
    }, function(err, newContact){
        if(err){
            console.log('Error in uploading to database!!');
            return;
        }
        return res.redirect('back');
    });
});

app.get('/delete-contact/', function(req, res){
    let id = req.query.id;
    Contact.findByIdAndDelete(id, function(err){
        if(err){
            console.log(err);
            return;
        }
        res.redirect('back');
    })
});

app.listen(port, function(err){
    if(err){
        console.log('error');
        return;
    }
    console.log('server running on port: ', port);
});