export default interface IAppSettings {
  authentication: {
    schema: string;
  };
  site: {
    name: string;
  };
  api: {
    url: string;
  };
  defaults: {
    search: {
      delay: number;
      take: number;
    };
    select: {
      delay: number;
      take: number;
    };
  };
  google: {
    trackingId: string;
  };
}
