import React from 'react';
import NexusContext from './nexusContext';

export default function NexusProvider({ nexusClient, children }: any) {
  return (
    <NexusContext.Provider value={nexusClient}>
      {children}
    </NexusContext.Provider>
  );
}
