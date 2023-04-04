const { Kakao } = window;
 
export const shareKakao = (route, title, description) => {
  Kakao.Link.sendDefault({
    objectType: 'feed',
    content: {
      title: title,
      description:description,
      imageUrl: "https://i.ibb.co/bvRbSpp/OGtag-image.png",
      link: {
        webUrl: route,
        mobileWebUrl: route,
      },
    },
    buttons: [
      {
        title: '자세히 보기',
        link: {
          webUrl: route,
          mobileWebUrl: route,
        },
      },
    ],
  });
};