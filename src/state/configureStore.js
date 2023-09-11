import { applyMiddleware, compose, createStore } from 'redux'
import { apiMiddleware } from 'redux-api-middleware'
import { redirect } from 'redux-first-router'
import createSagaMiddleware from 'redux-saga'
import queryString from 'query-string'
import thunk from 'redux-thunk'
import { find } from 'lodash'
import { SHOW_BLOCK_NAVIGATION_MODAL, HIDE_BLOCK_NAVIGATION_MODAL } from '../state/modules/app'

// imports for router
import { connectRoutes } from 'redux-first-router'
import routesMap from '../routesMap'

// redux sagas, reducers, actions
import sagas from './sagas'
import composeReducers from './rootReducer'
import { boot } from './modules/app'

const {
  reducer: routerReducer,
  middleware: routerMiddleware,
  enhancer: routerEnhancer,
} = connectRoutes(routesMap, {
  querySerializer: queryString,
  initialDispatch: false,
  onBeforeChange: (dispatch, getState, { action }) => {
    const routeDefinition = routesMap[action.type]
    if (routeDefinition && routeDefinition.redirects) {
      const matchedRedirect = find(
        routeDefinition.redirects,
        ({ test }) => !!test(getState, action),
      )

      matchedRedirect && dispatch(redirect(matchedRedirect.to))
    }
  },
  displayConfirmLeave: (message, callback) => {
    const canLeave = (can) => {
      store.dispatch({ type: HIDE_BLOCK_NAVIGATION_MODAL })
      return callback(can)
    }
    store.dispatch({
      type: SHOW_BLOCK_NAVIGATION_MODAL,
      payload: { message, canLeave },
    })
  },
})

const sagaMiddleware = createSagaMiddleware()

let middlewares = [routerMiddleware, apiMiddleware, sagaMiddleware, thunk]

const isDev = process.env.NODE_ENV === 'development'
if (isDev) {
  const { createLogger } = require(`redux-logger`)

  middlewares.push(
    createLogger({
      collapsed: true,
    }),
  )
}

const composeMiddlewares = applyMiddleware(...middlewares)
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  composeReducers({ location: routerReducer }),
  composeEnhancers(routerEnhancer, composeMiddlewares),
)

export default function configureStore() {
  sagaMiddleware.run(sagas)
  // initialDispatch();
  store.dispatch(boot())

  return store
}

export const getState = () => store.getState()
