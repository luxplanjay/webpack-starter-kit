import './sass/main.scss';
import refs from './js/refs';


import createHeaderHomeMarkup from './js/header-render';

createHeaderHomeMarkup();


import addContent from './js/addContent';
import apiService from './js/apiService.js';
import pagination from './js/pagination.js';
const searchFormRef = document.querySelector('.search-form');
const searchFormInput = document.querySelector('.search-form__input');

fetchDataForMainPage();

async function fetchDataForMainPage() {
  try {
    const result = await apiService.fetchDataTrending();
    addContent.additemList(result);
  } catch (error) {
    throw error;
  }
}
async function fetchDataSearch() {
  try {
    const result = await apiService.fetchDataSearch();
    addContent.additemList(result);
  } catch (error) {
    throw error;
  }
}

function onSubmitSearchForm(event) {
  event.preventDefault();
  const searchQuery = event.target.elements.query.value;
  if (!searchQuery) {
    //вывести сообщение пользователю, что ничего не найдено, а вдруг сам не догадается
    return;
  }
  apiService.searchQuery = searchQuery;
  fetchDataSearch();
}

searchFormRef.addEventListener('submit', onSubmitSearchForm);

