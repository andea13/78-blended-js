import { Unsplashapi } from './Unsplashapi';
import { createGalleryCard } from './create-gallerycard';
const galleryList = document.querySelector('.js-gallery');

const services = new Unsplashapi();
const respons = services.getPopularImages();
respons.then(res => {
  const responseCurrent = createGalleryCard(res.data.results);
  galleryList.insertAdjacentHTML("beforeend", responseCurrent )
});
