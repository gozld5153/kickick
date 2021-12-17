import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";
import { store } from "../src/store";
import GlobalStyles from "../src/commons/styles/GlobalStyles";
import { light, dark } from "../src/commons/styles/theme";

const theme = light; // 테마 환경에 맞는 테마 컬러 가져오기.

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const decorators = [
  (Story) => (
    <Provider store={store}>
      <GlobalStyles />
      <ThemeProvider theme={theme}>
        <Story />
      </ThemeProvider>
    </Provider>
  ),
];
