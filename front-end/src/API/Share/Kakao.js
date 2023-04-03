const {Kakao} = window;
const APP_KEY = process.env.REACT_APP_KAKAO_JAVASCRIPT_KEY;

export default function initialize() {
    Kakao.init(APP_KEY);
}