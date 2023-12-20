import React from 'react';

import MainNavigator from './src/navigations/MainNavigator';
import {client} from './src/apis/common';
import {SWRConfig} from 'swr';

const defaultFetcher = key => {
  if (Array.isArray(key)) {
    return client(key[0], key[1]).json();
  }
  return client(key).json();
};

const App = () => {
  return (
    <SWRConfig
      value={{
        shouldRetryOnError: false,
        fetcher: defaultFetcher,
      }}>
      <MainNavigator />
    </SWRConfig>
  );
};

export default App;
