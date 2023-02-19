import { FC, memo, useMemo } from 'react';
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  StyleProp,
  TextInputProps,
  ViewStyle,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from '@emotion/native';

const Container = styled(KeyboardAvoidingView)({
  flex: 1,
});

const InputContainer = styled(SafeAreaView)({
  flex: 1,
  justifyContent: 'flex-end',
});

const StyledTextInput = styled.TextInput({
  backgroundColor: '#999',
});

interface ITextInputModal extends TextInputProps {
  isVisible?: boolean;
  value?: string;
  onChangeText?: (text: string) => void;
  onSubmit?: () => void;
}

const TextInputModal: FC<ITextInputModal> = ({
  isVisible,
  value,
  onChangeText,
  onSubmit,
  ...props
}) => {
  const style = useMemo<StyleProp<ViewStyle>>(() => ({ flex: 1 }), []);

  const behavior = useMemo(() => (Platform.OS === 'ios' ? 'padding' : 'height'), []);

  return (
    <Modal animationType="fade" transparent visible={isVisible}>
      <Container style={style} behavior={behavior}>
        <InputContainer>
          <StyledTextInput
            {...props}
            autoCapitalize="none"
            autoCorrect={false}
            textContentType="none"
            placeholder="앨범 이름을 입력해 주세요"
            value={value}
            onChangeText={onChangeText}
            onSubmitEditing={onSubmit}
          />
        </InputContainer>
      </Container>
    </Modal>
  );
};

export default memo(TextInputModal);
