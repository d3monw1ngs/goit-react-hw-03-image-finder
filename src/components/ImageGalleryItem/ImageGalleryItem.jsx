
export const ImageGalleryItem = ({ image, onClick }) => {
  return (
    <li className="gallery-item" onClick={onClick}>
        <img src={image.webformatURL} alt="" />
    </li>
  );
};
