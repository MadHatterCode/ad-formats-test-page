export class BannerBody {

  constructor(placementId, placementSize) {
    this.id = placementId;
    this.size = placementSize;
  }

  createBannerBody() {
    return `
        window.googletag = window.googletag || {cmd: []};
        googletag.cmd.push(function() {
        googletag.defineSlot('/112081842/test_ad_1', [[${this.size}]], '${this.id}')
                 .addService(googletag.pubads());
        googletag.pubads().collapseEmptyDivs();
        googletag.pubads().setCentering(true);
        googletag.pubads().set('page_url', 'https://wmgroup.us/');
        googletag.enableServices();
        googletag.display('${this.id}');
      });
    `
  }

  createFluidBannerBody() {
    let closeBtnPosition;
    if(this.id === 'wmg-ad-fluidx180') {
      closeBtnPosition = 'top';
    } else {
      closeBtnPosition = 'bottom'
    }
    return `
      window.googletag = window.googletag || {cmd: []};
      googletag.cmd.push(function() {
      googletag.defineSlot('/112081842/test_ad_1',[${this.size}], '${this.id}')
      .addService(googletag.pubads());
      googletag.pubads().enableSingleRequest();
      googletag.pubads().collapseEmptyDivs();
      googletag
            .pubads()
            .addEventListener("impressionViewable", function (event) {
                let block_ad_WMG = document.getElementById('${this.id}').parentElement;
                block_ad_WMG.style.zIndex = "99999999";
                block_ad_WMG.style.background = "rgba(222,222,222, 0.9)";
                var wmg_div_close = document.createElement("div"),
                  span_1 = document.createElement("div"),
                  span_2 = document.createElement("div");
                wmg_div_close.style =
                  "position: absolute; width: 30px; height: 30px; z-index: 9999999; border: 0px solid grey; cursor: pointer; ${closeBtnPosition}: -30px; right: 0; background: rgba(211,222,211,0.85)";
                span_1.style =
                  "width: 20px; height: 2px; background: rgb(68, 68, 68); left: calc(50% - 10px); top: 50%; position: absolute; transform: rotate(45deg);";
                span_2.style =
                  "width: 20px; height: 2px; background: rgb(68, 68, 68); left: calc(50% - 10px); top: 50%; position: absolute; transform: rotate(-45deg);";
                wmg_div_close.appendChild(span_1);
                wmg_div_close.appendChild(span_2);
                wmg_div_close.id = "closebar-wmg-ad";
                wmg_div_close.addEventListener("click", function () {
                  block_ad_WMG.remove();
                });
                function appendCloseDiv() {
                  block_ad_WMG.appendChild(wmg_div_close);
                }
                appendCloseDiv();
            });
    googletag.pubads().setCentering(true);
    googletag.pubads().set('page_url', 'https://wmgroup.us/');
    googletag.enableServices();
    googletag.display('${this.id}');
    });
    `
  }
}
