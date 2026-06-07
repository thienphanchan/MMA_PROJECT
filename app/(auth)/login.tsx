import { colors, fontSize, radius, spacing } from '@/constants/theme';
import { useAuth } from '@/context/AuthContext';
import { loginUser } from '@/services/authApi';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

export default function LoginScreen() {
    const { login } = useAuth();
    const router = useRouter();

    const [username, setUsername] = useState('mor_2314');
    const [password, setPassword] = useState('83r5^_');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        if (!username.trim() || !password.trim()) {
            setError('Vui lòng nhập đầy đủ thông tin.');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const res = await loginUser({ username: username.trim(), password });
            await login(res.token, username.trim());
            router.replace('/(tabs)');
        } catch (e) {
            setError(e instanceof Error ? e.message : 'Đăng nhập thất bại.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.flex}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <ScrollView
                contentContainerStyle={styles.container}
                keyboardShouldPersistTaps="handled"
            >
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.logo}>🛍️</Text>
                    <Text style={styles.title}>EcommerceApp</Text>
                    <Text style={styles.subtitle}>Đăng nhập để tiếp tục</Text>
                </View>

                {/* Form */}
                <View style={styles.form}>
                    <Text style={styles.label}>Username</Text>
                    <TextInput
                        style={[styles.input, error ? styles.inputError : null]}
                        value={username}
                        onChangeText={setUsername}
                        placeholder="Nhập username"
                        placeholderTextColor={colors.textMuted}
                        autoCapitalize="none"
                        autoCorrect={false}
                    />

                    <Text style={styles.label}>Password</Text>
                    <TextInput
                        style={[styles.input, error ? styles.inputError : null]}
                        value={password}
                        onChangeText={setPassword}
                        placeholder="Nhập password"
                        placeholderTextColor={colors.textMuted}
                        secureTextEntry
                    />

                    {error && <Text style={styles.errorText}>{error}</Text>}

                    <Text style={styles.hint}>
                        Demo: <Text style={styles.hintBold}>mor_2314</Text> / <Text style={styles.hintBold}>83r5^_</Text>
                    </Text>

                    <TouchableOpacity
                        style={[styles.button, loading && styles.buttonDisabled]}
                        onPress={handleLogin}
                        disabled={loading}
                        activeOpacity={0.8}
                    >
                        {loading
                            ? <ActivityIndicator color={colors.white} />
                            : <Text style={styles.buttonText}>Đăng nhập</Text>
                        }
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    flex: { flex: 1, backgroundColor: colors.background },
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        padding: spacing.lg,
    },
    header: {
        alignItems: 'center',
        marginBottom: spacing.xl,
    },
    logo: { fontSize: 56, marginBottom: spacing.sm },
    title: {
        fontSize: fontSize.xxl,
        fontWeight: '700',
        color: colors.text,
        marginBottom: spacing.xs,
    },
    subtitle: {
        fontSize: fontSize.md,
        color: colors.textSecondary,
    },
    form: {
        backgroundColor: colors.surface,
        borderRadius: radius.md,
        padding: spacing.lg,
        borderWidth: 1,
        borderColor: colors.border,
    },
    label: {
        fontSize: fontSize.sm,
        fontWeight: '600',
        color: colors.textSecondary,
        marginBottom: spacing.xs,
        marginTop: spacing.sm,
    },
    input: {
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: radius.sm,
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm + 2,
        fontSize: fontSize.md,
        color: colors.text,
        backgroundColor: colors.background,
    },
    inputError: { borderColor: colors.danger },
    errorText: {
        fontSize: fontSize.sm,
        color: colors.danger,
        marginTop: spacing.sm,
    },
    hint: {
        fontSize: fontSize.sm,
        color: colors.textMuted,
        marginTop: spacing.md,
        marginBottom: spacing.sm,
    },
    hintBold: {
        fontWeight: '700',
        color: colors.textSecondary,
    },
    button: {
        backgroundColor: colors.accent,
        paddingVertical: spacing.md,
        borderRadius: radius.md,
        alignItems: 'center',
        marginTop: spacing.sm,
    },
    buttonDisabled: { opacity: 0.7 },
    buttonText: {
        color: colors.white,
        fontSize: fontSize.md,
        fontWeight: '700',
    },
});