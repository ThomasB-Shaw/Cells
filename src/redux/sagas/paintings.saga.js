import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchPaintings() {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };
    const response = yield axios.get('/api/paintings', config);
    yield put({ type: 'SET_PAINTINGS', payload: response.data });
  } catch (error) {
    console.log('PAINTINGS get request failed', error);
  }
}

function* paintingsSaga() {
  yield takeLatest('FETCH_PAINTINGS', fetchPaintings);
}

export default paintingsSaga;