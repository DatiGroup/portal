import FingerprintJS from '@fingerprintjs/fingerprintjs';
import { detect } from 'detect-browser';
import { DeviceInfo } from 'store/slices/auth/authTypes';

const getDeviceInfo = async (): Promise<DeviceInfo> => {
  const fp = await FingerprintJS.load();
  const result = await fp.get();
  const browser = detect();

  return {
    browser: browser?.name || 'WEB N/A',
    platform: browser?.os || 'WEB N/A',
    hash: result.visitorId
  };
};

export { getDeviceInfo };
