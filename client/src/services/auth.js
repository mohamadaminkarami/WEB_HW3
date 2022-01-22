import { atom } from 'recoil';

const authAtom = atom({
    key: 'auth',
    default: JSON.parse(localStorage.getItem('token'))
});

export { authAtom };