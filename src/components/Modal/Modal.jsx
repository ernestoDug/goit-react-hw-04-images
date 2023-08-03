import PropTypes from 'prop-types';

import css from './Modal.module.css';

const Modal = ({ largeImageURL, tag, modalCloser }) => {
  return (
    <>
      <div onClick={modalCloser} className={css.overlay}>
        <div className={css.modal}>
          <img src={largeImageURL} alt={tag} />
        </div>
      </div>
    </>
  );
};

Modal.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  tag: PropTypes.string.isRequired,
  modalCloser: PropTypes.func.isRequired,
};

export default Modal;
