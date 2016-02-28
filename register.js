'use strict';

var assign = require('object-assign');
var Dispatcher = require('./dispatcher');
var Dispatch = assign({}, Dispatcher.prototype,{});
var React = require('react');
var ReactDom = require('react-dom');
var $ = require('jquery');
require('jquery-ui');
var Register=React.createClass({
  getInitialState: function() {
    return {
    };
  },

  componentDidMount: function() {
  },

  menuClicked: function() {
    $('#menubar-menu').effect('highlight',{}, 500, null);
  },

  render: function() {
    var menuImg = './pics/menu.png';
    var titleImg = './pics/dutyfreejoy.png';

    return (
      <div className="register">
      <input type='text' name="email" placeholder="Your Email" /> 
      </div>
    );
  }, 
});   
  
/*ReactDom.render(  
<MenuBar/>,
  document.getElementById('menubar')
);*/

module.exports=Register;
