import { shareKakao } from '../API/Share/shareKakao';
import TranslucentBtn from './TranslucentBtn';

export const SharingModal = (props) => {
    return (
        <TranslucentBtn
            className="sharing_modal_btn3"
            text={"공유하기"}
            onClick={() => {
                shareKakao(props.route, props.title, props.description);
            }}>
        </TranslucentBtn>
    );
}