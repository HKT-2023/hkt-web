import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import './index.css'
import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles'
import configureStore from './state/configureStore'

import App from 'pages/App'
import theme from 'themes/theme'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
const store = configureStore()

root.render(
  <Provider store={store}>
    <StyledEngineProvider injectFirst={true}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </StyledEngineProvider>
  </Provider>,
)
