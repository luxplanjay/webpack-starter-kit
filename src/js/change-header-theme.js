import refs from './refs';

export function onSiteNavButtonsClick(event) {
    const element = event.target;

    if (element === refs.libraryHeaderBtn) {
        refs.headerContainer.classList.remove('header-container--home');
        refs.headerContainer.classList.add('header-container--library');
        refs.headerNavContainer.classList.add('header-nav-container--library');
        refs.libraryList.style.display = "flex";
        refs.searchForm.style.display = "none";
        refs.libraryHeaderBtn.classList.add('is-active');
        refs.homeHeaderBtn.classList.remove('is-active');
        
    } else if (element === refs.homeHeaderBtn || element.parentElement === refs.logoNav) {
        refs.headerContainer.classList.remove('header-container--library');
        refs.headerContainer.classList.add('header-container--home');
        refs.headerNavContainer.classList.remove('header-nav-container--library');
        refs.libraryList.style.display = "none";
        refs.searchForm.style.display = "block";
        refs.homeHeaderBtn.classList.add('is-active');
        refs.libraryHeaderBtn.classList.remove('is-active');
        refs.searchForm.reset();

    }
    
}

refs.siteNavButtons.addEventListener('click', onSiteNavButtonsClick);
refs.logoNav.addEventListener('click', onSiteNavButtonsClick);