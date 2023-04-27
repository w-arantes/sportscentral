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
      HOMEPAGE_REVALIDATION: number;
      EVENTS: {
        REVALIDATION: number;
        FALLBACK: boolean | 'blocking';
      };
      EVENT: {
        REVALIDATION: number;
        FALLBACK: boolean | 'blocking';
      };
      EVENTS_BY_CATEGORY: {
        REVALIDATION: number;
        FALLBACK: boolean | 'blocking';
      };
    };
  };
}

const DEFAULT_TIME = 60 * 60 * 4; //4 hours;

export const PLATFORM_SETTINGS: PlatformSettingsProps = {
  cookies: {
    USER_CREDENTIALS_KEY: '@sportscentral-credentials',
    COOKIES_EXPIRATION: 60 * 60 * 24 // 1 day
  },
  ssr: {
    pages: {
      HOMEPAGE_REVALIDATION: DEFAULT_TIME,
      EVENT: {
        FALLBACK: 'blocking',
        REVALIDATION: DEFAULT_TIME
      },
      EVENTS: {
        FALLBACK: 'blocking',
        REVALIDATION: DEFAULT_TIME
      },
      EVENTS_BY_CATEGORY: {
        FALLBACK: 'blocking',
        REVALIDATION: DEFAULT_TIME
      }
    }
  }
};
