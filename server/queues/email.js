'use strict';
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var config = require('config');
var consumer = {};
var transporter = nodemailer.createTransport(smtpTransport(config.get('mailer')));
consumer.name = 'email';
consumer.task = function(job, done){
    console.log(job.data, done);
    transporter.sendMail({
        from: 'thanhson1085@gmail.com',
        to: 'thanhson1085@gmail.com',
        subject: 'hello world!',
        text: 'Authenticated with OAuth2'

    });
};

module.exports = consumer;
