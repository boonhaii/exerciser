const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const User = require('../models/user');

