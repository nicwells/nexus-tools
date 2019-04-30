import React from 'react';
import invariant from 'ts-invariant';
import nexusContext from './nexusContext';

const warningMessage =
  'No Nexus client found. ' +
  'To use nexus-react components, make sure you wrap your React app with the NexusProvider component' +
  ' like: <NexusProvider nexusClient={myClient)><App /></NexusProvider>. ';

export default function useNexus(apiCall: Promise<any>) {
  const nexus = React.useContext(nexusContext);
  const [state, setState] = React.useState({
    loading: true,
    error: null,
    data: null,
  });
  invariant(nexus, warningMessage);
  React.useEffect(() => {
    setState({ ...state, loading: true });
    // @ts-ignore
    apiCall(nexus)
      .then((data: any) => setState({ ...state, loading: false, data }))
      .catch((error: any) => setState({ ...state, loading: false, error }));
  }, []);

  return state;
}
