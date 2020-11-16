import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchPaintings() {
  try {
    const paintingsResponse = yield axios.get('/api/paintings');
    yield put({type: 'SET_PAINTINGS', payload: paintingsResponse.data})
    } catch(err) {
        console.log('err fetching paintings', err);
    }
}


function* paintingsSaga() {
  yield takeLatest('FETCH_PAINTINGS', fetchPaintings);
}

export default paintingsSaga;