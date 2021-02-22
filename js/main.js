import {staticBannerBody} from './adsizes';
import {BannerBody} from "./adsizes";
import {styles} from './dynamicstyles';
const mainContent = document.querySelector('.main-content');
const adItems = document.querySelectorAll('.ad-item');
const playerRenderSlot = document.getElementById('player-render-slot');
const topStickyBanner = document.querySelector('.sticky-top-fluid');
const bottomStickyBanner = document.querySelector('.sticky-bottom-fluid');
let scrollHeight = 0;

const sizeIdPairs = {'300x250': 'wmg-ad-300x250', '300x600': 'wmg-ad-300x600', 'player': 'wmg-ad-player', 'fluid90': 'wmg-ad-fluidx90', 'fluidx180': 'wmg-ad-fluidx180', 'video-banner': 'wmg-video-banner', 'slider':'slider-video'}

function setAttributes(el, attrs) {
  for(let key in attrs) {
    el.setAttribute(key, attrs[key]);
  }
}

const checkScroll = () => {
  if(scrollHeight > 20) {
    topStickyBanner.classList.remove('hidden-on-scroll');
    bottomStickyBanner.classList.add('hidden-on-scroll');
  } else {
    bottomStickyBanner.classList.remove('hidden-on-scroll');
    topStickyBanner.classList.add('hidden-on-scroll');
  }
}

const replaceElement = (newEl, replaceEl) => {
  replaceEl.parentElement.replaceChild(newEl, replaceEl)
}



const renderSlider = function(elId, targetEl) {
  let renderEl = targetEl.closest('div.recommended-video');
  if(renderEl.classList.contains('active')) {
    return
  }
  renderEl.classList.toggle('active');
  const renderSlot = document.querySelector('.recommended-render-slot')
  const videoPlayerSlider = document.createElement('div');

  let playerWidth = renderEl.offsetWidth * 0.9;
  let playerHeight = playerWidth/1.7;
  videoPlayerSlider.id = sizeIdPairs[elId];
  const videoPlayerSliderInner = document.createElement('div');
  videoPlayerSliderInner.style.cssText = `width: ${playerWidth}px; height: ${playerHeight}px; margin: auto; transition: all 700ms linear; overflow: hidden`;
  const videoPlayerSliderSlot = document.createElement('div');
  videoPlayerSliderSlot.id = 'wmg-player-slider'
  videoPlayerSliderSlot.style.cssText = 'height: inherit; width: inherit';
  const videoParamScrip = document.createElement('script');
  setAttributes(videoParamScrip, styles[`${elId}-vid-params`]);
  const adEndScript = document.createElement('script');
  adEndScript.textContent = `
        function adEndEventSlider() {
         const videoPlayerSliderBlock = document.getElementById('slider-video');
         videoPlayerSliderBlock.innerHTML = '';
         renderEl.classList.remove('active');
         videoPlayerSliderBlock.remove();
        }
  `;
  videoPlayerSliderInner.append(videoPlayerSliderSlot, videoParamScrip, adEndScript);
  videoPlayerSlider.append(videoPlayerSliderInner);
  renderSlot.append(videoPlayerSlider);
}


const renderVideoPlayer = (elId) => {
      const videoPlayer = document.createElement('div');
        if(videoPlayer.offsetHeight) {
          return
        }
      let playerWidth = mainContent.offsetWidth * 0.8;
      let playerHeight = playerWidth/1.7;
      videoPlayer.id = sizeIdPairs[elId];
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

        }
  `;
      videoPlayerInner.append(videoPlayerSlot, videoParamScrip, adEndScript);
      videoPlayer.append(videoPlayerInner);
      playerRenderSlot.append(videoPlayer);
}


const renderStaticBanner = (elId, targetEl) => {
  const bannerPlacement = document.createElement('div');
  let placementId = sizeIdPairs[elId];
  let placementSize = elId.split('x').join(',');
  bannerPlacement.id = placementId;
  const bannerBody  = new BannerBody(placementId, placementSize).createBannerBody();
  const bannerPlacementScript = document.createElement('script');
  bannerPlacementScript.innerText = bannerBody;
  bannerPlacement.append(bannerPlacementScript);
  replaceElement(bannerPlacement, targetEl)
}


const renderFluidBanner = (elId, targetEl) => {
  const fluidBannerPlacement = document.createElement('div');
  const placementId = sizeIdPairs[elId]
  fluidBannerPlacement.id = placementId;
  let placementWidth = targetEl.parentElement.offsetWidth;
  let placementHeight = elId.split('x')[1];
  let placementSize = `${placementWidth}, ${placementHeight}`
  const bannerBody = new BannerBody(placementId, placementSize).createFluidBannerBody();
  const fluidPlacementScript = document.createElement('script');
  fluidPlacementScript.innerText = bannerBody;
  fluidBannerPlacement.append(fluidPlacementScript)
  replaceElement(fluidBannerPlacement, targetEl)
}

const renderVideoBanner = (elId, targetEl) => {
  const videoBannerPlayer = document.createElement('div');
  if(videoBannerPlayer.offsetHeight) {
    return;
  }
  let playerWidth = targetEl.parentElement.offsetWidth;
  let playerHeight = targetEl.parentElement.offsetHeight;
  videoBannerPlayer.id = sizeIdPairs[elId];
  const videoPlayerInner = document.createElement('div');
  videoPlayerInner.style.cssText = `width: ${playerWidth}px; height: ${playerHeight}px; margin: auto; transition: all 700ms linear; overflow: hidden; position:relative`;
  const videoPlayerSlot = document.createElement('div');
  videoPlayerSlot.id = 'wmg-player'
  videoPlayerSlot.style.cssText = 'height: inherit; width: inherit';
  const videoParamScrip = document.createElement('script');
  setAttributes(videoParamScrip, styles[`player-vid-params`]);
  const videoInBannerContainer = document.createElement('div');
  setAttributes(videoInBannerContainer, styles[elId])
  const videoInBannerContent = document.createElement('div');
  videoInBannerContent.id = 'wmg-ad-banner'
  const videoInBannerContentHTML = new BannerBody('wmg-ad-banner', '300,250').createBannerBody();
  const videoInBannerScript = document.createElement('script');
  const adEndScript = document.createElement('script');
  adEndScript.textContent = `
        function adEndEvent() {
         const videoPlayerBlock = document.getElementById('wmg-ad-player');
         videoPlayerBlock.innerHTML = '';
         videoPlayerBlock.remove();

        }
  `;
  videoInBannerScript.innerHTML = videoInBannerContentHTML;
  videoInBannerContainer.append(videoInBannerContent)
  videoInBannerContent.append(videoInBannerScript);
  videoPlayerInner.append(videoPlayerSlot, videoParamScrip, videoInBannerContainer);
  videoBannerPlayer.append(videoPlayerInner);
  replaceElement(videoBannerPlayer, targetEl)
}


const renderElement = (id, targetEl) => {
  if(id === '300x250' || id === '300x600' ) {
    renderStaticBanner(id, targetEl);
  } else if(id === 'player') {
    renderVideoPlayer(id)
  } else if(id.includes('fluid')) {
    renderFluidBanner(id, targetEl)
  } else if(id === 'video-banner') {
    renderVideoBanner(id, targetEl)
  } else if (id === 'slider') {
    renderSlider(id, targetEl)
  } else {
    return;
  }
}



const showItem = (event) => {
  const adItemSize = event.target.closest('div').dataset.adBlock;
  const targetEl = event.target;
  renderElement(adItemSize, targetEl);
  // targetEl.removeEventListener('click', showItem)
}


adItems.forEach((el) => {
  el.addEventListener('click', showItem )
})

document.addEventListener('scroll',  () => {
  scrollHeight = window.scrollY;
  checkScroll();
})




