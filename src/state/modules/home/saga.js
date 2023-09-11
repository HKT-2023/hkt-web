import {
    all,
    fork,
    put,
    select,
    takeLatest
} from 'redux-saga/effects';
import {
    // getProducts,
    // getColors,
    actionUpdateProductData,
    ACTION_CHANGE_PRODUCT
} from './index';

function* loadRouteData() {
    // const {home} = yield select();
    // const {
    //     productFilter
    // } = home;
    // yield put(getColors());
    // yield put(getProducts(productFilter));
}

function* handleListenActions() {
    yield takeLatest([
        ACTION_CHANGE_PRODUCT
    ], function* (action) {
        const editedProduct = action.payload;
        const {home} = yield select();
        const {
            products,
            editedProducts
        } = home;

        // update products
        let newProducts = products.slice(0);
        for (let i = 0; i < newProducts.length; i++) {
            if (newProducts[i].id === editedProduct.id) {
                newProducts[i] = editedProduct;
                break;
            }
        }

        // update edited Products
        let newEditedProducts = editedProducts.slice(0);
        let alreadyExist = false;
        for (let i = 0; i < newEditedProducts.length; i++) {
            if (newEditedProducts[i].id === editedProduct.id) {
                newEditedProducts[i] = editedProduct;
                alreadyExist = true;
                break;
            }
        }

        if (!alreadyExist) {
            newEditedProducts.push(editedProduct);
        }

        // call action to update store
        yield put(actionUpdateProductData({
            products: newProducts,
            editedProducts: newEditedProducts
        }));
    });
}

export function* loadHomePage() {
    yield all([
        fork(loadRouteData),
        fork(handleListenActions)
    ]);
}
  