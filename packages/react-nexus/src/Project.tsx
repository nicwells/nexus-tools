import useNexus from './utils/useNexus';

const Get = ({
  orgLabel,
  projectLabel,
  children,
}: {
  orgLabel: string;
  projectLabel: string;
  children: any;
}) => {
  // @ts-ignore
  const state = useNexus(nexus => nexus.Project.get(orgLabel, projectLabel));
  return children({ ...state });
};

const List = ({ orgLabel, children }: { orgLabel: string; children: any }) => {
  // @ts-ignore
  const state = useNexus(nexus => nexus.Project.list(orgLabel));
  return children({ ...state });
};

export default {
  Get,
  List,
};
