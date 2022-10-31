import React from 'react';
import { useNoteContext } from '../hooks/useNoteContext';
import moment from 'moment';
import 'moment/locale/tr';
import { useAuthContext } from '../hooks/useAuthContext';
import swal from 'sweetalert';

const Notdetail = ({not}) => {
  const { dispatch } =useNoteContext();
  const { user } = useAuthContext();

  const handleClick = async (e) => {
    e.preventDefault();

    if(!user) {
      return
    }
    
    swal({
      title: 'Emin Misin?',
      text: 'Not Silinecek!',
      icon: 'warning',
      dangerMode: true,
      buttons: {
        confirm: 'Evet Sil!',
        cancel: 'Vazgeç!'
      }
    }).then(async (isDelete) => {
      if(isDelete){
        const response = await fetch(`/api/notes/${not._id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        });
    
        const json = await response.json();
    
        if(response.ok){
          dispatch({ type: 'DELETE_NOTE', payload: json });
          swal({
            text: 'Silme İşlemi Başarılı!',
            icon: 'success',
            timer: 2000,
            buttons: false
          });
        }
      }
    });
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