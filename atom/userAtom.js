import { atom } from "recoil";
const token = localStorage.getItem('token');

const userAtom = atom({
    key: 'authScreenAtom',
    default: !!token ? "false" : "true"
})

export default userAtom;