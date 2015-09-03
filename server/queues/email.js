'use strict';
var consumer = {};
consumer.name = 'email';
consumer.task = function(job, done){
    console.log(job.data, done);
};

module.exports = consumer;
