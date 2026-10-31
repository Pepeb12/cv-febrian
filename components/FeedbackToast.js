/**
 * Production Feedback Toast Banner
 * Memberikan umpan balik instan (Success, Error, Info) dengan animasi halus dan auto-dismiss
 */

import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SPACING } from '../theme';

export default function FeedbackToast({ message, type = 'info', onDismiss, duration = 3500 }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(-20)).current;

  useEffect(() => {
    if (!message) return;

    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start();

    const timer = setTimeout(() => {
      handleClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [message]);

  const handleClose = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: -20,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      if (onDismiss) onDismiss();
    });
  };

  if (!message) return null;

  const isSuccess = type === 'success';
  const isError = type === 'error';
  const isWarning = type === 'warning';

  let bgColor = '#0284C7';
  let iconName = 'information-outline';

  if (isSuccess) {
    bgColor = '#10B981';
    iconName = 'check-circle-outline';
  } else if (isError) {
    bgColor = '#EF4444';
    iconName = 'alert-circle-outline';
  } else if (isWarning) {
    bgColor = '#F59E0B';
    iconName = 'alert-outline';
  }

  return (
    <Animated.View
      style={[
        styles.toastContainer,
        {
          backgroundColor: bgColor,
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        },
      ]}
      accessibilityRole="alert"
      accessibilityLiveRegion="polite"
    >
      <MaterialCommunityIcons name={iconName} size={20} color="#FFFFFF" style={styles.icon} />
      <Text style={styles.toastText} numberOfLines={2}>
        {message}
      </Text>
      <TouchableOpacity
        onPress={handleClose}
        style={styles.closeBtn}
        accessibilityRole="button"
        accessibilityLabel="Tutup pemberitahuan"
      >
        <MaterialCommunityIcons name="close" size={16} color="#FFFFFF" />
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  toastContainer: {
    position: 'absolute',
    top: 12,
    left: 16,
    right: 16,
    zIndex: 9999,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  icon: {
    marginRight: 10,
  },
  toastText: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
    lineHeight: 18,
  },
  closeBtn: {
    padding: 4,
    marginLeft: 8,
  },
});

