import { FC, memo, useMemo } from 'react';
import styled from '@emotion/native';

import { IItem } from '../../App';

interface IContainer {
  size: number;
}

const Container = styled.View<IContainer>(({ theme, size }) => ({
  width: size,
  height: size,
  backgroundColor: theme.colors.gray.light,
}));

const StyledPressable = styled.Pressable({
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
});

const StyledText = styled.Text({
  fontSize: 48,
  fontWeight: '100',
});

interface IStyledImage {
  size: number;
}

const StyledImage = styled.Image<IStyledImage>(({ size }) => ({
  width: size,
  height: size,
}));

interface IGalleryItem {
  item: IItem;
  size: number;
  onPress: () => void;
  onLongPress: () => void;
}

const GalleryItem: FC<IGalleryItem> = ({ item, size, onPress, onLongPress }) => {
  const isButton = useMemo(() => item.id === -1, [item.id]);
  const source = useMemo(() => ({ uri: item.uri }), [item.uri]);

  return (
    <Container size={size}>
      {isButton ? (
        <StyledPressable onPress={onPress}>
          <StyledText>+</StyledText>
        </StyledPressable>
      ) : (
        <StyledPressable onLongPress={onLongPress}>
          <StyledImage size={size} source={source} />
        </StyledPressable>
      )}
    </Container>
  );
};

export default memo(GalleryItem);
