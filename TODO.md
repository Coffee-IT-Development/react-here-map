DONE

- Unified coords and points (only arrays or single objects with lat and lng values are allowed)
- Added more Error handling
- Added map localization
- Clicking on map logs lat and lng (needs to change)
- Map resizes on window resize

- HMapPolyline
  - Refact
- HMapPolygon
  - Refact
- HMapCircle
  - Refact
  - radius is now in km (instead of m)
- HMapRectangle
  - Refact
- HMap
  - Refact
  - Recenter/rezoom when center/zoom value changes
  - Centralize reset map
  - Center on current location (useLocation)
  - Default size map (100% w x h)
  - Convert component to function
- HPlatform
  - Refact
- HMapRoute
  - Refact
  - HMapRoute render RouteLine
  - HMapRoute render IsoLine
  - Change RouteLine on waypoints change
  - Remove old RouteLine on waypoints change
  - zIndex of start and end marker defaults to 1 (instead of 0)
  - Add edit mode (toggle)
  - Enable adding markers (currently added to end of list)
  - Enable removing markers
  - Enable moving markers
  - setToViewBounds disabled in edit mode
  - Allow different icons for start-, end- and middlepoints and edit mode
  - Always leave atleast 2 markers on the map
- HMapGeoCode
  - Refact
- HMapLayer
  - Refact
- HMapMarker
  - Refact
  - Allow icon to be set to 'none'
  - Allow custom icon
  - Globalized marker events (still needs to be added to marker)
- Allow UI control (enable/disable)

TODO

- HMap
  - Show current location marker (animated)
- Event Handling
  - Marker (drag / add / remove)
- HMapRoute
- Allow UI control (positioning)

MIGHT DO

- HMapPlaces
- HMapGeoCode
- HMapRoute
  - Change IsoLine on waypoints change
  - remove old IsoLine on waypoints change
- Version change to 3.1