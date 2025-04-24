import { toast } from "react-toastify";

const getStoredBook = () => {
    // read-list
    const storedListSTR = localStorage.getItem('readList');
    if (storedListSTR) {
        const storedList = JSON.parse(storedListSTR);
        return storedList;
    }
    else {
        return [];
    }
}

const addToStoredDB = (id) => {
    const storedBookData = getStoredBook();
    if (storedBookData.includes(id)) {
        // already exists. do not add it
        alert("Bhai ai id already exist")
    }
    else {
        storedBookData.push(id);
        const data = JSON.stringify(storedBookData);
        localStorage.setItem('readList', data);
        // ideally trigger toast from the component
        toast('This book is added to your read list.')
        // console.log(storedBookData)
    }
}

// const getStoredWishList = () => {
//     // read-list
//     const storedWishListStr = localStorage.getItem('wish-list');
//     if (storedWishListStr) {
//         const storedWishList = JSON.parse(storedWishListStr);
//         return storedWishList;
//     }
//     else {
//         return [];
//     }
// }

// const addToStoredWishList = (id) => {
//     const storedWishList = getStoredWishList();
//     if (storedWishList.includes(id)) {
//         // already exists. do not add it
//         console.log(id, 'already exists in the read list')
//     }
//     else {
//         storedWishList.push(id);
//         const storedWishListStr = JSON.stringify(storedWishList);
//         localStorage.setItem('wish-list', storedWishListStr);
//     }
// }

export { addToStoredDB, getStoredBook }