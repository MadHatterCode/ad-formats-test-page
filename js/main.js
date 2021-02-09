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


function setAttributes(el, attrs) {
  for(let key in attrs) {
    el.setAttribute(key, attrs[key]);
  }
}

const adEndEvent = function() {
  const wmgPlayer = document.getElementById("wmg-player");
  const wmgPlayerParent = wmgPlayer.parentNode;
  wmgPlayerParent.style.display = "none";
}

const renderVideoPlayer = (elId, targetEl) => {
  videoPlayer.id = playerId;
  const videoPlayerInner = document.createElement('div')
  videoPlayerInner.style.cssText = 'width: 640px; height: 360px; margin: auto; transition: all 700ms linear; overflow: hidden';
  const videoPlayerSlot = document.createElement('div');
  videoPlayerSlot.id = 'wmg-player'
  videoPlayerSlot.style.cssText = 'height: inherit; width: inherit';
  const videoParamScrip = document.createElement('script');
  setAttributes(videoParamScrip, styles[`${elId}-vid-params`]);
  videoPlayerInner.append(videoPlayerSlot, videoParamScrip);
  videoPlayer.append(videoPlayerInner);
  targetEl.parentElement.replaceChild(videoPlayer, targetEl);
}


const renderMediumRectangle = (elId) => {
  bannerMediumRectangle.id = mediumRectangleId;
  bannerMediumRectangle.style = styles[elId];
  const bannerMediumRectangleScript = document.createElement('script');
  bannerMediumRectangleScript.innerHTML = mediumRectangle;
  bannerMediumRectangle.append(bannerMediumRectangleScript);
}


const renderElement = (id, targetEl) => {
  if(id === '300x250' && !currentlyShowing) {
    currentlyShowing = true;
    renderMediumRectangle(id);
    adShowCase.append(bannerMediumRectangle);
  } else if(id === 'player' && !currentlyShowing) {
    renderVideoPlayer(id, targetEl);
  }
}



const showItem = (event) => {
  const adItemSize = event.target.dataset.adBlock;
  const targetEl = event.target;
  renderElement(adItemSize, targetEl);
}


adItems.forEach((el) => {
  el.addEventListener('click', (e)=> {
    showItem(e);
  })
})




