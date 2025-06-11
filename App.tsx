import React from 'react';
import { AppContainer } from './src/Navigation/AppContainer';

import * as LiveActivities from '@local:live-activities';
import { useState } from 'react';

const App = () => {
  const [token, setToken] = useState<string>();
  const [startToken, setStartToken] = useState<string>();

  LiveActivities.useLiveActivitiesSetup(({ token }) => {
    setStartToken(token);
  });

  LiveActivities.useGetPushToken(({ token }) => {
    setToken(token);
  });

  return <AppContainer />;
};

export default App;
