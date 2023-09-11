import universal from 'react-universal-component'
import { connect } from 'react-redux'
import { string, bool, objectOf, any } from 'prop-types'
import { selectRoutesMap, selectRouteType } from './state/modules/routing'
import { bootDidFinish } from './state/modules/app'
import RouteErrorScreen from './pages/RouteError'
import { Loading } from 'components/Loading'
import { Helmet } from 'react-helmet'
const RootRoute = ({
  pageComponent,
  isLoading = false,
  isPermittedToRenderCurrentPage = false, // todo: check permission for this
  currentRoute,
}) => {
  if (isLoading) {
    return <Loading />
  }
  return (
    isPermittedToRenderCurrentPage && (
      <>
        <Helmet>
          <meta charSet='utf-8' />
          <title>{currentRoute?.title ?? ''} - KlayTN</title>
        </Helmet>
        <UniversalComponent
          page={pageComponent}
          isLoading={isLoading}
          currentRoute={currentRoute}
        />
      </>
    )
  )
}

RootRoute.propTypes = {
  pageComponent: string.isRequired,
  isLoading: bool,
  isPermittedToRenderCurrentPage: bool,
  currentRoute: objectOf(any).isRequired,
}

const UniversalComponent = universal((props) => import(`./pages/${props.page}/index.tsx`), {
  minDelay: 500,
  chunkName: (props) => props.page,
  loading: <Loading />,
  error: <RouteErrorScreen />,
  onError: (...error) => console.log(error),
  timeout: 90000,
})

export default connect((state) => {
  const routesMap = selectRoutesMap(state)
  const routeType = selectRouteType(state)
  const currentRoute = routesMap[routeType]
  return {
    currentRoute,
    isPermittedToRenderCurrentPage: !currentRoute.requiresAuth || state.auth.isAuthSuccessed, // || userIsAuthenticated(state),
    pageComponent: currentRoute.component,
    // in addition to showing the loading screen as chunks load,
    // we render it until initial app bootup finishes
    isLoading: !bootDidFinish(state),
  }
})(RootRoute)
