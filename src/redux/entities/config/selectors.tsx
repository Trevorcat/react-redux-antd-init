export const getConfigMapping = (state: { entities: { config: any } }) =>
  state.entities.config;

export const getConfig = (state: { entities: { config: any } }) => {
  const configMapping = state.entities.config;
  const keys = Object.keys(configMapping);

  return keys.map((key) => configMapping[key]);
};

export const getPlayerById = (
  state: { entities: { config: any } },
  id: string
) => state.entities.config[id];