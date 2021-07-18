import React from "react";
import '../styles/App.css';
import TodoForm from './TodoForm';
import Modal from 'react-modal';

Modal.setAppElement('#root');
function App() {
 
  return (
    <div className='App'>
      <TodoForm /> 
    </div>
  )
}

export default App;
