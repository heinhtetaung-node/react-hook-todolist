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