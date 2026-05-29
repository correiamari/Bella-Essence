import React, { useState } from 'react';
import {
	View,
	Text,
	TextInput,
	Image,
	Alert,
	StyleSheet,
	TouchableOpacity,
	KeyboardAvoidingView,
	Platform,
	useWindowDimensions,
	ImageBackground,
} from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { autenticacao } from '../config/firebaseConfig';

export default function TelaLogin({ navigation }) {
	const [email, setEmail] = useState('');
	const [senha, setSenha] = useState('');
	const { width, height } = useWindowDimensions();
	const logo = require('../assets/logoBellaEssence.png');
	const backgroundImage = require('../assets/fundo2.jpeg');
	const logoSize = Math.min(420, width * 0.78);

	const handleLogin = () => {
		if (!email || !senha) return Alert.alert('Erro', 'Preencha email e senha');
		signInWithEmailAndPassword(autenticacao, email, senha)
			.then(() => {})
			.catch((error) => Alert.alert('Erro ao entrar', error.message));
	};

	return (
		<ImageBackground
			source={backgroundImage}
			style={styles.screen}
			resizeMode="cover"
			imageStyle={{ marginTop: -50 }}
		>
			<KeyboardAvoidingView
				style={styles.keyboard}
				behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
			>
				<View style={styles.container}> 
					<View style={styles.centerContent}> 
						<Image
							source={logo}
							style={[
								styles.logo,
								{ width: logoSize, height: logoSize },
							]}
							accessibilityLabel="Logo Bella Essence"
						/>

						<View style={styles.formContainer}>
							<TextInput
								style={styles.input}
								placeholder="Email"
								placeholderTextColor="#B8956A"
								value={email}
								onChangeText={setEmail}
								keyboardType="email-address"
								autoCapitalize="none"
							/>
							<TextInput
								style={styles.input}
								placeholder="Senha"
								placeholderTextColor="#B8956A"
								value={senha}
								onChangeText={setSenha}
								secureTextEntry
							/>

							<TouchableOpacity style={styles.primaryButton} onPress={handleLogin}>
								<Text style={styles.primaryButtonText}>Entrar</Text>
							</TouchableOpacity>

							<TouchableOpacity
								style={styles.secondaryButton}
								onPress={() => navigation.navigate('Cadastro')}
							>
								<Text style={styles.secondaryButtonText}>Criar conta</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</KeyboardAvoidingView>
		</ImageBackground>
	);
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		margin: 0,
		padding: 0,
	},
	keyboard: {
		flex: 1,
		padding: 0,
		margin: 0,
	},
	container: {
		flex: 1,
		width: '100%',
		minHeight: '100%',
		alignItems: 'center',
		justifyContent: 'center',
		position: 'relative',
		overflow: 'hidden',
		padding: 0,
		margin: 0,
	},
	centerContent: {
		flex: 1,
		width: '100%',
		alignItems: 'center',
		justifyContent: 'center',
		zIndex: 2,
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
	formContainer: {
		width: '100%',
		maxWidth: '85%',
		paddingHorizontal: 16,
		alignItems: 'stretch',
		marginTop: 12,
		zIndex: 2,
	},
	input: {
		width: '100%',
		backgroundColor: '#FAF7F2',
		borderColor: '#CB9A5B',
		borderWidth: 1.2,
		borderRadius: 8,
		paddingVertical: 13,
		paddingHorizontal: 15,
		fontSize: 14,
		color: '#5C3325',
		marginBottom: 14,
		fontWeight: '400',
	},
	primaryButton: {
		width: '100%',
		backgroundColor: '#5C3325',
		borderRadius: 10,
		paddingVertical: 14,
		alignItems: 'center',
		marginTop: 16,
		shadowColor: 'rgba(92, 51, 37, 0.15)',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 3,
	},
	primaryButtonText: {
		color: '#FFFFFF',
		fontSize: 15,
		fontWeight: '600',
		letterSpacing: 0.5,
	},
	secondaryButton: {
		width: '100%',
		backgroundColor: '#F5EFE5',
		borderRadius: 10,
		paddingVertical: 14,
		alignItems: 'center',
		borderWidth: 1.2,
		borderColor: '#5C3325',
		marginTop: 12,
	},
	secondaryButtonText: {
		color: '#5C3325',
		fontSize: 15,
		fontWeight: '600',
		letterSpacing: 0.5,
	},
});
