'use strict';

var assign = require('object-assign');
var Dispatcher = require('./dispatcher');
var Dispatch = assign({}, Dispatcher.prototype,{});
var React = require('react');
var ReactDom = require('react-dom');
var $ = require('jquery');
require('jquery-ui');
function showRegisterTab(data) {
  $('#Register').fadeIn();
}
function sendEmail() {
  $.ajax({
    url: 'https://python-doitgym.rhcloud.com/register',
    method: 'POST',
    data: { name: $('.register-input').val()},
    cache: false,
    success: function(data, stat, obj) {
      Dispatch.dispatch('EMAIL_VERIFICATION_SENT');
    },
    timeout: 2000,
    error: function(data, stat, obj) {
    }
  });
}
var Register=React.createClass({
  getInitialState: function() {
    return {
    };
  },

  componentDidMount: function() {
    Dispatch.register("REGISTRATION_REQD", showRegisterTab);
    $('.register-input').keypress(function(event) {
       var keyCode = (event.keyCode? event.keyCode: event.which);
       if (keyCode == '13'){
         sendEmail();
       }
    });
  },

  menuClicked: function() {
    $('#menubar-menu').effect('highlight',{}, 500, null);
  },

  render: function() {
    var menuImg = './pics/menu.png';
    var titleImg = './pics/dutyfreejoy.png';

    return (
      <div className="register">
      <input className="register-input" type='text' name="email" placeholder="Your Email" /> 
      </div>
    );
  }, 
});   
  
/*ReactDom.render(  
<MenuBar/>,
  document.getElementById('menubar')
);*/

module.exports=Register;
