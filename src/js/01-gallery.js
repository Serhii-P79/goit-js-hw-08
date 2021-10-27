import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line

// console.log(galleryItems);

// console.log('Первая домашка');

const refer = {
  containerGallery: document.querySelector('.gallery'),
};

createGallery(galleryItems);

const lightbox = new SimpleLightbox('.gallery a', {
  close: false,
  captionDelay: 250,
  captionType: 'data',
});

refer.containerGallery.addEventListener('click', e => {
  if (e.target === e.currentTarget) return;

  document.body.style.paddingRight = 0;

  const originalImage = document.querySelector('.simple-lightbox');

  const onCloseOriginalImage = e => {
    if (e.target.localName === 'img') {
      lightbox.close();
    }
  };

  originalImage.addEventListener('click', onCloseOriginalImage);

  lightbox.on('close.simplelightbox', function () {
    originalImage.removeEventListener('click', onCloseOriginalImage);
  });
});

function createGallery(galleryItems) {
  refer.containerGallery.insertAdjacentHTML(
    'beforeend',
    galleryItems
      .map(galleryItem => {
        return createPicture(galleryItem);
      })
      .join(''),
  );
}

function createPicture({ preview, original, description }) {
  return `  
  <a class="gallery__item" href="${original}">
    <img class="gallery__image" src="${preview}" alt="${description}" data-title="${description}" />
  </a>
  `;
}
