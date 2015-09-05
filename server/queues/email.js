'use strict';
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var config = require('config');
var consumer = {};
var transporter = nodemailer.createTransport(smtpTransport(config.get('mailer')));
consumer.name = 'email';

var EmailTemplate = require('email-templates').EmailTemplate;
var path = require('path');
var templateDir = path.join(__dirname, '../views/emails/', 'welcome');
var newsletter = new EmailTemplate(templateDir);

consumer.task = function(job, done){
    newsletter.render({username: job.data.username}, function (err, results) {
        transporter.sendMail({
            from: 'thanhson1085@gmail.com',
            to: 'thanhson1085@gmail.com',
            subject: 'hello world!',
            html: results.html

        });
      // result.html
      // result.text
    });
};

module.exports = consumer;
