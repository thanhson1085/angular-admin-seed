This project get started from [sb-admin-angular](https://github.com/start-angular/sb-admin-angular). However, I want to forcus to Ajax API, And I hope that this souce code will help you to get start a Front-End project easier.

## Installation
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

