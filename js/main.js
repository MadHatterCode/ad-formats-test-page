import {mediumRectangleBanner} from './adsizes';
import {styles} from './dynamicstyles';

const mainContent = document.querySelector('.main-content');
const adItems = document.querySelectorAll('.ad-item');
const adShowCase = document.getElementById('ad-showcase')
const bannerMediumRectangle = document.createElement('div');
const videoPlayer = document.createElement('div');
const playerRenderSlot = document.getElementById('player-render-slot')
const clientHeight = document.body.clientHeight;
const clientWidth = document.body.clientWidth;




const mediumRectangleId = 'wmg-ad-300x250';
const playerId = 'wmg-ad-player'
const mediumRectangle  = mediumRectangleBanner(mediumRectangleId);
let currentlyShowing = false;

function setAttributes(el, attrs) {
  for(let key in attrs) {
    el.setAttribute(key, attrs[key]);
  }
}

const replaceElement = (newEl, replaceEl) => {
  replaceEl.parentElement.replaceChild(newEl, replaceEl)
}


const renderVideoPlayer = (elId) => {
      currentlyShowing = true;
      console.log(currentlyShowing);
      let playerWidth = mainContent.offsetWidth * 0.8;
      let playerHeight = playerWidth/1.7;
      videoPlayer.id = playerId;
      const videoPlayerInner = document.createElement('div');
      videoPlayerInner.style.cssText = `width: ${playerWidth}px; height: ${playerHeight}px; margin: auto; transition: all 700ms linear; overflow: hidden`;
      const videoPlayerSlot = document.createElement('div');
      videoPlayerSlot.id = 'wmg-player'
      videoPlayerSlot.style.cssText = 'height: inherit; width: inherit';
      const videoParamScrip = document.createElement('script');
      setAttributes(videoParamScrip, styles[`${elId}-vid-params`]);
      const adEndScript = document.createElement('script');
      adEndScript.textContent = `
        function adEndEvent() {
         const videoPlayerBlock = document.getElementById('wmg-ad-player');
         videoPlayerBlock.innerHTML = '';
         videoPlayerBlock.remove();
         currentlyShowing = false;
        }
  `;
      videoPlayerInner.append(videoPlayerSlot, videoParamScrip, adEndScript);
      videoPlayer.append(videoPlayerInner);
      playerRenderSlot.append(videoPlayer);


}


const renderMediumRectangle = (elId) => {
  bannerMediumRectangle.id = mediumRectangleId;
  bannerMediumRectangle.style = styles[elId];
  const bannerMediumRectangleScript = document.createElement('script');
  bannerMediumRectangleScript.innerHTML = mediumRectangle;
  bannerMediumRectangle.append(bannerMediumRectangleScript);
}


const renderElement = (id, targetEl) => {
  if(id === '300x250' && currentlyShowing) {
    currentlyShowing = true;
    renderMediumRectangle(id);
    adShowCase.append(bannerMediumRectangle);
  } else if(id === 'player') {
      console.log('clicked')
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




