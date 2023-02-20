import { memo, useCallback, useState } from 'react';
import { Alert, FlatList, ListRenderItem, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import * as ImagePicker from 'expo-image-picker';
import { ThemeProvider } from '@emotion/react';
import styled from '@emotion/native';

import theme from './src/theme';
import { DropdownPicker, GalleryItem, TextInputModal } from './src/components';

const Container = styled(SafeAreaView)({
  flex: 1,
  backgroundColor: '#fff',
});

export interface IAlbum {
  id: number;
  title: string;
}

export interface IItem {
  id: number;
  uri: string;
}

const App = () => {
  const { width } = useWindowDimensions();

  const [albums, setAlbums] = useState([{ id: 0, title: '기본' }]);
  const [selectedAlbum] = useState<IAlbum>({ id: 0, title: '기본' });
  const [isVisible, setIsVisible] = useState(false);
  const [albumName, setAlbumName] = useState('');
  const [images, setImages] = useState<IItem[]>([{ id: -1, uri: '' }]);

  const onAddAlbum = useCallback(() => {
    setIsVisible(true);
  }, []);

  const onChangeAlbumName = useCallback((albumName: string) => {
    setAlbumName(albumName);
  }, []);

  const onSubmitAlbumName = useCallback(() => {
    if (albumName) {
      setAlbums((prevState) => {
        const id = prevState[prevState.length - 1].id + 1;

        return [...prevState, { id, title: albumName }];
      });
      setIsVisible(false);
      setAlbumName('');
    }
  }, [albumName]);

  const onCloseModal = useCallback(() => {
    setIsVisible(false);
    setAlbumName('');
  }, []);

  const keyExtractor = useCallback((image: IItem) => `${image.id}`, []);

  const renderItem = useCallback<ListRenderItem<IItem>>(
    ({ item }) => {
      const onOpenGallery = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });

        if (!result.canceled) {
          setImages((prevState) => {
            const id = prevState[prevState.length - 1].id + 1;
            const uri = result.assets[0].uri;

            return [...prevState, { id, uri }];
          });
        }
      };

      const onDeleteImage = () => {
        Alert.alert('이미지를 삭제하시겠습니까?', '', [
          { style: 'cancel', text: '아니요' },
          {
            text: '네',
            onPress: () => {
              setImages((prevState) => prevState.filter((state) => state.id !== item.id));
            },
          },
        ]);
      };

      return (
        <GalleryItem
          item={item}
          size={width / 3}
          onPress={onOpenGallery}
          onLongPress={onDeleteImage}
        />
      );
    },
    [width]
  );

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <StatusBar style="auto" />

        <DropdownPicker albums={albums} selectedAlbum={selectedAlbum} onAddAlbum={onAddAlbum} />

        <TextInputModal
          isVisible={isVisible}
          value={albumName}
          onChangeText={onChangeAlbumName}
          onSubmit={onSubmitAlbumName}
          onClose={onCloseModal}
        />

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
