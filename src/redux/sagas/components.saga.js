import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// Gets all components
function* fetchComponents() {
  try {
    const paintingsResponse = yield axios.get('/api/components');
    yield put({type: 'SET_COMPONENTS', payload: paintingsResponse.data})
    } catch(err) {
        console.log('err fetching components', err);
    }
}

// Gets all components marked method for a given painting based on the paintings ID
function* fetchMethods(action) {
  console.log(action.payload)
  try {
    const methodsResponse = yield axios.get(`/api/components/methods/${action.id}`);
    yield put({type: 'SET_METHODS', payload: methodsResponse.data})
    } catch(err) {
        console.log('err fetching components', err);
    }
}

// Gets all components marked Colors for a given painting based on the paintings ID
function* fetchColors(action) {
  try {
    const colorsResponse = yield axios.get(`/api/components/colors/${action.id}`);
    yield put({type: 'SET_COLORS', payload: colorsResponse.data})
    } catch(err) {
        console.log('err fetching components', err);
    }
}

// Gets all components marked Tools for a given painting based on the paintings ID
function* fetchTools(action) {
  try {
    const toolsResponse = yield axios.get(`/api/components/tools/${action.id}`);
    yield put({type: 'SET_TOOLS', payload: toolsResponse.data})
    } catch(err) {
        console.log('err fetching components', err);
    }
}

// Posts new component to database using paintings ID and key passed from client
function* addComponent(action) {
    console.log(action.payload);
    try {
      yield axios.post(`/api/components`, action.payload);
      yield action.getComponents();
    } catch (error) {
      console.log('error in post components', error);
    }
  }

// delete component based on ID of component based on component local state id in EditPainting
function* deleteComponent(action) {
  try {
    yield axios.delete(`/api/components/${action.payload}`);
    yield action.getComponents();
  } catch (error) {
    console.log('ERROR in axios delete components', error);
  }
}

function* componentsSaga() {
  yield takeLatest('FETCH_COMPONENTS', fetchComponents);
  yield takeLatest('FETCH_METHODS', fetchMethods)
  yield takeLatest('FETCH_COLORS', fetchColors)
  yield takeLatest('FETCH_TOOLS', fetchTools)
  yield takeLatest('ADD_COMPONENT', addComponent);
  yield takeLatest('DELETE_COMPONENT', deleteComponent);
}

export default componentsSaga;