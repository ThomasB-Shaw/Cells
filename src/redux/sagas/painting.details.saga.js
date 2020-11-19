import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchPaintingDetails(action) {
  try {
    const paintingDetailsResponse = yield axios.get(`/api/paintingDetails/${action.payload}`);
    yield put({type: 'SET_PAINTING_DETAILS', payload: paintingDetailsResponse.data})
    } catch(err) {
        console.log('err fetching painting details', err);
    }
}


function* paintingDetailsSaga() {
  yield takeLatest('FETCH_PAINTING_DETAILS', fetchPaintingDetails);
}

export default paintingDetailsSaga;