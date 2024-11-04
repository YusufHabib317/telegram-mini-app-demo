window.Telegram = {
  WebApp: {
    ready: () => console.log('WebApp ready'),
    expand: () => console.log('WebApp expanded'),
    showPopup: ({ message }) => alert(message),
    switchInlineQuery: (query, chatTypes) => {
      console.log('Share query:', query);
      alert('Share functionality would be triggered here');
    },
    themeParams: {
      bg_color: '#ffffff',
      text_color: '#000000',
      button_color: '#3390ec',
      button_text_color: '#ffffff'
    }
  }
};