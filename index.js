// import 'react-native-gesture-handler';
// import {AppRegistry} from 'react-native';
// import App from './App';
// import {name as appName} from './app.json';
// import { Provider } from 'react-redux';
// import {Provider as PaperProvider} from 'react-native-paper';
// import { store } from './src/Reduxtoolkit/store';


// const HiringTechApp = () => (
//     <Provider store={store}>
//         <App />
//     </Provider>
//   );

// AppRegistry.registerComponent(appName, () => HiringTechApp);


import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { Provider } from 'react-redux';
import {Provider as PaperProvider} from 'react-native-paper';
import { store } from './src/Reduxtoolkit/store';
import { AuthProvider } from './AuthContext';

const HiringTechApp = () => (
    <Provider store={store}>
        <AuthProvider> 
          <PaperProvider>
              <App />
          </PaperProvider>
        </AuthProvider> 
    </Provider>
);

AppRegistry.registerComponent(appName, () => HiringTechApp);