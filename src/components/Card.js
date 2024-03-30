import React from 'react'
import './card.css';
const Card = (props) => {
  return (
    <div className='card'>
    <div className='cardTitle'>Name: <div className='cardText'>{props.name}</div></div>
    <div className='cardTitle'>Status: <div className='cardText'>{props.status}</div></div>
    <div className='cardTitle'>category: <div className='cardText'>{props.category}</div></div>
    <div className='cardTitle'>Priority: <div className='cardText'>{props.priority}</div></div>
    <div className='cardTitle'>Due Date: <div className='cardText'>{props.dueDate}</div></div>
    <div className='cardButton' onClick={props.editItem}>Update</div>
    <div className='cardButtonD' onClick={props.deleteItem}>Delete</div>
  </div>
  )
}

export default Card
