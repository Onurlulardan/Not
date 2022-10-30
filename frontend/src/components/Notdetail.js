import React from 'react';
import { useNoteContext } from '../hooks/useNoteContext';
import moment from 'moment';
import 'moment/locale/tr'

const Notdetail = ({not}) => {

  const { dispatch } =useNoteContext();

  const handleClick = async (e) => {
    e.preventDefault();

    const response = await fetch(`/api/notes/${not._id}`, {
      method: 'DELETE',
    });

    const json = await response.json();

    if(response.ok){
      dispatch({ type: 'DELETE_NOTE', payload: json });
    }
  }

  return (
    <div className='not-detay'>
        <h4> {not.title} </h4>
        <p> {not.desc} </p>
        <p className='not-detay-tarih'> { moment(new Date(not.createdAt)).fromNow() } </p>
        <span className="material-symbols-outlined" onClick={(e) => {handleClick(e)}}>delete</span>
    </div>
  )
}

export default Notdetail