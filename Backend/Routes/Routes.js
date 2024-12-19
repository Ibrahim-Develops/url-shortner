import express from 'express';
import Users from '../Functions/Users.js';
import Urls from '../Functions/UrlFun.js';
import Authorization from '../Middlewares/Authorization/Authorization.js';
import Admin from '../Middlewares/Authorization/Admin.js';

let { EnteredUrl, Short, deleteUrl, SpecUrls, AllUrls } = Urls;
let { CreateUser, ExisingUser, Logout } = Users;

let Router = express.Router(); 

Router.route("/signup").post(CreateUser);
Router.route("/login").post(ExisingUser);

Router.route('/orgurl').post(Authorization, EnteredUrl);     
Router.route('/specurls').get(Authorization, SpecUrls);     
Router.route('/allurls').get(Authorization, Admin, AllUrls);     
Router.route('/deleteUrl/:id').delete(Authorization, deleteUrl);
Router.route('/logout').post(Logout);            
Router.route('/:shortid').get(Short);            

export default Router;
