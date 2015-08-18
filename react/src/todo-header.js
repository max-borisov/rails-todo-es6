var React = require('react');
var HeaderActions = require('./header-actions');

var TodoHeader = React.createClass({

  getInitialState: function() {
    return {
      isOpen: false,
      title: 'Netguru worshop'
    };
  },
  _toggleEdit: function() {

    this.setState({ isOpen: !this.state.isOpen }, function() {
      if (this.state.isOpen === true) {
        React.findDOMNode(this.refs.input).focus();
      }
    });
  },
  _setTitle: function(event) {
    if (event.keyCode === 13) {
      this.setState({
        title: event.target.value,
        isOpen: false
      });
    }
  },
  render: function() {

    var openClass = this.state.isOpen ? 'edit-mode' : '';

    return (

      <div className={'todo-header ' + openClass}>
        <h3>{this.state.title}</h3>
        <HeaderActions onEdit={this._toggleEdit} />
        <input ref='input' defaultValue={this.state.title} onKeyDown={this._setTitle} />
      </div>
    );
  }
});

module.exports = TodoHeader;
