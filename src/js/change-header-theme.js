import refs from './refs';


export function onSiteNavButtonsClick(event) {
    const element = event.target;

    if (element.textContent === 'My library') {
        refs.headerNavContainer.classList.add('header-nav-container--library');
        refs.libraryList.style.display = "flex";
        refs.searchForm.style.display = "none";
        refs.libraryHeaderBtn.classList.add('is-active');
        refs.homeHeaderBtn.classList.remove('is-active');
    }
    
    if (element.textContent === 'Home' || element.parentElement === refs.logoNav) {
        refs.headerNavContainer.classList.remove('header-nav-container--library');
        refs.libraryList.style.display = "none";
        refs.searchForm.style.display = "block";
        refs.homeHeaderBtn.classList.add('is-active');
        refs.libraryHeaderBtn.classList.remove('is-active');
        refs.searchForm.reset();

    }
    
        
    //     else {
    //         refs.headerNavContainer.classList.remove('header-nav-container--library');
    //         refs.libraryList.style.display = "none";
    //         refs.searchForm.style.display = "block";
    //         refs.homeHeaderBtn.classList.add('is-active');
    //         refs.libraryHeaderBtn.classList.remove('is-active');
    //         refs.searchForm.reset();
    //     }
       
    // }

    // if (element.parentElement === refs.logoNav) {
    //         refs.headerNavContainer.classList.remove('header-nav-container--library');
    //         refs.libraryList.style.display = "none";
    //         refs.searchForm.style.display = "block";
    //         refs.homeHeaderBtn.classList.add('is-active');
    //         refs.libraryHeaderBtn.classList.remove('is-active');
    //         refs.searchForm.reset();
    // }
}


refs.siteNavButtons.addEventListener('click', onSiteNavButtonsClick);
refs.logoNav.addEventListener('click', onSiteNavButtonsClick);