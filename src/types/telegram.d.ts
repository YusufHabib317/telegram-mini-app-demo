export {};

declare global {
  interface TelegramWebAppThemeParams {
    bg_color: string;
    text_color: string;
    hint_color: string;
    link_color: string;
    button_color: string;
    button_text_color: string;
    secondary_bg_color: string;
  }

  interface TelegramWebApp {
    ready: () => void;
    expand: () => void;
    close: () => void;
    showPopup: (params: { message: string; buttons?: string[] }) => void;
    showAlert: (message: string) => void;
    showConfirm: (message: string) => Promise<boolean>;
    MainButton: {
      text: string;
      color: string;
      textColor: string;
      isVisible: boolean;
      isActive: boolean;
      setText: (text: string) => void;
      onClick: (callback: () => void) => void;
      offClick: (callback: () => void) => void;
      show: () => void;
      hide: () => void;
    };
    BackButton: {
      isVisible: boolean;
      onClick: (callback: () => void) => void;
      offClick: (callback: () => void) => void;
      show: () => void;
      hide: () => void;
    };
    themeParams: TelegramWebAppThemeParams;
    colorScheme: 'light' | 'dark';
    isExpanded: boolean;
    viewportHeight: number;
    viewportStableHeight: number;
    platform: string;
    headerColor: string;
    backgroundColor: string;
    initData: string;
    initDataUnsafe: {
      query_id: string;
      user?: {
        id: number;
        first_name: string;
        last_name?: string;
        username?: string;
        language_code?: string;
        is_premium?: boolean;
      };
      start_param?: string;
      auth_date: string;
      hash: string;
    };
  }

  interface Window {
    Telegram: {
      WebApp: TelegramWebApp;
    };
  }
}
