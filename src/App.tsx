//React components hooks
import React from 'react';
import AppContainer from './components/Containers/AppContainer';


//Redux related
import store from './redux/store/store';
import {Provider} from 'react-redux';



//React query related
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query';


const queryClient = new QueryClient();

const App= () =>  {
 
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
          <AppContainer />
      </QueryClientProvider>
    </Provider>
  );
}

export default App;




