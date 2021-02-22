import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { defaultAuth } from './auth/authSlice';
import authReducer from './auth/authSlice';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';
import { Provider } from 'react-redux';
import { useEffect } from 'react';

const defaultState = {
  auth: defaultAuth,
};

interface IStoreProps {
  children: JSX.Element | JSX.Element[];
}

const rootReducer = combineReducers({
  auth: authReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const StoreProvider = ({ children }: IStoreProps) => {
  const sagaMiddleware = createSagaMiddleware();

  const store = configureStore({
    reducer: rootReducer,
    preloadedState: defaultState,
    middleware: [sagaMiddleware],
  });

  sagaMiddleware.run(rootSaga);

  return <Provider store={store}>{children}</Provider>;
};

export default StoreProvider;
