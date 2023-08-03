import { useState } from 'react';
// import PropTypes from 'prop-types';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// npm i react-toastify

import css from './Searchbar.module.css';

const  Searchbar = ({onSubmit}) => {

  const [findImages, setFindImages] = useState('')
 
  // шукач
  const changer = event => {
    console.log(event)
  setFindImages(event.target.value.toLowerCase());
  };

  // відпрвник
  const submiter = event => {
    event.preventDefault();
    // умова заборони пустого рядка
    if (findImages.trim() === '') {
      toast.info('🙊Треба почати пошук🙊');
      return;
    }
    // пропсик від апп для отримання

    onSubmit({findImages});

    // очищувач форми
    setFindImages('' );
  };


    return (
      <>
        <header className={css.searchbar}>
          <form onSubmit={submiter} className={css.form}>
            <button type="submit" className={css.button}>
              <span className={css.buttonLab}>Шукати</span>
            </button>

            <input
              className={css.input}
              type="text"
              // autocomplete="off"
              // autofocus
              placeholder="Почніть пошук..."
              value={findImages}
              onChange={changer}
            />
          </form>
        </header>
      </>
    );
  
}

// проптайпи
// Searchbar.propTypes = {
//   onSubmit: PropTypes.func.isRequired,
// };

export default Searchbar;
