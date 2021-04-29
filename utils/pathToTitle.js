const paths = {
  character: 'Character details',
  'character-overview': 'Character overview',
  episode: 'Episode details',
  'episode-overview': 'Episode overview',
};

const pathToTitle = path => {
  return paths[path];
};

export { pathToTitle };
