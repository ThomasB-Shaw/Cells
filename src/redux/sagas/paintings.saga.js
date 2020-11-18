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

// Hits Post request in movieRouter, Called in AddMovie Page.  Submits all data to both Movie and genre table in Database
function* addPainting(action) {
  console.log(action.payload);
  try {
    yield axios.post('/api/paintings', action.payload)
  } catch (error) {
    console.log('error in post', error);
  }
}


function* paintingsSaga() {
  yield takeLatest('FETCH_PAINTINGS', fetchPaintings);
  yield takeLatest('ADD_PAINTING', addPainting);
}

export default paintingsSaga;