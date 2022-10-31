import React, {useEffect, useState} from 'react';
import Notdetail from '../components/Notdetail';
import NotForm from '../components/NotForm';
import { useNoteContext } from '../hooks/useNoteContext';
import { useAuthContext }  from '../hooks/useAuthContext';

const Home = () => {
  const { notes, dispatch } = useNoteContext();
  const { user } = useAuthContext();

  useEffect(() => {

    const fetchNots = async () => {

      const response = await fetch('/api/notes', {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });
      const json = await response.json();

      if(response.ok){
        dispatch({ type: 'FILL_NOTE', payload: json });
      }
    }
    if(user) {
      fetchNots();
    }

  }, [dispatch, user]);


  return (
    <div className='home'>
      <div className='not-form'>
        <NotForm/>
      </div>
      <div className='notlar'>
        {notes && notes.map((not, index) => {
          return <Notdetail key={not._id} not={not} />
        })}
      </div>
    </div>
  )
}

export default Home