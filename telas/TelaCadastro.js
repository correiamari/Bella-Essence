import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  Image,
  ImageBackground,
  Alert,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  useWindowDimensions,
} from 'react-native';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { autenticacao } from '../config/firebaseConfig';

export default function TelaCadastro({ navigation }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const { width } = useWindowDimensions();
  const logo = require('../assets/logoBellaEssence.png');
  const backgroundImage = require('../assets/fundo2.jpeg');
  const logoSize = Math.min(140, width * 0.3);

  const fazerCadastro = async () => {
    if (!nome || !email || !senha) {
      return Alert.alert('Erro', 'Preencha todos os campos');
    }

    try {
      const usuarioCriado = await createUserWithEmailAndPassword(autenticacao, email, senha);
      await updateProfile(usuarioCriado.user, {
        displayName: nome,
      });
      navigation.navigate('Login');
    } catch (erro) {
      const mensagem = erro?.message || 'Erro ao cadastrar. Tente novamente.';
      setErro(mensagem);
      Alert.alert('Erro ao cadastrar', mensagem);
    }
  };

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.screenWrapper}>
        <ImageBackground
          source={backgroundImage}
          style={styles.background}
          imageStyle={styles.backgroundImage}
          resizeMode="cover"
        >
          <KeyboardAvoidingView
            style={styles.keyboard}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          >
            <View style={styles.container}>
              <View style={styles.card}>
                <Image source={logo} style={[styles.logo, { width: logoSize, height: logoSize }]} />

              <TextInput
                style={styles.input}
                value={nome}
                onChangeText={setNome}
                placeholder="Nome"
                placeholderTextColor="#9A816E"
                autoCapitalize="words"
              />
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="Email"
                placeholderTextColor="#9A816E"
                keyboardType="email-address"
                autoCapitalize="none"
              />
              <TextInput
                style={styles.input}
                value={senha}
                onChangeText={setSenha}
                placeholder="Senha"
                placeholderTextColor="#9A816E"
                secureTextEntry
              />

              {erro ? <Text style={styles.error}>{erro}</Text> : null}

              <TouchableOpacity style={styles.primaryButton} onPress={fazerCadastro}>
                <Text style={styles.primaryButtonText}>Cadastrar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.secondaryButton} onPress={() => navigation.navigate('Login')}>
                <Text style={styles.secondaryButtonText}>Voltar ao login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#5C3325',
  },
  screenWrapper: {
    flex: 1,
    paddingVertical: 0,
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  backgroundImage: {
    width: '100%',
    height: '115%',
    top: -95,
  },
  keyboard: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  card: {
    width: '100%',
    maxWidth: 420,
    backgroundColor: 'rgba(248, 240, 230, 0.94)',
    borderRadius: 34,
    paddingVertical: 34,
    paddingHorizontal: 28,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 12 },
    shadowRadius: 18,
    elevation: 14,
    zIndex: 1,
  },
  brand: {
    fontSize: 32,
    fontWeight: '700',
    color: '#5C3325',
    letterSpacing: 6,
    marginBottom: 6,
  },
  subtitle: {
    textAlign: 'center',
    fontSize: 15,
    color: '#9A7862',
    letterSpacing: 1.5,
    marginBottom: 28,
    paddingHorizontal: 4,
  },
  logo: {
    alignSelf: 'center',
		resizeMode: 'contain',
		marginBottom: 24,
		zIndex: 100,
		width: 300,
		height: 300,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 3 },
		shadowOpacity: 0.12,
		shadowRadius: 6,
		elevation: 4,
  },
  input: {
    width: '100%',
    backgroundColor: '#FFF6ED',
    borderColor: '#D7B68D',
    borderWidth: 1,
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 20,
    fontSize: 16,
    color: '#5C3325',
    marginBottom: 16,
  },
  primaryButton: {
    width: '100%',
    backgroundColor: '#5C3325',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 4,
  },
  primaryButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 1,
  },
  secondaryButton: {
    width: '100%',
    backgroundColor: '#F4E8D8',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#5C3325',
    marginTop: 14,
  },
  secondaryButtonText: {
    color: '#5C3325',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 1,
  },
  error: {
    color: '#B91C1C',
    marginTop: 10,
    fontWeight: '600',
  },
});