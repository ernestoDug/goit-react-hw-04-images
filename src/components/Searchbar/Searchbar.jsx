// import PropTypes from 'prop-types';
import { useState } from 'react';
import { toast } from 'react-toastify';
// npm i react-toastify
import { useContext } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import css from './Searchbar.module.css';

import { Context } from 'components/App';

const Searchbar = () => {
  const context = useContext(Context);

  const [findImages, setFindImages] = useState('');

  // шукач
  const changer = event => {
    // console.log(event);
    setFindImages(event.target.value.toLowerCase());
  };
  // відпрвник
  const submiter = event => {
    event.preventDefault();
    // ні пустоті
    if (findImages.trim() === '') {
      toast.info('🙊Треба почати пошук🙊');
      return;
    }
    // для апп
    context.onSubmit(findImages);

    // очищувач форми
    setFindImages('');
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
};

// проптайпи
// Searchbar.propTypes = {
//   onSubmit: PropTypes.func.isRequired,
// };

export default Searchbar;
