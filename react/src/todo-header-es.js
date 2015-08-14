import React from 'react';
import HeaderActions from './header-actions';

const TodoHeader = React.createClass({

  getInitialState() {
    return {
      isOpen: false,
      title: 'Netguru worshop'
    };
  },
  _toggleEdit() {

    this.setState({ isOpen: !this.state.isOpen }, () => {
      if (this.state.isOpen === true) {
        React.findDOMNode(this.refs.input).focus();
      }
    });
  },
  _setTitle() {
    if (event.keyCode === 13) {
      this.setState({
        title: event.target.value,
        isOpen: false
      });
    }
  },
  render() {

    const openClass = this.state.isOpen ? 'edit-mode' : '';

    return (

      <div className={`todo-header ${openClass}`}>
        <h3>{this.state.title}</h3>
        <HeaderActions onEdit={this._toggleEdit} />
        <input ref='input' defaultValue={this.state.title} onKeyDown={this._setTitle} />
      </div>
    );
  }
});

export default TodoHeader;
