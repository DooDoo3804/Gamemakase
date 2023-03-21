import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

// localStorage에 저장
const { persistAtom } = recoilPersist();

export const userState = atom({
  key: "userState",
  default: null,
  effects_UNSTABLE: [persistAtom],
});
