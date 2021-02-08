export const mediumRectangleBanner = (mediumRectId) => {
  return `
        window.googletag = window.googletag || {cmd: []};
        googletag.cmd.push(function() {
        googletag.defineSlot('/112081842/test_ad_1', [[300,250]], '${mediumRectId}')
                 .addService(googletag.pubads());

        googletag.pubads().enableSingleRequest();
        googletag.pubads().collapseEmptyDivs();
        googletag.pubads().setCentering(true);
        googletag.pubads().set('page_url', 'https://wmgroup.us/');
        googletag.enableServices();
        googletag.display('${mediumRectId}');
      });
`};

export const videoPlayer = (videoPlayerId) => {
  return `

  `;

}
