import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchAccount() {
  try {
    const accountResponse = yield axios.get('/api/account');
    yield put({type: 'SET_ACCOUNT', payload: accountResponse.data})
    } catch(err) {
        console.log('err fetching account data:', err);
    }
}


function* accountSaga() {
  yield takeLatest('FETCH_MY_PAINTINGS', fetchAccount);
}

export default accountSaga;