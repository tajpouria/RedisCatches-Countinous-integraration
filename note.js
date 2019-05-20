/* eslint-disable comma-dangle */
/* eslint-disable import/order */
/* eslint-disable arrow-parens */
/* eslint-disable consistent-return */
/* eslint-disable arrow-spacing */
/* eslint-disable eol-last */
/* eslint-disable no-trailing-spaces */
/* eslint-disable no-undef */
/* eslint-disable import/newline-after-import */
/* eslint-disable spaced-comment */

//## Section One (Project Setup)

//1. cocurrently setup {"dev": "concurrently \"nodemon\" \"cd client && npm start \" "}

//2. body-parser middleware >npm i body-parser
const bodyParser = require('body-parser');
app.use(bodyParser.json());

//3. sendFile index.html & serve statics

app.use(express.static('client/build'));

const path = require('path');
app.get('*', (req, res) => {
  res.send(path.resolve('client', 'build', 'index.html'));
});

// ./client npm run build

//4. OAuth passport (google strategy)
// > npm i passport passport-google-oauth20 cookie-session

// setup passport-config ./services/passport-config.js

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const User = require('./models/User');

passport.serializeUser((user, done) => {
  done(null, id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      callbackURL: '/auth/google/callback',
      clientID: 'CLIENTID',
      clietSecret: 'CLIENTSECRET'
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ id: profile.id }).then(currentUser => {
        if (currentUser) return done(null, currentUser);

        new User({ googleID: id, displayName }).save().then(newUser => {
          done(null, newUser);
        });
        return undefined;
      });
    }
  )
);

// install cookieSession and passport-session

const cookieSession = require('cookie-session');

app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: ['nddsaihfsa+41765']
  })
);
app.use(passport.initialize());
app.use(passport.session());

// setup authRoutes ./routes/authRoutes.js

router.get('/google', passport.authenticate('google')); // -> ./index.js require('./services/passport-config')

router.get('/google/callback', (req, res) => {
  res.send(req.user); //user if accessible here
res.redirect('/api/blogs');
});

router.get('/logout',(req, res)=>{
  res.logOut() //remove cookies
  res.redirect('/')
})

//##subSection One (HOC)

//1. React-Router-Dom recap:
//  >npm i react-router-dom

import {
  BrowserRouter,
  Route,
  Switch,
  Link,
  NavbarLink
} from 'react-router-dom';

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/" component={About} />
      </Switch>
    </BrowserRouter>
  );
}

function Home() {
  return <Link to="/about">About</Link>;
}
function About() {
  return (
    <NavbarLink to="/" className="hurry">
      Home
    </NavbarLink>
  );
}

//2. React Context and Hooks basic

// Create a Context ./components/MovieContext.js

import React, { createContext, useState } from 'react';

export const MovieContext = createContext();

export const MovieProvider = props => {
  const [movies, setMovies] = useState(['movie1', 'movie2']);

  return (
    <MovieContext.Provider value={[movies, setMovies]}>
      {props.children}
    </MovieContext.Provider>
  );
};

// Wrap the Elements should access context ./App.js

import React from 'react'

import {MovieProvider} from './components/MovieContext'
import MovieList from './components/MovieList'

export default function(){
  return(
    <MovieProvider>
      <MovieList/>
    </MovieProvider>
  )
}

//use values in wrapped Components ./src/components

import React, {useContext} from 'react'

import {MovieContext} from './movieContext'

export default function(){
  const[movies] = useContext(MovieContext)

  return(
    <div>
    {movies.map(movie => <h1>movie</h1>)}
    </div>
  )
}

// useEffect

import { useEffect} from 'react'

//componentWillMount
useEffect(()=>{},[])

//3. HOC

//hoc s will call with a composedComponent add some functionality to it and then return it ./components/requireAuth

import React, {Component} from 'react';

export default function(composedComponent){
  class Authentication extends Component{
    componentWillUpdate(nextProps){
      const{auth:{auth}, history:{push}} = nextProps

      if(!auth) push('/')
    }

    render(){
      return <composedComponent {...this.props} />
    }
  }
  return Authentication
}

//pass another component to it ./components/Resources

import requireAuth from './requireAuth'

const Resources =()=> <div>Access Available just for who's logged in!</div>

export default requireAuth(Resources)

//## SectionTwo (Data Caching with Redis)

// 1.redis-cli
// run-server >~/redis-5.0.5/src/redis-server
// interact >~/redis-5.0.5/src/redis-cli

// 2. node-redis interact 
// >npm i redis 

const redis = require('redis')
const redisUrl = 'redis://127.0.0.1:6379'
const client = redis.createClient(redisUrl)
// set and get
client.set('foo', 'bar');
client.get('foo', console.log) //null bar
// set and get hash
client.hset('german','red','rot')
client.hget('german','red', console.log) //null rot
// set and get objects
client.set('colors',JSON.stringify({red:'roho'}))
client.get('colors',(err,value)=> JSON.parse(value))
//expire catch
client.set('color', 'red', 'EX', 5) //catch will expire after 5 sec.
// client.flushall() 
// client.del()
client.del('colors')

// 3. util.promisify() promisify callback

const util = require('util')
client.get = util.promisify(client.get)

const value = await client.get('key')

// 4. add some logic to mongoose exec

const mongoose = require('mongoose')

const exec = mongoose.Query.prototype.exec

mongoose.Query.prototype.exec = function(){
  console.log('IM ABOUT TO RUN QUERY')

  console.log(this.getQuery) // {_id: "423ljb2kh423234bc"}
  console.log(this.mongooseCollection.name) // users, blogs

  return exec.apply(this, arguments) 

//   function foo(...args) { es6 instead arguments
//     console.log(args);
// }

} 
// coping objects using Object.assign()
Object.assign({}, this.getQuery(), {collection : this.mongooseCollection.name}) 

// return mongoose document 

if(cachedValues){
const doc = JSON.parse(cachedValues)

return Array.isArray(doc) 
  ? doc.map(d => new this.model(d))
  : new this.model(doc)}

// 5. mongoose.Query.!prototype.cache

mongoose.Query.prototype.cache = function(){
  this._cache = true
  return this // chainAble  
}

// 6. use middleWare after routeHandler

export default async function(req,res,next){
  await next() //it will back to function after routeHandler completed
  clearHash(req.user.id)
}

// ## Section Three (Automated headless Browser Testing)

// 1. puppeteer and chromium 
// > sudo npm install puppeteer --unsafe-perm=true --allow-root
// running only one test test.only('',()=>{})

const puppeteer = require('puppeteer')
// launch and close browser instance
const browser  = await puppeteer.launch({
  // headless: false
})

await browser.close()
// create a new page
const page = await browser.newPage()
// navigate or refresh
await page.goto('localhost:5000')
// inspect an element
const text = await page.$eval('brand-logo', el => el.innerHTML) // 'BlogSter'
// click an element 
await page.click('.right a')
// page url
const url = await page.url()
// set cookie
await page.setCookie({ name: 'session.sig', value: sig})
// waitFor
await page.waitFor('a[href="/auth/logout"]')

// 2. session base64 toString / String to base64
const Buffer = require('safe-buffer').Buffer

const session = 'rfaseDRF4532hjfalksjih2o349857023j432pio'

Buffer.from(session, 'bas64').toString() 
//{ passport: { user: '874oi3haddhghas38407' } }

Buffer.from('{"passport":{"user":"5cde925b0fad38600a0a5762"}}').toString('base64')

// 3. session.sig

const Keygript = require('keygript')

const session = 'rfaseDRF4532hjfalksjih2o349857023j432pio'

const keygript = new Keygript(['key'])

keygript.sign('session=', session) //return sessions.sig

keygript.verify('session=', session, cookie-sig)