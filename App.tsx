import { memo, useCallback, useMemo, useState } from 'react';
import { Button, FlatList, ListRenderItem, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import * as ImagePicker from 'expo-image-picker';
import { ThemeProvider } from '@emotion/react';
import styled from '@emotion/native';

import theme from './src/theme';
import { GalleryImage } from './src/components';

const Container = styled(SafeAreaView)({
  flex: 1,
  backgroundColor: '#fff',
});

const App = () => {
  const { width } = useWindowDimensions();

  const [images, setImages] = useState<string[]>([]);

  const imageSize = useMemo(() => width / 3, [width]);

  const pickImage = useCallback(async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImages((prevState) => [...prevState, result.assets[0].uri]);
    }
  }, []);

  const keyExtractor = useCallback((_: string, index: number) => `${index}`, []);

  const renderItem = useCallback<ListRenderItem<string>>(
    ({ item }) => {
      return <GalleryImage size={imageSize} uri={item} />;
    },
    [imageSize]
  );

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <StatusBar style="auto" />

        <Button title="Pick an image from camera roll" onPress={pickImage} />

        <FlatList
          numColumns={3}
          data={images}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
        />
      </Container>
    </ThemeProvider>
  );
};

export default memo(App);
