import { FC, memo, useMemo } from 'react';
import { Pressable } from 'react-native';
import styled from '@emotion/native';

import { IItem } from '../../App';

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
  onLongPress: () => void;
}

const GalleryItem: FC<IGalleryItem> = ({ item, size, onLongPress }) => {
  const source = useMemo(() => ({ uri: item.uri }), [item.uri]);

  return (
    <Pressable onLongPress={onLongPress}>
      <StyledImage size={size} source={source} />
    </Pressable>
  );
};

export default memo(GalleryItem);
