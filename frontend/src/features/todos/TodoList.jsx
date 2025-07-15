import { useState } from 'react'
import './todo.css'

import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { CiSearch } from "react-icons/ci";

import ProgressBar from 'react-bootstrap/ProgressBar';


import {
  useGetTodosQuery,
  useAddTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation
} from '../api/api'

function TodoList() {
  const [newTodo, setNewTodo] = useState('')
  const [editId, setEditId] = useState(null)
  const [editText, setEditText] = useState('')
  const [Myprogress, setProgress] = useState('')
  const [searchTerm, setSearchTerm] = useState('');

  const { data: todos = [], isLoading, isError, error } = useGetTodosQuery()
  const [addTodo] = useAddTodoMutation()
  const [updateTodo] = useUpdateTodoMutation()
  const [deleteTodo] = useDeleteTodoMutation()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!newTodo.trim()) return
    addTodo({ title: newTodo, completed: false, progress: '0' })
    setNewTodo('')
  }

  const handleUpdate = (todo) => {
    updateTodo({ _id: todo._id, title: editText, completed: todo.completed })
    setEditId(null)
    setEditText('')
  }

  const handleToggleComplete = (todo) => {
    updateTodo({ _id: todo._id, title: todo.title, completed: !todo.completed })
  }

  const filteredTodos = todos.filter(todo =>
    todo.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <>
      <div id='todo' className='mt-5 border-3 rounded-4 border border-info' style={{ backgroundImage: 'url(/background.jpg)', backgroundSize: "cover" }}>
        <h1 className='text-center mb-3 mt-3'>Hello User!</h1>

        <div className="search-container mx-3 mb-4">
          <input type="text" placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <i className="search-icon"><CiSearch /></i>
        </div>
        <div className='mb-4'>
          <Card style={{}} className='p-0 '>
            <ListGroup>
              <ListGroup.Item className='border-3 p-0'>
                <form onSubmit={handleSubmit} className='my-2 d-flex justify-content-center'>
                  <input type="text"
                    placeholder='Enter New Task...'
                    className='rounded-3 border-info p-2'
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    style={{ backgroundImage: 'url(background.jpg)' }}
                  />
                  <button className='mx-3  rounded-3 btn btn-sm btn-outline-success'>Add Todo</button>
                </form>

                {isLoading && <p className="text-muted text-center">Loading...</p>}
                {isError && <p className="text-danger text-center">Error: {error.message}</p>}

                <ul className='p-0 my-3'>
                  {filteredTodos.map(todo => (
                    <li
                      key={todo._id}
                      className='list-group-item border-1 border-black rounded-2 mb-3 bg-info-subtle'
                    >
                      <div className=''>

                        <div className='d-flex mb-2'>
                          <div className=''>
                            {editId == todo._id ? (
                              <input
                                type='text'
                                className='form-control'
                                value={editText}
                                onChange={(e) => setEditText(e.target.value)}
                              />
                            ) : (
                              <input type="text" value={todo.title} disabled className='text-black text-capitalize rounded-2 me-1'
                                style={todo.progress == 100 || todo.completed ? { textDecorationLine: "line-through" } : { textDecoration: 'none' }}
                              />
                            )}
                          </div>
                          <div className='d-flex flex-nowrap'>
                            {editId === todo._id ? (
                              <>
                                <button
                                  className='btn btn-success btn-sm mx-1'
                                  onClick={() => handleUpdate(todo)}
                                >
                                  Save
                                </button>
                                <button
                                  className='btn btn-secondary btn-sm'
                                  onClick={() => setEditId(null)}
                                >
                                  Cancel
                                </button>
                              </>
                            ) : (
                              <>
                                <button
                                  className='btn btn-outline-primary btn-sm me-2'
                                  onClick={() => {
                                    setEditId(todo._id)
                                    setEditText(todo.title)
                                  }}
                                >
                                  Edit
                                </button>
                                <button
                                  className='btn btn-danger btn-sm'
                                  onClick={() => deleteTodo({ _id: todo._id })}
                                >
                                  Delete
                                </button>
                              </>
                            )}
                          </div>
                        </div>
                        <form>
                          <div className='d-flex'>
                            <input type="text"
                              placeholder='Enter your progress..'
                              className='me-2 bg-body-secondary'
                              onChange={(e) => setProgress(e.target.value)}
                            />
                            <>
                              <button className='btn btn-sm btn-outline-success me-3' onClick={() => updateTodo({ _id: todo._id, progress: Myprogress })}>Progress</button>

                              <div className='form-check'>
                                <input type="checkbox"
                                  className='form-check-input fs-5 border border-dark'
                                  checked={todo.completed}
                                  onChange={() => handleToggleComplete(todo)}
                                />
                              </div>
                            </>
                          </div>
                          <div className='mt-1'>
                            <ProgressBar animated now={todo.progress} label={`${todo.progress}%`} />
                          </div>
                        </form>
                      </div>
                    </li>
                  ))}
                </ul>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </div>
      </div>
    </>
  )
}

export default TodoList