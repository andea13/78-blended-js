import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.min.css';

import { Unsplashapi } from './Unsplashapi';
import { createGalleryCard } from './create-gallerycard';

const paginationElement = document.querySelector('#tui-pagination-container');

const options = {
  totalItems: 10,
  itemsPerPage: 9,
  visiblePages: 3,
  page: 1,
  centerAlign: true,
  firstItemClassName: 'tui-first-child',
  lastItemClassName: 'tui-last-child',
  template: {
    page: '<a href="#" class="tui-page-btn">{{page}}</a>',
    currentPage:
      '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
    moveButton:
      '<a href="#" class="tui-page-btn tui-{{type}}">' +
      '<span class="tui-ico-{{type}}">{{type}}</span>' +
      '</a>',
    disabledMoveButton:
      '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
      '<span class="tui-ico-{{type}}">{{type}}</span>' +
      '</span>',
    moreButton:
      '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
      '<span class="tui-ico-ellip">...</span>' +
      '</a>',
  },
};

const pagination = new Pagination(paginationElement, options);
const pageForPagination = pagination.getCurrentPage();

const galleryList = document.querySelector('.js-gallery');
const formElement = document.querySelector('.js-search-form');
const services = new Unsplashapi();

const respons = services.getPopularImages(pageForPagination);

respons
  .then(({ total, results }) => {
    const responseCurrent = createGalleryCard(results);
    pagination.reset(total);
    galleryList.insertAdjacentHTML('beforeend', responseCurrent);
  })
  .catch(error => {
    alert(error.message);
  });

pagination.on('afterMove', getByPopularQuery);

formElement.addEventListener('submit', onSubmit);

function onSubmit(event) {
  event.preventDefault();

  pagination.off('afterMove', getByPopularQuery);

  galleryList.innerHTML = '';
  let { query } = event.target.elements;
  query = query.value.trim();

  pagination.off('afterMove', getByQuery);

  services.searchQuery = query;
  services
    .getImagesByQuery(pageForPagination)
    .then(({ total, results }) => {
      pagination.reset(total);

      const responseCurrent = createGalleryCard(results);
      galleryList.innerHTML = responseCurrent;

      pagination.on('afterMove', getByQuery);
    })
    .catch(error => {
      alert(error.message);
    });
}

function getByQuery(event) {
  const currentPage = event.page;
  services
    .getImagesByQuery(currentPage)
    .then(({ results }) => {
      const responseCurrent = createGalleryCard(results);
      galleryList.innerHTML = responseCurrent;
    })
    .catch(error => {
      alert(error.message);
    });
}

function getByPopularQuery(event) {
  const currentPage = event.page;
  services
    .getPopularImages(currentPage)
    .then(({ results }) => {
      const responseCurrent = createGalleryCard(results);
      galleryList.innerHTML = responseCurrent;
    })
    .catch(error => {
      alert(error.message);
    });
}
