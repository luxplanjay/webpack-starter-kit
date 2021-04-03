window.addEventListener('load', function () {
  const preloader = document.querySelector('.preloader');
  document.body.removeChild(preloader);
  document.getElementById('page-content').classList.add('ready');
  console.log('done');
});
