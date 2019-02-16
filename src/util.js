const prop = field => object => object[field];

const isPromiseLike = (object) => {
    if (!object) {
        return false;
    }
    return typeof object.then === 'function' && typeof object.catch === 'function';
};

const toPromise = object => Promise.resolve(object);

module.exports = {
    prop,
    isPromiseLike,
    toPromise
};