import appsettingsJson from 'src/appsettings.json';
import devAppsettingsJson from 'src/appsettings.dev.json';
import prodAppsettingsJson from 'src/appsettings.prod.json';
import IAppSettings from './types/IAppSettings';

export default process.env.DEV
  ? { ...appsettingsJson, ...devAppsettingsJson }
  : ({ ...appsettingsJson, ...prodAppsettingsJson } as IAppSettings);
