import { Cookies, Notify, openURL } from 'quasar';
import { i18n } from 'src/boot/i18n';
import appSettings from 'src/modules/app-settings';

// https://www.linklaters.com/en/legal-notices/privacy-portal/cookie-notice
// https://learndigital.withgoogle.com/atelieruldigital/courses
// https://developers.google.com/tag-platform/devguides/consent
// https://youtu.be/8UedbL4tFHc

const cookiePolicyPathname = '/politica-de-confidentialitate';

const applyGdprOptions = () => {
  const trackingId = appSettings.google.trackingId || '';
  if (
    Cookies.has('gdpr') &&
    Cookies.get('gdpr') === 'accept-all' &&
    trackingId
  ) {
    const { head } = document;
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${trackingId}`;
    head.insertBefore(script, head.firstChild);

    window.gtag('js', new Date());
    window.gtag('config', trackingId, {
      anonymize_ip: true,
      cookie_flags: 'SameSite=None; Secure',
      allow_ad_personalization_signals: false,
    });
  }
};

setTimeout(() => {
  if (Cookies.has('gdpr')) {
    applyGdprOptions();
  } else if (window.location.pathname !== cookiePolicyPathname) {
    Notify.create({
      message: i18n.global.t('gdpr.notify.message'),
      timeout: 0,
      position: 'bottom-right',
      actions: [
        {
          label: i18n.global.t('gdpr.labels.acceptAll'),
          color: 'yellow',
          handler() {
            Cookies.set('gdpr', 'accept-all', {
              expires: 5 * 365,
              secure: true,
            });
            applyGdprOptions();
          },
        },
        {
          label: i18n.global.t('gdpr.labels.necessaryCookiesOnly'),
          color: 'yellow-7',
          handler() {
            Cookies.set('gdpr', 'necessary-cookies-only', {
              expires: 5 * 365,
              secure: true,
            });
          },
        },
        {
          label: i18n.global.t('gdpr.labels.privacyPolicy'),
          color: 'grey',
          noDismiss: true,
          handler() {
            openURL(cookiePolicyPathname);
          },
        },
      ],
    });
  }
}, 700);
