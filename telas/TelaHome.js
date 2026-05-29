import React from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { signOut } from 'firebase/auth';
import { autenticacao } from '../config/firebaseConfig';

export default function TelaHome({ navigation }) {
	const handleSignOut = () => {
		signOut(autenticacao)
			.then(() => {})
			.catch((error) => Alert.alert('Erro ao sair', error.message));
	};

	return (
		<View style={styles.container}>
			<Text style={styles.headerText}>Cadastro Completo</Text>
			<TouchableOpacity style={styles.primaryButton} onPress={handleSignOut}>
				<Text style={styles.primaryButtonText}>Sair</Text>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
	headerText: {
		color: '#5C3325',
		fontSize: 22,
		fontWeight: '700',
		marginBottom: 5,
	},
	primaryButton: {
		width: '50%',
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
});
