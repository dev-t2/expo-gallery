import { FC, memo, useMemo } from 'react';
import styled from '@emotion/native';

const StyledImage = styled.Image({
  width: 200,
  height: 200,
});

interface IGalleryImage {
  uri: string;
}

const GalleryImage: FC<IGalleryImage> = ({ uri }) => {
  const source = useMemo(() => ({ uri }), [uri]);

  return <StyledImage source={source} />;
};

export default memo(GalleryImage);
