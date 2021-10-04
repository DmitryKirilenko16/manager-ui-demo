import React from 'react'
import { Provider } from 'react-redux'
import { store } from './redux/app.store'

import { MuiThemeProvider } from '@material-ui/core'
import { themeOptions } from './material.theme'
import { MainContainer } from './MainContainer'
import { GenericToastContainer } from './react-core/components/toast/GenericToastContainer'
import { DialogProvider } from './shared/dialogs/DialogProvider'
import './index.scss'
import {Store} from 'redux'

function App() {

    return (
        <div className="App">
            <Provider store={store || {} as Store}>
                <MuiThemeProvider theme={themeOptions}>
                    <MainContainer />
                    <DialogProvider />
                    <GenericToastContainer />
                </MuiThemeProvider>
            </Provider>
        </div>
    )
}

export default App
