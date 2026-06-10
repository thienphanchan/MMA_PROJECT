import HeaderBackButton from '@/components/HeaderBackButton';
import HeaderCartButton from '@/components/HeaderCartButton';
import { colors } from '@/constants/theme';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import { Stack, useRouter, useSegments } from 'expo-router';
import React, { useEffect } from 'react';

function RouteGuard(): React.JSX.Element {
  const { token, isLoading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;
    const firstSegment = segments[0] as string;
    const inAuth = firstSegment === '(auth)';

    if (!token && !inAuth) {
      router.replace('/(auth)/login' as any);
    } else if (token && inAuth) {
      router.replace('/(tabs)' as any);
    }
  }, [token, isLoading, segments]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="product/[id]"
        options={{
          headerShown: true,
          title: 'Product Detail',
          headerTitleAlign: 'center',
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.text,
          headerShadowVisible: false,
          headerLeft: () => <HeaderBackButton />,
          headerRight: () => <HeaderCartButton />,
        }}
      />
      <Stack.Screen
        name="checkout"
        options={{
          headerShown: true,
          title: 'Checkout',
          headerTitleAlign: 'center',
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.text,
          headerShadowVisible: false,
          headerLeft: () => <HeaderBackButton />,
          headerRight: () => <HeaderCartButton />,
        }}
      />
    </Stack>
  );
}

export default function RootLayout(): React.JSX.Element {
  return (
    <AuthProvider>
      <RouteGuard />
    </AuthProvider>
  );
}