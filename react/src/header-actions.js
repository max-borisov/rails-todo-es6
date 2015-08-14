var React = require('react');

const items = [
  {
    type: 'todo-action-edit',
    label: 'Edit'
  },
  {
    type: 'todo-action-remove',
    label: 'Delete'
  }
];

// items store

var iTems = [];

dispatcher.listen('GET_ITEMS', () => dispatcher.emit('API_GET_ITEMS'))
dispatcher.listen("API_GET_ITEMS_SUCCESS", (items) => iTems = items);

fucntion getItems() {
  return iTems;
}

var HeaderActions = React.createClass({

  componentDidMount() {
    ItemsStore.addChangeListener(this.forceUpdate);
    dispatcher.emit('GET_ITEMS');
  },
  _getItems(items) {

    return items.map(({ type, label }, i) => {
      return <li key={type}><a className={type}
        onClick={i === 0 ? this.props.onEdit : null}>{label}</a></li>;
    });
  },
  render: function() {

    return (

      <ul className='hidden'>
        {this._getItems(ItemsStore.getItems())}
      </ul>
    );
  }
});

module.exports = HeaderActions;
