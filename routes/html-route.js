// Dependencies
// =============================================================
const express = require('express');

const router = express.Router();
// const db = require("../models");

//landing page
router.get('/', (req, res, next)=>{
    res.render('index', {title:'Index'});
})

module.exports=router;