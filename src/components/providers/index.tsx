/* eslint-disable react/no-unknown-property */
/* eslint-disable sonarjs/no-duplicate-string */

'use client';

import { useEffect, useState } from 'react';
import { MantineProvider, createTheme } from '@mantine/core';
import { Notifications } from '@mantine/notifications';

interface ThemeColors {
  bgColor: string;
  textColor: string;
  buttonColor: string;
  buttonTextColor: string;
  hintColor: string;
  linkColor: string;
}

function getThemeColors(): ThemeColors {
  if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
    const tg = window.Telegram.WebApp;
    return {
      bgColor: tg.backgroundColor || '#ffffff',
      textColor: tg.themeParams?.text_color || '#000000',
      buttonColor: tg.themeParams?.button_color || '#2481cc',
      buttonTextColor: tg.themeParams?.button_text_color || '#ffffff',
      hintColor: tg.themeParams?.hint_color || '#999999',
      linkColor: tg.themeParams?.link_color || '#2481cc',
    };
  }
  return {
    bgColor: '#ffffff',
    textColor: '#000000',
    buttonColor: '#2481cc',
    buttonTextColor: '#ffffff',
    hintColor: '#999999',
    linkColor: '#2481cc',
  };
}

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const [themeColors, setThemeColors] = useState(getThemeColors());

  useEffect(() => {
    setMounted(true);
    setThemeColors(getThemeColors());
  }, []);

  const theme = createTheme({
    primaryColor: 'telegram',
    colors: {
      telegram: [
        themeColors.buttonColor,
        themeColors.buttonColor,
        themeColors.buttonColor,
        themeColors.buttonColor,
        themeColors.buttonColor,
        themeColors.buttonColor,
        themeColors.buttonColor,
        themeColors.buttonColor,
        themeColors.buttonColor,
        themeColors.buttonColor,
      ],
    },
    components: {
      Paper: {
        defaultProps: {
          style: {
            backgroundColor: 'var(--app-bg-color)',
            color: 'var(--app-text-color)',
          },
        },
      },
      Modal: {
        defaultProps: {
          styles: {
            header: {
              backgroundColor: 'var(--app-bg-color)',
              color: 'var(--app-text-color)',
            },
            content: {
              backgroundColor: 'var(--app-bg-color)',
              color: 'var(--app-text-color)',
            },
          },
        },
      },
      Button: {
        defaultProps: {
          color: 'telegram',
        },
      },
      ActionIcon: {
        defaultProps: {
          color: 'telegram',
        },
      },
      Text: {
        defaultProps: {
          style: {
            color: 'var(--app-text-color)',
          },
        },
      },
      Title: {
        defaultProps: {
          style: {
            color: 'var(--app-text-color)',
          },
        },
      },
      Input: {
        defaultProps: {
          styles: {
            input: {
              backgroundColor: 'var(--app-bg-color)',
              color: 'var(--app-text-color)',
              borderColor: 'var(--app-hint-color)',
              '&:focus': {
                borderColor: 'var(--app-button-color)',
              },
            },
          },
        },
      },
      TextInput: {
        defaultProps: {
          styles: {
            input: {
              backgroundColor: 'var(--app-bg-color)',
              color: 'var(--app-text-color)',
              borderColor: 'var(--app-hint-color)',
              '&:focus': {
                borderColor: 'var(--app-button-color)',
              },
            },
            label: {
              color: 'var(--app-text-color)',
            },
          },
        },
      },
      Textarea: {
        defaultProps: {
          styles: {
            input: {
              backgroundColor: 'var(--app-bg-color)',
              color: 'var(--app-text-color)',
              borderColor: 'var(--app-hint-color)',
              '&:focus': {
                borderColor: 'var(--app-button-color)',
              },
            },
            label: {
              color: 'var(--app-text-color)',
            },
          },
        },
      },
      Select: {
        defaultProps: {
          styles: () => ({
            option: {
              backgroundColor: 'var(--app-bg-color)',
            },
            input: {
              backgroundColor: 'var(--app-bg-color)',
              color: 'var(--app-text-color)',
              borderColor: 'var(--app-hint-color)',
              '&:focus': {
                borderColor: 'var(--app-button-color)',
              },
              '&:hover': {
                borderColor: 'var(--app-button-color)',
              },
            },
            label: {
              color: 'var(--app-text-color)',
            },
            dropdown: {
              backgroundColor: 'var(--app-bg-color)',
              borderColor: 'var(--app-hint-color)',
            },
            item: {
              color: 'var(--app-text-color)',
              '&[data-selected]': {
                backgroundColor: 'var(--app-button-color)',
                color: 'var(--app-button-text-color)',
                '&:hover': {
                  backgroundColor: 'var(--app-button-color)',
                },
              },
              '&[data-hovered]': {
                backgroundColor: 'var(--app-hint-color)',
                opacity: 0.7,
              },
            },
          }),
        },
      },
    },
  });

  if (!mounted) {
    return null;
  }

  return (
    <MantineProvider
      theme={theme}
      defaultColorScheme="light"
    >
      <style jsx global>
        {`
        :root {
          --app-bg-color: ${themeColors.bgColor};
          --app-text-color: ${themeColors.textColor};
          --app-button-color: ${themeColors.buttonColor};
          --app-button-text-color: ${themeColors.buttonTextColor};
          --app-hint-color: ${themeColors.hintColor};
          --app-link-color: ${themeColors.linkColor};
        }

        body {
          background-color: var(--app-bg-color);
          color: var(--app-text-color);
        }

        .mantine-Paper-root,
        .mantine-Modal-content,
        .mantine-Modal-header {
        background-color: var(--app-bg-color) !important;
        color: var(--app-text-color) !important;
        }

        .mantine-Text-root,
        .mantine-Title-root {
          color: var(--app-text-color) !important;
        }
      `}
      </style>
      <Notifications />
      {children}
    </MantineProvider>
  );
}
