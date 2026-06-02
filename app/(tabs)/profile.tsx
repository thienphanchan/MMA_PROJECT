import { colors, fontSize, radius, spacing } from '@/constants/theme';
import { loginUser } from '@/services/authApi';
import { LoginFormData, LoginSchema } from '@/utils/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

// interface TechItem {
//   label: string;
//   description: string;
// }

// const TECH_STACK: TechItem[] = [
//   { label: 'Expo Router', description: 'File-based navigation' },
//   { label: 'React Native', description: 'Cross-platform UI framework' },
//   { label: 'TypeScript', description: 'Static type checking' },
//   { label: 'Zustand', description: 'Global state management' },
//   { label: 'Axios', description: 'HTTP client for API calls' },
//   { label: 'AsyncStorage', description: 'Persistent local storage' },
//   { label: 'React Hook Form', description: 'Form state management' },
//   { label: 'Zod', description: 'Schema-based validation' },
// ];

interface AuthSession {
  username: string;
  token: string;
}

export default function ProfileScreen(): React.JSX.Element {
  const [session, setSession] = useState<AuthSession | null>(null);
  const [authError, setAuthError] = useState<string | null>(null);
  const [isAuthenticating, setIsAuthenticating] = useState<boolean>(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      username: 'mor_2314',
      password: '83r5^_',
    },
  });

  const onSubmit = async (data: LoginFormData): Promise<void> => {
    setIsAuthenticating(true);
    setAuthError(null);

    try {
      const response = await loginUser(data);
      const nextSession = {
        username: data.username,
        token: response.token,
      };
      setSession(nextSession);
      Alert.alert(
        'Đăng nhập thành công',
        `Xin chào ${nextSession.username}\nToken: ${nextSession.token.slice(0, 10)}...`
      );
      reset(data);
    } catch (error) {
      setAuthError(error instanceof Error ? error.message : 'Authentication failed');
    } finally {
      setIsAuthenticating(false);
    }
  };

  const handleLogout = (): void => {
    setSession(null);
    setAuthError(null);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.avatarContainer}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>👤</Text>
        </View>
        <Text style={styles.studentName}>Student Name</Text>
        <Text style={styles.studentId}>Student ID: SE193355</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Authentication</Text>
        <Text style={styles.authHint}>
          Demo account: username <Text style={styles.authHintStrong}>mor_2314</Text>, password <Text style={styles.authHintStrong}>83r5^_</Text>
        </Text>

        {session ? (
          <View style={styles.sessionBox}>
            <Text style={styles.sessionTitle}>Logged in as {session.username}</Text>
            <Text style={styles.sessionToken} numberOfLines={1}>
              Token: {session.token}
            </Text>
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
              <Text style={styles.logoutButtonText}>Logout</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <Text style={styles.fieldLabel}>Username</Text>
            <Controller
              control={control}
              name="username"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={[styles.input, errors.username ? styles.inputError : null]}
                  placeholder="Enter username"
                  placeholderTextColor={colors.textMuted}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  autoCapitalize="none"
                />
              )}
            />
            {errors.username && <Text style={styles.errorText}>{errors.username.message}</Text>}

            <Text style={styles.fieldLabel}>Password</Text>
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={[styles.input, errors.password ? styles.inputError : null]}
                  placeholder="Enter password"
                  placeholderTextColor={colors.textMuted}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  secureTextEntry
                />
              )}
            />
            {errors.password && <Text style={styles.errorText}>{errors.password.message}</Text>}

            {authError && <Text style={styles.errorText}>{authError}</Text>}

            <TouchableOpacity
              style={[styles.loginButton, isAuthenticating ? styles.loginButtonDisabled : null]}
              onPress={handleSubmit(onSubmit)}
              disabled={isAuthenticating}
            >
              <Text style={styles.loginButtonText}>
                {isAuthenticating ? 'Signing in...' : 'Sign In'}
              </Text>
            </TouchableOpacity>
          </>
        )}
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Project Info</Text>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Project</Text>
          <Text style={styles.infoValue}>EcommerceApp</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Course</Text>
          <Text style={styles.infoValue}>SE193355</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Type</Text>
          <Text style={styles.infoValue}>Academic Project</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Platform</Text>
          <Text style={styles.infoValue}>React Native / Expo</Text>
        </View>
      </View>

      {/* <View style={styles.card}>
        <Text style={styles.cardTitle}>Tech Stack</Text>
        {TECH_STACK.map((tech: TechItem) => (
          <View key={tech.label} style={styles.techRow}>
            <View style={styles.techBadge}>
              <Text style={styles.techBadgeText}>{tech.label}</Text>
            </View>
            <Text style={styles.techDescription}>{tech.description}</Text>
          </View>
        ))}
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Built with React Native & Expo</Text>
      </View> */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  avatarContainer: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  avatarText: {
    fontSize: 40,
  },
  studentName: {
    fontSize: fontSize.xl,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  studentId: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  cardTitle: {
    fontSize: fontSize.md,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: spacing.md,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  authHint: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginBottom: spacing.md,
    lineHeight: 20,
  },
  authHintStrong: {
    fontWeight: '700',
    color: colors.text,
  },
  fieldLabel: {
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
  inputError: {
    borderColor: colors.danger,
  },
  errorText: {
    fontSize: fontSize.sm,
    color: colors.danger,
    marginTop: spacing.xs,
  },
  loginButton: {
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    alignItems: 'center',
    paddingVertical: spacing.md,
    marginTop: spacing.md,
  },
  loginButtonDisabled: {
    opacity: 0.7,
  },
  loginButtonText: {
    color: colors.surface,
    fontSize: fontSize.md,
    fontWeight: '700',
  },
  sessionBox: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    padding: spacing.md,
    backgroundColor: colors.background,
  },
  sessionTitle: {
    fontSize: fontSize.md,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  sessionToken: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginBottom: spacing.md,
  },
  logoutButton: {
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: colors.danger,
  },
  logoutButtonText: {
    color: colors.danger,
    fontSize: fontSize.sm,
    fontWeight: '700',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  infoLabel: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  infoValue: {
    fontSize: fontSize.md,
    color: colors.text,
    fontWeight: '600',
  },
  techRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  techBadge: {
    backgroundColor: colors.primaryLight,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: radius.sm,
    marginRight: spacing.md,
    minWidth: 120,
  },
  techBadgeText: {
    fontSize: fontSize.sm,
    fontWeight: '700',
    color: colors.primary,
  },
  techDescription: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    flex: 1,
  },
  footer: {
    alignItems: 'center',
    paddingTop: spacing.md,
  },
  footerText: {
    fontSize: fontSize.sm,
    color: colors.textMuted,
  },
});