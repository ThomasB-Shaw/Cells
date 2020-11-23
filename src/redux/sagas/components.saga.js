
import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchComponents() {
    try {
      const paintingsResponse = yield axios.get('/api/components');
      yield put({type: 'SET_COMPONENTS', payload: paintingsResponse.data})
      } catch(err) {
          console.log('err fetching components', err);
      }
  }

function* addComponent(action) {
    console.log(action.payload);
    try {
      yield axios.post('/api/components', action.payload)
    } catch (error) {
      console.log('error in post components', error);
    }
  }

  function* deleteComponent(action) {
    try {
      yield axios.delete(`/api/components/${action.payload}`);
    } catch (error) {
      console.log('ERROR in axios delete components', error);
    }
  }
  
  
  function* componentsSaga() {
    yield takeLatest('FETCH_COMPONENTS', fetchComponents);
    yield takeLatest('ADD_COMPONENT', addComponent);
    yield takeLatest('DELETE_COMPONENT', deleteComponent);
  }
  
  export default componentsSaga;