import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ images, onImageClick }) => {
  return (
    <ul className="gallery">
        {images.map((image) => (
            <ImageGalleryItem
                key={image.id}
                image={image}
                onClick={() => onImageClick(image.largeImageURL)}
            />
        ))}
    </ul>
  );
};
