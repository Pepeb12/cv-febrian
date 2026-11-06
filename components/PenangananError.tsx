import React, { Component, ReactNode, ErrorInfo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ThemeColors } from '../types';

interface ErrorBoundaryProps {
  children: ReactNode;
  theme?: ThemeColors | any;
  onReset?: () => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('[ErrorBoundary caught an error]:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    if (this.props.onReset) {
      this.props.onReset();
    }
  };

  render() {
    if (this.state.hasError) {
      const { theme } = this.props;
      const bgColor = theme ? theme.surface : '#FFFFFF';
      const textColor = theme ? theme.text : '#1E293B';
      const borderCol = theme ? theme.border : '#E2E8F0';

      return (
        <View style={[styles.container, { backgroundColor: bgColor, borderColor: borderCol }]}>
          <View style={styles.iconCircle}>
            <MaterialCommunityIcons name="alert-octagon" size={42} color="#EF4444" />
          </View>
          <Text style={[styles.title, { color: textColor }]}>Terjadi Kesalahan Render</Text>
          <Text style={styles.description}>
            Komponen aplikasi mengalami kendala saat memproses tampilan. Sistem Error Boundary berhasil mengisolasi kesalahan agar aplikasi tidak keluar tiba-tiba.
          </Text>
          {this.state.error?.message ? (
            <View style={styles.errorBox}>
              <Text style={styles.errorText}>{this.state.error.message}</Text>
            </View>
          ) : null}
          <TouchableOpacity
            style={styles.retryButton}
            onPress={this.handleReset}
            activeOpacity={0.8}
            accessibilityRole="button"
            accessibilityLabel="Muat Ulang Tampilan"
          >
            <MaterialCommunityIcons name="refresh" size={18} color="#FFFFFF" />
            <Text style={styles.retryButtonText}>Pulihkan Tampilan</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    marginVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 1.5,
    borderStyle: 'dashed',
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#FEE2E2',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 8,
    textAlign: 'center',
  },
  description: {
    fontSize: 13,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 14,
  },
  errorBox: {
    backgroundColor: '#F8FAFC',
    padding: 10,
    borderRadius: 8,
    width: '100%',
    marginBottom: 16,
  },
  errorText: {
    fontFamily: 'monospace',
    fontSize: 11,
    color: '#EF4444',
  },
  retryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0284C7',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 10,
    gap: 8,
  },
  retryButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 13,
  },
});

export default ErrorBoundary;

