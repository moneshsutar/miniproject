let router = require('express').Router()
let faker = require('faker')
let User = require('../models/user')
let moment = require('moment');

router.get('/',(req,res,next)=>{
    res.render('index')
})
router.get('/aboutncc',(req,res,next)=>{
    res.render('aboutnss')
})
router.get('/aboutnss',(req,res,next)=>{
    res.render('aboutnss')
})
router.get('/adminlogin',(req,res,next)=>{
    res.render('adminlogin')
})
router.get('/sendsms',(req,res,next)=>{
    res.render('sendsms')
})

router.get('/registration', (req, res, next) => {
    let user = {
        name: '',
        email: '',
        phone: +91,
        city: '',
        address:''
    }

    res.render('registration', { user: user });
    
})

router.post('/added', (req, res, next) => {
    User.findOne({}, (err, data) => {

        if (data) {
            c = data.id + 1;
        } else {
            c = 1;
        }

        let user = new User({
            id: c,
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            city: req.body.city,
            address: req.body.address
        })

        user.save((err, success) => {
            if (err) {
                console.log(err);
            } else {
                res.redirect('/')
            }
        })
    }).sort({ _id: -1 }).limit(1);
})
router.post('/products', (req, res, next) => {
    let sort, query, search, search_field;

    if (req.body.select != 'undefined') {
        sort = req.body.select;
    }

    let perPage = Number(req.body.perPage) || 10;
    let page = Number(req.body.page) || 1;

    if (req.body.search != undefined && req.body.search_field != undefined && req.body.search != '' && req.body.search_field != '') {
        search = req.body.search;
        search_field = req.body.search_field;
        query = { 'search': search_field };

        if (search == 'name') {
            query = { name: search_field };
        } else if (search == 'email') {
            query = { email: search_field };
        } else if (search == 'phone') {
            query = { phone: search_field };
        } else if (search == 'city') {
            query = { city: search_field };
        } else {
            query = { id: search_field };
        }
    } else {
        query = { 'name': { $ne: null } };
    }

    User.find(query).skip((perPage * page) - perPage).limit(perPage).sort(sort)
        .exec((err, user) => {
            User.count(query).exec((err, count) => {
                if (err) return next(err)
                res.render('user', {
                    user: user,
                    current: page,
                    pages: Math.ceil(count / perPage),
                    perPage: perPage,
                    sort: sort,
                    search: search,
                    moment: moment,
                    
                })
            })
        })
})

module.exports = router