import { FC, memo, useMemo } from 'react';
import styled from '@emotion/native';

interface IStyledImage {
  size: number;
}

const StyledImage = styled.Image<IStyledImage>(({ size }) => ({
  width: size,
  height: size,
}));

interface IGalleryImage {
  size: number;
  uri: string;
}

const GalleryImage: FC<IGalleryImage> = ({ size, uri }) => {
  const source = useMemo(() => ({ uri }), [uri]);

  return <StyledImage size={size} source={source} />;
};

export default memo(GalleryImage);
