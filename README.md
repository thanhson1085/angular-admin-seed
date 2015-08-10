[![Build Status](https://travis-ci.org/thanhson1085/angular-admin-seed.svg)](https://travis-ci.org/thanhson1085/angular-admin-seed)
[![Gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/thanhson1085/angular-admin-seed?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)

This project get started from [sb-admin-angular](https://github.com/start-angular/sb-admin-angular). However, I want to forcus to Ajax API, And I hope that this souce code will help you to get started a Front-End project easier.

## Installation

[![Join the chat at https://gitter.im/thanhson1085/angular-admin-seed](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/thanhson1085/angular-admin-seed?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
1. Clone this source code
2. Make sure you have [bower](http://bower.io/), [grunt-cli](https://www.npmjs.com/package/grunt-cli) and  [npm](https://www.npmjs.org/) installed globally
3. Run `cp config/default.json config/dev.json` - create config file for your enviroment
4. On the command prompt run the following commands
  - cd `project-directory`
  - Run `npm install`
  - Run `npm start`
  - `npm run dist` - a shortcut for `grunt serve:dist` to minify the files for deployment
  - Run `grunt test` to make sure the application work perfectly

And please make note that this project includes PhantomJS for test. So you have to [install PhantomJS](https://sonnguyen.ws/install-nodejs-phantomjs-casperjs-ubuntu-14-04/)

