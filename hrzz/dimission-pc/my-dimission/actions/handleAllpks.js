import {cacheTools} from 'nc-lightapp-front';

function get() {
    return cacheTools.get('allpks') || [];
}

function add(pk) {
    let allpks = get();
    const index = allpks.indexOf(pk);
    if (index === -1) {
        allpks.unshift(pk);
    }
    set(allpks);
}

function remove(pk) {
    let allpks = get();
    const index = allpks.indexOf(pk);
    if (index > -1) {
        allpks.splice(index, 1);
    }
    set(allpks);
}

function set(pks) {
    cacheTools.set('allpks', pks);
}

let handleAllpks = {
    get,
    set,
    add,
    remove
};
export default handleAllpks;
