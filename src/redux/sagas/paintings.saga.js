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

// Hits Post request in painting.router, Called in addPage Page.  Submits all data to both Painting and Components table in Database
function* addPainting(action) {
  console.log(action.payload);
  try {
    yield axios.post('/api/paintings', action.payload);
    yield action.history.push('/user');
  } catch (error) {
    console.log('error in post', error);
  }
}

function* deletePainting(action) {
  try {
    yield axios.delete(`/api/paintings/${action.payload}`);
    yield action.history.push('/user');
  } catch (error) {
    console.log('ERROR in axios delete painting', error);
  }
}

function* updatePainting(action) {
  try {
    yield axios.put(`/api/paintings/${action.id}`, action.payload);
    yield action.history.push('/user');
  } catch (error) {
    console.log('ERROR in axios delete painting', error);
  }
}


function* paintingsSaga() {
  yield takeLatest('FETCH_PAINTINGS', fetchPaintings);
  yield takeLatest('ADD_PAINTING', addPainting);
  yield takeLatest('DELETE_PAINTING', deletePainting);
  yield takeLatest('EDIT_PAINTING', updatePainting);
}

export default paintingsSaga;