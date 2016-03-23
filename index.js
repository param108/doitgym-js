/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var assign = require('object-assign');
var Dispatcher = require('./dispatcher');
var Dispatch = assign({}, Dispatcher.prototype,{});
var React = require('react');
var ReactDom = require('react-dom');
var $ = require('jquery');
var MenuBar=require('./menubar');
var Register=require('./register');
var db;
var dbCreated = false;
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
        ReactDom.render(
        <MenuBar/>,
           document.getElementById('Menubar')
        );
        ReactDom.render(
        <Register/>,
           document.getElementById('Register')
        );

    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        console.log("YAHOOO!!!!\n");
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        //var parentElement = document.getElementById(id);
        //var listeningElement = parentElement.querySelector('.listening');
        //var receivedElement = parentElement.querySelector('.received');

        //listeningElement.setAttribute('style', 'display:none;');
        //receivedElement.setAttribute('style', 'display:block;');
        console.log('Received Event: ' + id);
        $('#deviceready').hide();
        app.openDatabase();
    },
    openDatabase: function() {
        console.log("openDatabase called");
        //defaulting to 100K for now.
        db = window.openDatabase("DoItGym", "1.0", "User Details", 100000);
        db.transaction(this.createDatabase, this.transactionError, this.selectUser);
        console.log("openDatabase Done");
    },
    createDatabase: function(tx) {
        console.log("createDatabase called");
        tx.executeSql("CREATE TABLE IF NOT EXISTS user_details (email VARCHAR(100), password VARCHAR(100))");
        console.log("createDatabase Done");
    },
    transactionError: function(tx,error) {
        console.log("Database Error:" + error);
    },
    selectUser: function() {
        console.log("selectUser called");
        //selectUserData will trigger the success function directly
        db.transaction(app.selectUserData, app.transactionError);
        console.log("selectUser Done");
    },
    selectUserData: function(tx) {
        console.log("selectUserData called");
        // There should only be one entry
        tx.executeSql("SELECT * FROM user_details", [], app.selectUserResult);
        console.log("selectUserData Done");
    },
    selectUserResult: function(tx, result) {
        console.log("selectUserResult called");
        // Tell the world that we have a database
        Dispatch.dispatch("DATABASE_FOUND", db);
        if (result.rows.length == 1) {
          // Found the user, now try and login using the password and email
          this.login(result.rows.item(0).email, result.rows.item(0).password);
        } else {
          // something went wrong, need to re-register
          console.log("Found "+result.rows.length+" entry");
          // should popup the registration screen
          Dispatch.dispatch("REGISTRATION_REQD");
        }
    },
    login: function(email, password) {
    } 
};

app.initialize();
