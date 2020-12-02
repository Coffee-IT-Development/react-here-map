/**
 * @param {object} platform Platform object to use for initialization.
 */
export default (platform, type) => {
  if (!platform || platform.A !== 'api.here.com') {
    throw new Error("Platform should be of Here Map's Platform");
  }

  const placesService = platform.getPlacesService();

  switch (type) {
    case 'around':
      return new H.places.Around(placesService);
    case 'categories':
      return new H.places.Categories(placesService);
    case 'explore':
      return new H.places.Explore(placesService);
    case 'here':
      return new H.places.Here(placesService);
    case 'lookup':
      return new H.places.Lookup(placesService);
    case 'suggest':
      return new H.places.Suggest(placesService);
    case 'search':
    default:
      return new H.places.Search(placesService);
  }
};
