'use strict';
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var config = require('config');
var db = require('../models');
var consumer = {};
var logger = require('../utils/logger');
var transporter = nodemailer.createTransport(smtpTransport(config.get('mailer')));
consumer.name = 'notify';

var EmailTemplate = require('email-templates').EmailTemplate;
var path = require('path');

var to = '';
db.Option.findOne({
    where: {
        optionKey: 'email'
    }
}).then(function(option){
    to = option.optionValue;
}).catch(function(e){
    logger.error(e);
});

consumer.task = function(job, done){
    var data = job.data;
    var templateDir = path.join(__dirname, '../views/emails/', data.template);
    var letter = new EmailTemplate(templateDir);
    letter.render(data.emailContent, function (err, results) {
        try{
            logger.info('Send email notify to Admin');
            transporter.sendMail({
                from: config.get('mailer.from'),
                to: to,
                subject: data.title,
                html: results.html
            });
        } catch(e) {
            logger.error(e);
        }
    });
    done();
};

module.exports = consumer;
