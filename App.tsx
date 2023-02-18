import { memo } from 'react';
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider } from '@emotion/react';
import styled from '@emotion/native';

import theme from './src/theme';

const Container = styled.View({
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#fff',
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <StatusBar style="auto" />
      </Container>
    </ThemeProvider>
  );
};

export default memo(App);
