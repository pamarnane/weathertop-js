'use strict';

const userstore = require('../models/user-store');
const logger = require('../utils/logger');
const uuid = require('uuid');

const accounts = {

  index(request, response) {
    const viewData = {
      title: 'Login or Signup',
    };
    response.render('index', viewData);
  },

  login(request, response) {
    const viewData = {
      title: 'Login to the Service',
    };
    response.render('login', viewData);
  },

  logout(request, response) {
    response.cookie('station', '');
    response.redirect('/');
  },

  signup(request, response) {
    const viewData = {
      title: 'Login to the Service',
    };
    response.render('signup', viewData);
  },

  register(request, response) {
    const user = request.body;

    if (userstore.getUserByEmail(request.body.email) == undefined) {

      user.id = uuid.v1();
      userstore.addUser(user);
      logger.info(`registering ${user.email}`);
      response.redirect('/login');

    }

    else {
      const viewData = {
        message: 'Email address has an existing account, please log in.'
      }
      response.render('login', viewData);
    }





  },

  authenticate(request, response) {
    const user = userstore.getUserByEmail(request.body.email);
    if ((user) && (request.body.password === user.password)) {
      response.cookie('station', user.email);
      logger.info(`logging in ${user.email}`);
      response.redirect('/dashboard');
    } else {
      response.redirect('/login');
    }
  },

  getCurrentUser(request) {
    const userEmail = request.cookies.station;
    return userstore.getUserByEmail(userEmail);
  },

  account(request, response) {
    //const userEmail = request.cookies.station;
    const userDetails = userstore.getUserByEmail(request.cookies.station);
    const viewData = {
      title: 'Update Account Details',
      member: userDetails
    };
    response.render('accounts', viewData);
  },

  update(request, response){
    const userDetails = userstore.getUserByEmail(request.cookies.station);
    const updatedDetails = {
      firstName: request.body.firstname,
      lastName: request.body.lastname,
      email: request.body.email,
      password: request.body.password
    }

    userstore.updateAccount(userDetails, updatedDetails);
    response.redirect('/dashboard');
  }

};

module.exports = accounts;