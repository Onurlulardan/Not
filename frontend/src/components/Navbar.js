import React from 'react';
import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';
import swal from 'sweetalert';


const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleClick = () => {

    swal({
      title: 'Çıkış Yapılıcak Emin Misin?',
      icon: 'warning',
      buttons: {
        confirm: 'Evet Çıkış Yap!',
        cancel: 'Vazgeç!',
      },
      dangerMode: true
    }).then((isLogout)=>{
      if(isLogout){
        logout();
      }
    });
  }

  return (
    <header>
        <div className='container'>
            <Link to={`/`}>
                <h1>Not Defteri</h1>
            </Link>
            <nav>
              {user && (
                <div>
                  <span> {user.email} </span> &nbsp; &nbsp;
                  <button  onClick={(e) => {handleClick()}}>Çıkış Yap</button>
                </div>
              )}
              {!user && (
                <div>
                  <Link to={`/login`}>Giriş Yap</Link>
                  <Link to={`/signup`}>Üye Ol</Link>
                </div>
              )}
            </nav>
        </div>
    </header>
  )
}

export default Navbar