// import PropTypes from 'prop-types';

import { useContext } from 'react';
import css from './ImageGallery.module.css';

import ImageGalleryItem from '../ImageGalleryItem';
import { Context } from 'components/App';

const ImageGallery = () => {
  const context = useContext(Context);
  return (
    <ul className={css.gallery}>
      {context.imageForGalery &&
        context.imageForGalery.map(
          ({ id, webformatURL, largeImageURL, tags }) => (
            <ImageGalleryItem
              key={id}
              webformatURL={webformatURL}
              largeImageURL={largeImageURL}
              tags={tags}
            />
          )
        )}{' '}
    </ul>
  );
};

// ImageGallery.propTypes = {
//   imageForGalery: PropTypes.array.isRequired,
// };

export default ImageGallery;
