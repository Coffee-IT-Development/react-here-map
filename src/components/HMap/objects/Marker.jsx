import PropTypes from 'prop-types';
import merge from 'lodash.merge';
import initMapObjectEvents from '../../../libs/initMapObjectEvents';
import { useEffect } from 'react';
import { centerMap } from '../../../libs/helpers';

function Marker(props) {
  const {
    coords,
    icon,
    hoverIcon,
    DOM,
    options,
    marker,
    getMarker,
    updateMarker,
    draggable,
    setViewBounds,
    animated,
    objectEvents,
    group,
    map,
    __options
  } = merge(
    {
      DOM: false,
      marker: null,
      getMarker() {},
      updateWaypoints() {},
      updateMarker: false,
      draggable: false,
      setViewBounds: true,
      animated: true
    },
    props
  );

  var _options = options || {};

  useEffect(() => {
    handleErrors();
    createIcon();
    const _marker = createMarker();
    if (hoverIcon) addEventListeners(_marker);
    if (draggable) {
      _marker.draggable = draggable;
      _options.volatility = draggable;
    }
    const objectExists = checkIfObjectExists();
    addOrUpdateMarker(_marker, objectExists);
  }, []);

  function addEventListeners(_marker) {
    _marker.addEventListener(
      'pointerenter',
      () => {
        _marker.setIcon(new H.map.Icon(hoverIcon));
      },
      false
    );

    _marker.addEventListener(
      'pointerleave',
      () => {
        _marker.setIcon(new H.map.Icon(icon));
      },
      false
    );
  }

  function handleErrors() {
    // Marker can only be initialized inside HMap
    if (!H || !H.map || !map) {
      throw new Error('HMap has to be initialized before adding Map Objects');
    }

    if (!coords || !coords.lat || !coords.lng) {
      throw new Error(
        '"coords" should be an object with "lat" and "lng" specified'
      );
    }
  }

  function createIcon() {
    if (icon) {
      // Displays a DOM icon
      if (DOM) _options.icon = new H.map.DomIcon(icon);
      // Displays a static icon
      else _options.icon = new H.map.Icon(icon);
    }
  }

  function createMarker() {
    // Create an icon, an object holding the latitude and longitude, and a marker:
    return updateMarker && marker ? marker : new H.map.Marker(coords, _options);
  }

  function checkIfObjectExists() {
    // Check if an object with the same coordinates has been added formerly
    const addedObjects = map.getObjects();
    const objectExists = addedObjects.some((object) => {
      if (typeof object.getPosition === 'function') {
        const { lat, lng } = object.getPosition();
        return lat === coords.lat && coords.lng === lng;
      }
    });
    return objectExists;
  }

  function addOrUpdateMarker(_marker, objectExists) {
    // Add Marker if it doesn't exist
    if (!objectExists && !updateMarker) {
      // Add event listener to the object if intention of using the object is defined
      initMapObjectEvents(_marker, objectEvents, __options);
      if (group) {
        group.addObject(_marker);
        map.addObject(group);
      } else {
        map.addObject(_marker);
      }
    }
    // Update Marker if it does exist
    else if (updateMarker) {
      _marker.setPosition(coords);
    }

    // Send the Marker to the parent
    // eslint-disable-next-line no-unused-expressions
    !marker ? getMarker(_marker) : null;

    if (setViewBounds) {
      // Zooms and centers the map to the Marker
      centerMap(map, coords, animated);
    }
  }

  return null;
}

Marker.propTypes = {
  coords: PropTypes.object.isRequired,
  icon: PropTypes.any,
  DOM: PropTypes.bool,
  options: PropTypes.object,
  marker: PropTypes.object,
  getMarker: PropTypes.func,
  updateMarker: PropTypes.func,
  setViewBounds: PropTypes.bool,
  animated: PropTypes.bool,
  objectEvents: PropTypes.object,
  group: PropTypes.object,
  map: PropTypes.object,
  __options: PropTypes.object
};

export default Marker;
