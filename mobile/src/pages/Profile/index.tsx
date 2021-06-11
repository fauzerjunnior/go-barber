import React, { useCallback, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';

import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

import {
  KeyboardAvoidingView,
  Platform,
  View,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';

import * as Yup from 'yup';
import Icon from 'react-native-vector-icons/Feather';
import getValidationErrors from '../../utils/getValidationErros';

import api from '../../services/api';

import {
  Container,
  Title,
  UserAvatarButton,
  UserAvatar,
  BackButton,
} from './styles';
import { useAuth } from '../../hooks/auth';

import Input from '../../components/Input';
import Button from '../../components/Button';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

const Profile: React.FC = () => {
  const { user } = useAuth();

  const navigation = useNavigation();
  const formRef = useRef<FormHandles>(null);

  const emailInputRef = useRef<TextInput>(null);
  const oldPasswordInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const confirmPasswordInputRef = useRef<TextInput>(null);

  const handleSignUp = useCallback(
    async (data: SignUpFormData) => {
      try {
        formRef.current.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um email válido'),
          old_password: Yup.string().required('Senha obrigatória'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('/users', data);

        Alert.alert(
          'Cadastro realizado com sucesso!',
          'Você já pode fazer login na aplicação.',
        );

        navigation.goBack();
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          if (formRef.current) formRef.current.setErrors(errors);
        }

        Alert.alert(
          'Erro na autenticação',
          'Ocorreu um erro ao criar a conta, cheque os campos.',
        );
      }
    },
    [navigation],
  );

  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, []);

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled>
        <ScrollView
          contentContainerStyle={{ flex: 1 }}
          keyboardShouldPersistTaps="handled">
          <Container>
            <BackButton onPress={handleGoBack}>
              <Icon name="chevron-left" size={24} color="#999591" />
            </BackButton>

            <UserAvatarButton onPress={() => {}}>
              <UserAvatar source={{ uri: user.avatar_url }} />
            </UserAvatarButton>

            <View>
              <Title>Meu perfil</Title>
            </View>

            <Form ref={formRef} onSubmit={handleSignUp}>
              <Input
                name="name"
                icon="user"
                placeholder="Nome"
                autoCorrect={false}
                autoCapitalize="words"
                returnKeyType="next"
                onSubmitEditing={() => {
                  emailInputRef.current?.focus();
                }}
              />

              <Input
                ref={emailInputRef}
                name="email"
                icon="mail"
                placeholder="E-mail"
                keyboardType="email-address"
                autoCorrect={false}
                autoCapitalize="none"
                returnKeyType="next"
                onSubmitEditing={() => {
                  oldPasswordInputRef.current?.focus();
                }}
              />

              <Input
                ref={oldPasswordInputRef}
                name="old_password"
                icon="lock"
                placeholder="Senha atual"
                secureTextEntry
                returnKeyType="next"
                containerStyle={{ marginTop: 16 }}
                onSubmitEditing={() => {
                  passwordInputRef.current.focus();
                }}
              />

              <Input
                ref={passwordInputRef}
                name="password"
                icon="lock"
                placeholder="Nova atual"
                secureTextEntry
                returnKeyType="next"
                onSubmitEditing={() => {
                  confirmPasswordInputRef.current.focus();
                }}
              />

              <Input
                ref={confirmPasswordInputRef}
                name="password_confirmation"
                icon="lock"
                placeholder="Confirmar senha"
                secureTextEntry
                returnKeyType="send"
                onSubmitEditing={() => {
                  formRef.current.submitForm();
                }}
              />

              <Button
                onPress={() => {
                  formRef.current.submitForm();
                }}>
                Confirmar mudanças
              </Button>
            </Form>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

export default Profile;
