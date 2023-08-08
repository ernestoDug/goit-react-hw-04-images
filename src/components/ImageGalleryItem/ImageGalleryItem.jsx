import 'react-toastify/dist/ReactToastify.css';
import PropTypes from 'prop-types';
import { useState } from 'react';

import Modal from 'components/Modal/Modal';
import css from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ largeImageURL, webformatURL, tags }) => {
  const [showMod, setShowMod] = useState(false);
  // const[closMod, setClosMod]=useState(true)
  const [modalURL, setModalURL] = useState('');

  // відкривач модалу
  const modalOpen = largeImageURL => {
    setShowMod(true);
    setModalURL(largeImageURL);
  };
  // закривач модалу
  const modalClos = event => {
    if (event.target === event.currentTarget) setShowMod(false);
  };

  return (
    <>
      {/* галерея умова */}

      <li className={css.galleryItem}>
        <img
          // адреса великого urla
          onClick={() => {
            modalOpen(largeImageURL);
          }}
          className={css.imageGalleryItemImage}
          src={webformatURL}
          alt={tags}
        />
        {/* поява модалки */}
        {showMod && (
          <Modal largeImageURL={modalURL} tag={tags} modalCloser={modalClos} />
        )}
      </li>
    </>
  );
};

// протайпи
ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};

export default ImageGalleryItem;
