/* eslint-disable react-hooks/exhaustive-deps */

import { getTelegramApp } from '@/lib/telegram';
import { useEffect, useState } from 'react';

export const useTelegram = () => {
  const [isReady, setIsReady] = useState(false);
  const webapp = getTelegramApp();

  useEffect(() => {
    if (webapp) {
      webapp.ready();
      webapp.expand();
      setIsReady(true);
    }
  }, []);

  const showAlert = (message: string) => {
    if (webapp) {
      webapp.showAlert(message);
    } else {
      // eslint-disable-next-line no-alert
      alert(message);
    }
  };

  const showConfirm = async (message: string) => {
    if (webapp) {
      // eslint-disable-next-line no-return-await
      return await webapp.showConfirm(message);
    }
    // eslint-disable-next-line no-alert
    return window.confirm(message);
  };

  return {
    webapp,
    isReady,
    showAlert,
    showConfirm,
  };
};
