import React, { useEffect, useState } from 'react';
import loadMap from '../../libs/loadMap';
import initPlatform from '../../libs/initPlatform';
import { merge } from 'lodash';

function Platform(props) {
  const platformProps = merge({ useHTTPS: true }, props);
  const [platformData, setPlatformData] = useState({
    platform: {},
    options: {}
  });

  useEffect(() => {
    loadMap(platformProps).then((options) => {
      const platform = initPlatform(options);
      setPlatformData({ platform, options });
    });
  }, [platformData.platform.A]);

  const { platform, options } = platformData;

  return platform.A === 'api.here.com' &&
    ((options.app_code && options.app_id) || options.apikey)
    ? React.Children.map(platformProps.children, (child) => {
        return React.cloneElement(child, { platform, options });
      })
    : null;
}

export default Platform;
