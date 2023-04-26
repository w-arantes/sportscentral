/**
 * SportsCentral
 * Platform Settings
 *
 * Global setting related to platform controls (storage, cache, SSG)
 */

interface PlatformSettingsProps {
  cookies: {
    USER_CREDENTIALS_KEY: string;
    COOKIES_EXPIRATION: number;
  };
  ssr: {
    pages: {
      EVENTS_REVALIDATION: number;
      EVENT_REVALIDATION: number;
      EVENTS_BY_CATEGORY_REVALIDATION: number;
    };
  };
}

export const PLATFORM_SETTINGS: PlatformSettingsProps = {
  cookies: {
    USER_CREDENTIALS_KEY: '@sportscentral-credentials',
    COOKIES_EXPIRATION: 60 * 60 * 24 // 1 day
  },
  ssr: {
    pages: {
      EVENTS_REVALIDATION: 60 * 60 * 12, // 12 hours
      EVENT_REVALIDATION: 60 * 60 * 12, // 12 hours
      EVENTS_BY_CATEGORY_REVALIDATION: 60 * 60 * 12 // 12 hours
    }
  }
};
