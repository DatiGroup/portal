import React, { forwardRef } from 'react';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import config from 'config';

/**
 * If hCaptcha fails to initialize (e.g. invalid site key / blocked host), the widget never gets an id,
 * but the library still calls hcaptcha.reset()/remove() on unmount. That throws, and because it happens
 * while navigating away, the error surfaces as "Unknown error" on the next page via the route ErrorBoundary.
 * Swallow cleanup failures so a broken captcha cannot break navigation.
 */
class SafeHCaptcha extends HCaptcha {
  componentWillUnmount() {
    try {
      super.componentWillUnmount?.();
    } catch (error) {
      console.warn('[CustomCaptcha] hCaptcha cleanup failed', error);
    }
  }
}

interface Props {
  onSubmit: (token: string) => void;
  onClose?: () => void;
}

const CustomCaptcha = forwardRef<HCaptcha, Props>(({ onSubmit, onClose }, ref) => {
  // SafeHCaptcha is an HCaptcha, so callers can keep using useRef<HCaptcha>
  return (
    <SafeHCaptcha
      sitekey={config.hCaptchaSiteKey}
      onVerify={onSubmit}
      onClose={onClose}
      ref={ref as React.Ref<SafeHCaptcha>}
      theme="dark"
      size="invisible"
    />
  );
});

CustomCaptcha.displayName = 'CustomCaptcha';
export default CustomCaptcha;
