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
}

export const PLATFORM_SETTINGS: PlatformSettingsProps = {
  cookies: {
    USER_CREDENTIALS_KEY: '@sportscentral-credentials',
    COOKIES_EXPIRATION: 30 * 24 * 60 * 60
  }
};
