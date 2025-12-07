import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // For Facebook
import AntDesign from 'react-native-vector-icons/AntDesign'; // For Google
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'; // For Apple
import { loginUser } from '../api/authApi';
import { saveToken } from '../store/authSlice';
import { useAppDispatch } from '../store';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secure, setSecure] = useState(true);
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Email and password are required');
      return;
    }

    setLoading(true);

    try {
      const res = await loginUser(email, password);
      console.log('Login success:', res.data);

      const token = res?.data?.token;
      if (token) {
        dispatch(saveToken(token));
      }

      Alert.alert('Success', 'Logged in!');
    } catch (err) {
      Alert.alert('Login Failed', err?.response?.data?.message || 'Try again');
    }

    setLoading(false);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: '#fff' }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.logo}>Pliē</Text>

        <View style={styles.imagePlaceholder}>
          <Text style={{ fontSize: 30 }}>🖼️</Text>
        </View>

        {/* FORM CONTAINER */}
        <View style={styles.formCard}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            placeholder="email@email.com"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />

          <Text style={styles.label}>Password</Text>
          <View style={styles.passwordRow}>
            <TextInput
              placeholder="Password"
              secureTextEntry={secure}
              style={[styles.input, { flex: 1 }]}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity
              onPress={() => setSecure(!secure)}
              style={styles.eyeBtn}
            >
              <Text>{secure ? '👁️' : '🙈'}</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={{ alignSelf: 'flex-end' }}>
            <Text style={styles.forgotText}>Forgot Password?</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.signInBtn} onPress={handleLogin}>
            <Text style={styles.signInText}>
              {loading ? 'Signing In...' : 'Sign In'}
            </Text>
          </TouchableOpacity>

          <View style={styles.registerRow}>
            <Text>Not a member? </Text>
            <TouchableOpacity>
              <Text style={styles.signUpText}>Sign Up here</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* SOCIAL LOGIN */}
        <Text style={{ marginTop: 20, color: '#666' }}>or Sign in with</Text>

        <View style={styles.socialRow}>
          <View style={[styles.socialBox, { backgroundColor: '#fff' }]}>
            <AntDesign name="google" size={24} color="#DB4437" />
          </View>
          <View style={[styles.socialBox, { backgroundColor: '#000' }]}>
            <MaterialCommunityIcons name="apple" size={24} color="#fff" />
          </View>
          <View style={[styles.socialBox, { backgroundColor: '#1877F2' }]}>
            <Icon name="facebook" size={24} color="#fff" />
          </View>
        </View>

        <TouchableOpacity style={{ marginTop: 30 }}>
          <Text style={{ color: '#666' }}>Enter as Guest</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 20,
    paddingTop: 40,
  },
  logo: {
    fontSize: 50,
    fontWeight: '700',
    marginBottom: 20,
  },
  imagePlaceholder: {
    width: '100%',
    height: 180,
    backgroundColor: '#ddd',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  formCard: {
    width: '100%',
    backgroundColor: '#f9f9f9',
    marginTop: -40,
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  label: {
    marginLeft: 4,
    marginTop: 10,
  },
  input: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    marginTop: 6,
  },
  passwordRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  eyeBtn: {
    padding: 10,
  },
  forgotText: {
    color: '#777',
    marginTop: 5,
    fontSize: 12,
  },
  signInBtn: {
    backgroundColor: '#0aaf60',
    padding: 15,
    borderRadius: 10,
    marginTop: 15,
    alignItems: 'center',
  },
  signInText: {
    color: '#fff',
    fontWeight: '600',
  },
  registerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 15,
  },
  signUpText: {
    color: '#0a84ff',
    fontWeight: '600',
  },
  socialRow: {
    flexDirection: 'row',
    marginTop: 10,
  },
  socialBox: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
