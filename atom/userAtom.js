import { atom } from "recoil";

const userAtom = atom({
    key: 'authScreenAtom',
    default: "true"
})

export default userAtom;