import { NexusClientOptions } from './nexus-sdk';

// wrap API calls with the fancy fetch API
const Organization = ({ httpGet }: any, context: NexusClientOptions) => {
  return {
    get: async (label: string): Promise<Object> =>
      httpGet(`${context.uri}/${context.version}/orgs/${label}`),
    list: (): Promise<Object> =>
      httpGet(`${context.uri}/${context.version}/orgs`),
  };
};

export default Organization;
