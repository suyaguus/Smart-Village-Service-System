import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useLoginForm } from "@/hooks/use-login-form";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Icons, getIconColor } from "@/constants/icons";
import {
  Colors,
  FontSize,
  FontWeight,
  Spacing,
  Radius,
  Shadow,
} from "@/constants/theme";

export default function LoginScreen() {
  const scheme = (useColorScheme() ?? "light") as "light" | "dark";
  const c = Colors[scheme];

  const [nik, setNik] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { errors, isSubmitting, handleSubmit, clearError } = useLoginForm();

  const onSubmit = () => handleSubmit({ nik, password });

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: c.primary }]}>
      <StatusBar barStyle="light-content" backgroundColor={c.primary} />
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.headerSection}>
            <View style={styles.logoCard}>
              <Text style={styles.logoEmoji}>🏡</Text>
            </View>
            <Text style={styles.appName}>Smart Village</Text>
            <Text style={styles.appSub}>Layanan Desa Digital</Text>
          </View>

          {/* Form Card */}
          <View
            style={[styles.formCard, { backgroundColor: c.surface }, Shadow.md]}
          >
            <Text style={[styles.formTitle, { color: c.text }]}>Masuk</Text>
            <Text style={[styles.formSub, { color: c.textSecondary }]}>
              Masukkan NIK dan kata sandi Anda
            </Text>

            {/* Error General */}
            {errors.general && (
              <View
                style={[
                  styles.errorBanner,
                  { backgroundColor: c.ditolakLight },
                ]}
              >
                <FontAwesomeIcon icon={Icons.triangleExclamation} color={getIconColor('triangleExclamation', scheme)} />
                <Text style={[styles.errorBannerText, { color: c.ditolakText }]}>
                  {errors.general}
                </Text>
              </View>
            )}

            {/* NIK Field */}
            <View style={styles.fieldGroup}>
              <Text style={[styles.label, { color: c.textSecondary }]}>
                NIK (Nomor Induk Kependudukan)
              </Text>
              <View
                style={[
                  styles.inputWrapper,
                  {
                    borderColor: errors.nik ? c.ditolak : c.borderMedium,
                    backgroundColor: c.background,
                  },
                ]}
              >
                <FontAwesomeIcon icon={Icons.addressCard} color={getIconColor('addressCard', scheme)} />
                <TextInput
                  style={[styles.input, { color: c.text }]}
                  placeholder="Masukkan 16 digit NIK"
                  placeholderTextColor={c.textTertiary}
                  value={nik}
                  onChangeText={(t) => {
                    setNik(t);
                    clearError("nik");
                  }}
                  keyboardType="numeric"
                  maxLength={16}
                  returnKeyType="next"
                />
              </View>
              {errors.nik && (
                <Text style={[styles.errorText, { color: c.ditolak }]}>
                  {errors.nik}
                </Text>
              )}
            </View>

            {/* Password Field */}
            <View style={styles.fieldGroup}>
              <Text style={[styles.label, { color: c.textSecondary }]}>
                Kata Sandi
              </Text>
              <View
                style={[
                  styles.inputWrapper,
                  {
                    borderColor: errors.password ? c.ditolak : c.borderMedium,
                    backgroundColor: c.background,
                  },
                ]}
              >
                <FontAwesomeIcon icon={Icons.lock} color={getIconColor('lock', scheme)} />
                <TextInput
                  style={[styles.input, { color: c.text }]}
                  placeholder="Masukkan kata sandi"
                  placeholderTextColor={c.textTertiary}
                  value={password}
                  onChangeText={(t) => {
                    setPassword(t);
                    clearError("password");
                  }}
                  secureTextEntry={!showPassword}
                  returnKeyType="done"
                  onSubmitEditing={onSubmit}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword((v) => !v)}
                  hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                >
                  <Text style={styles.eyeIcon}>
                    {showPassword ? <FontAwesomeIcon icon={Icons.eyeSlash} color={getIconColor('eyeSlash', scheme)} /> : <FontAwesomeIcon icon={Icons.eye} color={getIconColor('eye', scheme)} />}
                  </Text>
                </TouchableOpacity>
              </View>
              {errors.password && (
                <Text style={[styles.errorText, { color: c.ditolak }]}>
                  {errors.password}
                </Text>
              )}
            </View>

            {/* Lupa Kata Sandi */}
            <TouchableOpacity style={styles.forgotWrapper} activeOpacity={0.7}>
              <Text style={[styles.forgotText, { color: c.primary }]}>
                Lupa kata sandi?
              </Text>
            </TouchableOpacity>

            {/* Submit Button */}
            <TouchableOpacity
              style={[
                styles.loginButton,
                { backgroundColor: isSubmitting ? c.primaryLight : c.primary },
              ]}
              onPress={onSubmit}
              activeOpacity={0.85}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <ActivityIndicator color="#FFFFFF" size="small" />
              ) : (
                <Text style={styles.loginButtonText}>Masuk</Text>
              )}
            </TouchableOpacity>

            {/* Divider */}
            <View style={styles.dividerRow}>
              <View
                style={[styles.dividerLine, { backgroundColor: c.border }]}
              />
              <Text style={[styles.dividerText, { color: c.textTertiary }]}>
                atau
              </Text>
              <View
                style={[styles.dividerLine, { backgroundColor: c.border }]}
              />
            </View>

            {/* Daftar Link */}
            <View style={styles.registerRow}>
              <Text style={[styles.registerText, { color: c.textSecondary }]}>
                Belum punya akun?{" "}
              </Text>
              <Link href="/(auth)/register" asChild>
                <TouchableOpacity activeOpacity={0.7}>
                  <Text style={[styles.registerLink, { color: c.primary }]}>
                    Daftar sekarang
                  </Text>
                </TouchableOpacity>
              </Link>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  flex: { flex: 1 },
  scroll: { flexGrow: 1, paddingBottom: Spacing.xxl },
  headerSection: {
    alignItems: "center",
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.xxl + 8,
    gap: Spacing.sm,
  },
  logoCard: {
    width: 72,
    height: 72,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.20)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4,
  },
  logoEmoji: { fontSize: 36 },
  appName: {
    fontSize: FontSize.xxl,
    fontWeight: FontWeight.bold,
    color: "#FFFFFF",
    letterSpacing: 0.3,
  },
  appSub: { fontSize: FontSize.sm, color: "rgba(255,255,255,0.75)" },
  formCard: {
    marginHorizontal: Spacing.base,
    borderRadius: Radius.xl,
    padding: Spacing.xl,
  },
  formTitle: {
    fontSize: FontSize.xl,
    fontWeight: FontWeight.bold,
    marginBottom: 4,
  },
  formSub: { fontSize: FontSize.sm, marginBottom: Spacing.lg },
  errorBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    borderRadius: Radius.sm,
    padding: Spacing.md,
    marginBottom: Spacing.base,
  },
  errorBannerText: { fontSize: FontSize.sm, fontWeight: FontWeight.medium },
  fieldGroup: { marginBottom: Spacing.base },
  label: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.medium,
    marginBottom: Spacing.xs,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1.5,
    borderRadius: Radius.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: Platform.OS === "ios" ? 14 : 10,
    gap: Spacing.sm,
  },
  inputIcon: { fontSize: 16 },
  input: { flex: 1, fontSize: FontSize.base, paddingVertical: 0 },
  eyeIcon: { fontSize: 16 },
  errorText: { fontSize: FontSize.xs, marginTop: 4, marginLeft: 2 },
  forgotWrapper: { alignSelf: "flex-end", marginBottom: Spacing.lg },
  forgotText: { fontSize: FontSize.sm, fontWeight: FontWeight.medium },
  loginButton: {
    borderRadius: Radius.md,
    paddingVertical: 15,
    alignItems: "center",
    marginBottom: Spacing.lg,
  },
  loginButtonText: {
    fontSize: FontSize.base,
    fontWeight: FontWeight.bold,
    color: "#FFFFFF",
    letterSpacing: 0.3,
  },
  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
    marginBottom: Spacing.lg,
  },
  dividerLine: { flex: 1, height: 1 },
  dividerText: { fontSize: FontSize.xs },
  registerRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  registerText: { fontSize: FontSize.sm },
  registerLink: { fontSize: FontSize.sm, fontWeight: FontWeight.semiBold },
});
