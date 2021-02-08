import {mediumRectangleBanner} from './adsizes';
import {styles} from './dynamicstyles';

const adItems = document.querySelectorAll('.ad-item');
const adShowCase = document.getElementById('ad-showcase')
const bannerMediumRectangle = document.createElement('div');
const videoPlayer = document.createElement('div')
const mediumRectangleId = 'wmg-ad-300x250';
const playerId = 'wmg-ad-player'
const mediumRectangle  = mediumRectangleBanner(mediumRectangleId);
let currentlyShowing = false;


const renderVideoPlayer = (elId) => {
  videoPlayer.id = playerId;

}


const renderMediumRectangle = (elId) => {
  bannerMediumRectangle.id = mediumRectangleId;
  bannerMediumRectangle.style = styles[elId];
  const bannerMediumRectangleScript = document.createElement('script');
  bannerMediumRectangleScript.innerHTML = mediumRectangle;
  bannerMediumRectangle.append(bannerMediumRectangleScript);
}


const renderElement = (id) => {
  if(id === '300x250' && !currentlyShowing) {
    currentlyShowing = true;
    renderMediumRectangle(id);
    adShowCase.append(bannerMediumRectangle);
  } else if(id === 'player' && !currentlyShowing) {
    renderVideoPlayer(id);
  }
}



const showItem = (event) => {
  const adItemSize = event.target.dataset.adBlock;
  renderElement(adItemSize);
}



adItems.forEach((el) => {
  el.addEventListener('click', (e)=> {
    showItem(e);
  })
})




