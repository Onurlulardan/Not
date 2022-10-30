import React, {useState, useEffect} from 'react';
import { useNoteContext } from '../hooks/useNoteContext';

const NotForm = () => {
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [err, setErr] = useState(null);
    const [emptyAreas, setEmptyAreas] = useState([]);

    const { dispatch } = useNoteContext();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const note = {title, desc};


        const response = await fetch('/api/notes', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(note)
        });

        const json = await response.json();

        if(!response.ok) {
            setErr(json.Errors);
            setEmptyAreas(json.emptyArea);
        }

        if(response.ok) {
            setErr(null);
            setTitle('');
            setDesc('');
            setEmptyAreas([]);
            dispatch({ type: 'CREATE_NOTE', payload: json });
        }

    }


  return (
    <form className='create' onSubmit={(e)=> {handleSubmit(e)}}>
        <h3>Yeni Bir Not Ekle </h3>
        <div className='create-group'>
            <div>
                <label htmlFor="">Not Başlık:</label>
                <input className={emptyAreas.includes('title') ? 'error' : ''} type="text" onChange={(e) => {setTitle(e.target.value)}} value={title} />
            </div>
            <div>
                <label htmlFor="">Not Açıklaması:</label>
                <input className={emptyAreas.includes('desc') ? 'error' : ''} type="text" onChange={(e) => {setDesc(e.target.value)}} value={desc} />
            </div>
            <button type='submit'>EKLE</button>
        </div>
        {err && <div className='error'> { err } </div>}
    </form>
  )
}

export default NotForm