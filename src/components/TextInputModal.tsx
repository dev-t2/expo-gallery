import { FC, memo, useCallback, useMemo, useRef } from 'react';
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  StyleProp,
  TextInput,
  TextInputProps,
  ViewStyle,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from '@emotion/native';

const Container = styled(KeyboardAvoidingView)({
  flex: 1,
});

const StyledPressable = styled.Pressable({
  flex: 1,
});

const InputContainer = styled(SafeAreaView)({
  flex: 1,
  justifyContent: 'flex-end',
});

const StyledTextInput = styled.TextInput(({ theme }) => ({
  paddingVertical: 10,
  paddingHorizontal: 15,
  borderTopWidth: 0.5,
  borderTopColor: theme.colors.gray.light,
}));

interface ITextInputModal extends TextInputProps {
  isVisible?: boolean;
  value?: string;
  onChangeText?: (text: string) => void;
  onSubmit?: () => void;
  onClose?: () => void;
}

const TextInputModal: FC<ITextInputModal> = ({
  isVisible,
  value,
  onChangeText,
  onSubmit,
  onClose,
  ...props
}) => {
  const textInputRef = useRef<TextInput>(null);

  const style = useMemo<StyleProp<ViewStyle>>(() => ({ flex: 1 }), []);

  const behavior = useMemo(() => (Platform.OS === 'ios' ? 'padding' : undefined), []);

  const onShow = useCallback(() => {
    setTimeout(() => {
      textInputRef.current?.focus();
    }, 100);
  }, []);

  return (
    <Modal animationType="fade" transparent visible={isVisible} onShow={onShow}>
      <Container style={style} behavior={behavior}>
        <StyledPressable onPress={onClose}>
          <InputContainer>
            <StyledTextInput
              {...props}
              ref={textInputRef}
              autoCapitalize="none"
              autoCorrect={false}
              textContentType="none"
              placeholder="앨범 이름을 입력해 주세요"
              value={value}
              onChangeText={onChangeText}
              onSubmitEditing={onSubmit}
            />
          </InputContainer>
        </StyledPressable>
      </Container>
    </Modal>
  );
};

export default memo(TextInputModal);
