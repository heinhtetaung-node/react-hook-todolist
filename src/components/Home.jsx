import Nav from './Nav'

import { useState, useEffect } from "react";

function Home() {
    const [datas, setDatas] = useState(['a', 'b', 'c'])
    const [todo, setTodo] = useState('');
    const [buttonTxt, setButtonTxt] = useState('Add');
    const [updkey, setUpdkey] = useState(null);

    useEffect(() => {
        alert('page start')
    }, [])

    /** 
     * Actually this is the best CRUD with react state
     **/
    /*
    const checkAddon = (index: number, checked: boolean) => {
        const checkAddOn = addons[index];
        // updating checked add on items to addons array
        setAddons((existingAddons) => {
          checkAddOn.checked = checked;
          return [
            checkAddOn,
            ...existingAddons.filter((addon) => addon.id !== checkAddOn.id),
          ];
        });
        if (checked) {
          // adding checked addon to order array
          setOrders([...orders, checkAddOn]);
        } else {
          // removing checked add on items from order array
          setOrders((existingOrders) => {
            return [
              ...existingOrders.filter((order) => order.id !== checkAddOn.id),
            ];
          });
        }
    }
    
    View
    return (
        <div className="w-full h-64 p-4" data-testid={id}>
          {addons
            .sort((a, b) => a.id - b.id)
            .map((addon, index) => {
              return (
                <div className="w-full flex justify-between" key={addon.id}>
                  <div>
                    <input
                      checked={addon.checked}
                      type="checkbox"
                      onClick={() => checkAddon(index, !addon.checked)}
                    />
                    <label onClick={() => checkAddon(index, !addon.checked)}>
                      {addon.name} {addon.checked ? 'check' : 'no'}
                    </label>
                  </div>
                  <label>{addon.originalPrice}</label>
                </div>
              );
            })}
        </div>
      );
    */
    
    const addItem = (e) => {
        e.preventDefault()
        /*
        Not working with simple way like vue
        const datasDup = datas
        datasDup.push(todo)
        setDatas(datasDup);
        setTodo('')
        */

        /*
        Alternative way
        const datasDup = []
        datas.map(d => {
            datasDup.push(d)
        })        
        datasDup.push(todo)
        setDatas(datasDup);
        document.getElementById('todo-txt').value = '';
        */
        // alert(updkey)
        if (updkey != null) {
            // alert('update');
            datas[updkey] = todo
            setDatas(prevData => {
                prevData[updkey] = todo
                return prevData
            });
            
            // https://www.codingdeft.com/posts/react-usestate-array/ can use this also know later
            /*
            setAddons((existingItems) => {
              return [
                ...existingItems.slice(0, index),
                {
                  ...existingItems[index],
                  checked,
                },
                ...existingItems.slice(index + 1),
              ];
            });
            */
        } else {
            setDatas(prevData => ([...prevData, todo])); // best way for adding item to single array
            /* maybe you can do fully like
            setDatas(prevData => {
                prevData.push(todo)
                return prevData
            })
            */
        }                
        setTodo(prevTodo => (prevTodo, '')); // best way for string/integer
        /* maybe you can do fully like
        setTodo(prevTodo => {
            prevTodo = ''
            return prevTodo
        })
        */
        document.getElementById('todo-txt').focus()
        if (updkey != null) {
            setUpdkey(null)
        }
        if (buttonTxt != 'Add') {
            setButtonTxt('Add')
        }
    }

    const update = (key) => {
        // alert(key)
        setUpdkey(key)
        setTodo(datas[key])
        setButtonTxt("Update")
        document.getElementById('todo-txt').focus()
    }

    const deleteTodo = (key) => {
        const datasDup = datas
        datasDup.splice(key, 1)
        setDatas(() => ([...datasDup]));      
        /*  this way even better      
        setOrders((existingOrders) => {
            return [
              ...existingOrders.filter((order) => order.id !== addons[index].id),
            ];
          });
          */
    }

    return (
        <div>
            <Nav />
            <h1>Home {todo}</h1>
            <ul>
                {datas.map((d, key) => {
                    return (
                        <li key={key}>
                            {d} 
                            <button type="button" onClick={() => update(key)}>Update</button> 
                            <button type="button" onClick={() => deleteTodo(key)}>Delete</button>
                        </li>
                    )
                })}
            </ul>
            <form onSubmit={addItem}>
                <input type="text" id="todo-txt" value={todo} onChange={(e) => setTodo(e.target.value)} />
                <button>{buttonTxt}</button>
            </form>            
        </div>
    )
}

export default Home
