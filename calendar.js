'use strict';

var assign = require('object-assign');
var Dispatcher = require('./dispatcher');
var Dispatch = assign({}, Dispatcher.prototype,{});
var React = require('react');
var ReactDom = require('react-dom');
var $ = require('jquery');
require('jquery-ui');
var Calendar=React.createClass({
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
    <div className="menubar-data">
    <div id='menubar-lt'><img id='menubar-menu' src={menuImg} onClick={this.menuClicked} /></div>
    <div id='menubar-center'><img id='menubar-title' src={titleImg} /></div>
    <div id='menubar-rt'></div>
    </div>);
  }, 
});   
  
/*ReactDom.render(  
<MenuBar/>,
  document.getElementById('menubar')
);*/

module.exports=Calendar;
