// import PropTypes from 'prop-types';
import { useContext } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import css from './Button.module.css';

import { Context } from 'components/App';

const Button = () => {
  const context = useContext(Context);

  return (
    <button
      type="button"
      className={css.button}
      onClick={() => context.givMeMore()}
    >
      Завантажити ще 🐵
    </button>
  );
};

// проптайпи
// Button.propTypes = {
//   givMeMore: PropTypes.func.isRequired,
// };

export default Button;
