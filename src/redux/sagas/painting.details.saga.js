import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// Gets all of a painting details on click of it in either the home gallery of a users gallery
function* fetchPaintingDetails(action) {
  try {
    const paintingDetailsResponse = yield axios.get(`/api/paintingDetails/${action.payload}`);
    yield put({type: 'SET_PAINTING_DETAILS', payload: paintingDetailsResponse.data})
    yield action.history.push('/details')
    } catch(err) {
        console.log('err fetching painting details', err);
    }
}


function* paintingDetailsSaga() {
  yield takeLatest('FETCH_PAINTING_DETAILS', fetchPaintingDetails);
}

export default paintingDetailsSaga;