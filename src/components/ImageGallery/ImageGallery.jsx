import PropTypes from 'prop-types';
import { Gallery, GalleryItem, GalleryItemImage } from './ImageGallery.styled';

export const ImageGallery = ({ hits, showModal }) => {
  return (
    <Gallery>
      {hits &&
        hits.map(({ id, webformatURL, largeImageURL, tags }) => {
          return (
            <GalleryItem key={id} onClick={() => showModal(largeImageURL)}>
              <GalleryItemImage src={webformatURL} alt={tags} />
            </GalleryItem>
          );
        })}
    </Gallery>
  );
};

ImageGallery.propTypes = {
  hits: PropTypes.array,
  showModal: PropTypes.func.isRequired,
};
