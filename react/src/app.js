var React = require('react');
var TodoHeader = require('./todo-header-es');

var App = React.createClass({

  render: function() {

    return (

      <article>
        <TodoHeader />
      </article>
    );
  }
});

React.render(<App />, document.body);
