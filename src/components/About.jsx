import Nav from './Nav'
import React from 'react'

const items = [ { text: 'Buy grocery', done: true },
  { text: 'Play guitar', done: false },
  { text: 'Romantic dinner', done: false }
];

class TodoList extends React.Component {
    render() {
      const { items, onListClick } = this.props;
      return (<ul onClick={onListClick}>
        {items.map((item, index) => 
                   <TodoItem item={item} key={index} onClick={this.handleItemClick.bind(this, item)}/>)}
      </ul>);
    }
    
    handleItemClick(item, event) {
      // Write your code here
      if (item.done == true) {
        event.stopPropagation()
        return 
      }
      this.props.onItemClick(item, event)      
    }
}

const TodoItem = (props) => <li onClick={props.onClick}>{props.item.text}</li>

function About() {
    return (
        <div>
            <Nav />
            <TodoList
                items={items}
                onListClick={(event) => console.log("List clicked!")}
                onItemClick={(item, event) => { console.log(item, event) }}
            />;
        </div>
    )
}



export default About