import { colors, fontSize, radius, spacing } from '@/constants/theme';
import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

interface TechItem {
  label: string;
  description: string;
}

const TECH_STACK: TechItem[] = [
  { label: 'Expo Router', description: 'File-based navigation' },
  { label: 'React Native', description: 'Cross-platform UI framework' },
  { label: 'TypeScript', description: 'Static type checking' },
  { label: 'Zustand', description: 'Global state management' },
  { label: 'Axios', description: 'HTTP client for API calls' },
  { label: 'AsyncStorage', description: 'Persistent local storage' },
  { label: 'React Hook Form', description: 'Form state management' },
  { label: 'Zod', description: 'Schema-based validation' },
];

export default function ProfileScreen(): React.JSX.Element {
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