import { FC, memo } from 'react';
import styled from '@emotion/native';

import { IAlbum } from '../../App';

const Container = styled.Pressable({
  justifyContent: 'center',
  alignItems: 'center',
  paddingVertical: 10,
});

const Title = styled.Text({
  fontSize: 16,
  fontWeight: 'bold',
});

const StyledPressable = styled.Pressable({
  position: 'absolute',
  right: 20,
});

const StyledText = styled.Text({
  fontSize: 12,
});

interface IDropdownPicker {
  albums: IAlbum[];
  selectedAlbum: IAlbum;
  onAddAlbum: () => void;
}

const DropdownPicker: FC<IDropdownPicker> = ({ selectedAlbum, onAddAlbum }) => {
  return (
    <Container>
      <Title>{selectedAlbum.title}</Title>

      <StyledPressable onPress={onAddAlbum}>
        <StyledText>앨범 추가</StyledText>
      </StyledPressable>
    </Container>
  );
};

export default memo(DropdownPicker);
