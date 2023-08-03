import PropTypes from 'prop-types';
// import { nanoid } from 'nanoid';

import ImageGalleryItem from '../ImageGalleryItem';

import css from './ImageGallery.module.css';

const ImageGallery = ({ imageForGalery }) => {
  return (
    <ul className={css.gallery}>
      {imageForGalery &&
        imageForGalery.map(({ id, webformatURL, largeImageURL, tags }) => (
          <ImageGalleryItem
            key={id}
            webformatURL={webformatURL}
            largeImageURL={largeImageURL}
            tags={tags}
          />
        ))}{' '}
    </ul>
  );
};

ImageGallery.propTypes = {
  imageForGalery: PropTypes.array.isRequired,
};

export default ImageGallery;
