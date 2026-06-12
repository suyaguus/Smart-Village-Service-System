import { View, Text, TextInput, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors, FontSize, FontWeight, Spacing, Radius } from '@/constants/theme';
import type { FieldType } from '@/types';

interface FormInputProps {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  type?: FieldType;
  required?: boolean;
  placeholder?: string;
  error?: string;
  options?: string[];
}

export function FormInput({
  label,
  value,
  onChangeText,
  type = 'text',
  required = false,
  placeholder,
  error,
  options = [],
}: FormInputProps) {
  const scheme = (useColorScheme() ?? 'light') as 'light' | 'dark';
  const c = Colors[scheme];

  const borderColor = error ? c.ditolak : c.borderMedium;

  // Chip selector untuk select / radio
  const renderChips = () => (
    <View style={styles.chipRow}>
      {options.map((opt) => {
        const selected = value === opt;
        return (
          <TouchableOpacity
            key={opt}
            style={[
              styles.chip,
              {
                backgroundColor: selected ? c.primary : c.background,
                borderColor: selected ? c.primary : c.borderMedium,
              },
            ]}
            onPress={() => onChangeText(opt)}
            activeOpacity={0.75}
          >
            <Text
              style={[
                styles.chipText,
                { color: selected ? '#FFFFFF' : c.textSecondary },
              ]}
            >
              {opt}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );

  // Text-based input
  const renderTextInput = () => {
    const isTextarea = type === 'textarea';
    const isNumber = type === 'number';
    const isDate = type === 'date';

    return (
      <View
        style={[
          styles.inputWrapper,
          {
            borderColor,
            backgroundColor: c.background,
            alignItems: isTextarea ? 'flex-start' : 'center',
          },
        ]}
      >
        {isDate && <Text style={styles.leadingIcon}>📅</Text>}
        <TextInput
          style={[
            styles.input,
            { color: c.text },
            isTextarea && styles.textarea,
          ]}
          placeholder={placeholder ?? `Masukkan ${label.toLowerCase()}`}
          placeholderTextColor={c.textTertiary}
          value={value}
          onChangeText={onChangeText}
          multiline={isTextarea}
          numberOfLines={isTextarea ? 4 : 1}
          keyboardType={isNumber ? 'numeric' : 'default'}
        />
      </View>
    );
  };

  const isChipType = type === 'select' || type === 'radio';

  return (
    <View style={styles.fieldGroup}>
      <Text style={[styles.label, { color: c.textSecondary }]}>
        {label}
        {required && <Text style={{ color: c.ditolak }}> *</Text>}
      </Text>

      {isChipType ? renderChips() : renderTextInput()}

      {error && <Text style={[styles.errorText, { color: c.ditolak }]}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  fieldGroup: {
    marginBottom: Spacing.base,
  },
  label: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.medium,
    marginBottom: Spacing.xs,
  },
  inputWrapper: {
    flexDirection: 'row',
    borderWidth: 1.5,
    borderRadius: Radius.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: Platform.OS === 'ios' ? 14 : 10,
    gap: Spacing.sm,
  },
  leadingIcon: {
    fontSize: 16,
  },
  input: {
    flex: 1,
    fontSize: FontSize.base,
    paddingVertical: 0,
  },
  textarea: {
    minHeight: 90,
    textAlignVertical: 'top',
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  chip: {
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.sm,
    borderRadius: Radius.full,
    borderWidth: 1.5,
  },
  chipText: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.medium,
  },
  errorText: {
    fontSize: FontSize.xs,
    marginTop: 4,
    marginLeft: 2,
  },
});