import { NexusClientOptions } from './nexus-sdk';

const NFile = ({ httpGet }: any, context: NexusClientOptions) => {
  return {
    get: (orgLabel: string, projectLabel: string, fileId: string) =>
      httpGet(
        `${context.uri}/${
          context.version
        }/files/${orgLabel}/${projectLabel}/${fileId}`,
        {
          as: 'blob',
        },
      ),
  };
};

export default NFile;
