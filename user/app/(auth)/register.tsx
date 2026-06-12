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
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useColorScheme } from "@/hooks/use-color-scheme";
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

interface RegisterForm {
  nik: string;
  namaLengkap: string;
  noTelepon: string;
  password: string;
  konfirmasiPassword: string;
}

interface FormErrors {
  nik?: string;
  namaLengkap?: string;
  noTelepon?: string;
  password?: string;
  konfirmasiPassword?: string;
  general?: string;
}

const INITIAL_FORM: RegisterForm = {
  nik: "",
  namaLengkap: "",
  noTelepon: "",
  password: "",
  konfirmasiPassword: "",
};

export default function RegisterScreen() {
  const scheme = (useColorScheme() ?? "light") as "light" | "dark";
  const c = Colors[scheme];

  const [form, setForm] = useState<RegisterForm>(INITIAL_FORM);
  const [showPassword, setShowPassword] = useState(false);
  const [showKonfirmasi, setShowKonfirmasi] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const setField = (field: keyof RegisterForm) => (value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => {
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  const validate = (): boolean => {
    const errs: FormErrors = {};

    if (!form.nik.trim()) errs.nik = "NIK wajib diisi";
    else if (!/^\d{16}$/.test(form.nik)) errs.nik = "NIK harus 16 digit angka";

    if (!form.namaLengkap.trim()) errs.namaLengkap = "Nama lengkap wajib diisi";
    else if (form.namaLengkap.trim().length < 3)
      errs.namaLengkap = "Nama minimal 3 karakter";

    if (!form.noTelepon.trim()) errs.noTelepon = "Nomor telepon wajib diisi";
    else if (!/^08\d{8,11}$/.test(form.noTelepon))
      errs.noTelepon = "Format: 08xxxxxxxxxx";

    if (!form.password) errs.password = "Kata sandi wajib diisi";
    else if (form.password.length < 6) errs.password = "Minimal 6 karakter";

    if (!form.konfirmasiPassword)
      errs.konfirmasiPassword = "Konfirmasi kata sandi wajib diisi";
    else if (form.password !== form.konfirmasiPassword)
      errs.konfirmasiPassword = "Kata sandi tidak cocok";

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setIsSubmitting(true);
    try {
      // TODO: Ganti dengan API call ke backend
      await new Promise((res) => setTimeout(res, 1200));
      router.replace("/(auth)/login");
    } catch {
      setErrors({ general: "Pendaftaran gagal. Coba lagi." });
    } finally {
      setIsSubmitting(false);
    }
  };

  // ── Reusable Field ────────────────────────────────────────────────
  const renderField = (
    label: string,
    iconKey: keyof typeof Icons,
    field: keyof RegisterForm,
    props: Partial<React.ComponentProps<typeof TextInput>> = {},
    isPassword = false,
    showState?: boolean,
    toggleShow?: () => void,
  ) => (
    <View style={styles.fieldGroup}>
      <Text style={[styles.label, { color: c.textSecondary }]}>{label}</Text>
      <View
        style={[
          styles.inputWrapper,
          {
            borderColor: errors[field] ? c.ditolak : c.borderMedium,
            backgroundColor: c.background,
          },
        ]}
      >
        <View style={styles.inputIcon as any}><FontAwesomeIcon icon={Icons[iconKey]} color={getIconColor(iconKey, scheme)} /></View>
        <TextInput
          style={[styles.input, { color: c.text }]}
          placeholderTextColor={c.textTertiary}
          value={form[field]}
          onChangeText={setField(field)}
          secureTextEntry={isPassword && !showState}
          {...props}
        />
        {isPassword && toggleShow && (
          <TouchableOpacity
            onPress={toggleShow}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Text style={styles.eyeIcon}>{showState ? <FontAwesomeIcon icon={Icons.eyeSlash} color={getIconColor('eyeSlash', scheme)} /> : <FontAwesomeIcon icon={Icons.eye} color={getIconColor('eye', scheme)} />}</Text>
          </TouchableOpacity>
        )}
      </View>
      {errors[field] && (
        <Text style={[styles.errorText, { color: c.ditolak }]}>
          {errors[field]}
        </Text>
      )}
    </View>
  );

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
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <FontAwesomeIcon icon={Icons.arrowLeft} size={22} color="#FFFFFF" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Buat Akun</Text>
            <Text style={styles.headerSub}>
              Daftarkan diri sebagai warga desa
            </Text>
          </View>

          {/* Form Card */}
          <View
            style={[styles.formCard, { backgroundColor: c.surface }, Shadow.md]}
          >
            {errors.general && (
              <View
                style={[
                  styles.errorBanner,
                  { backgroundColor: c.ditolakLight },
                ]}
              >
                <Text
                  style={[styles.errorBannerText, { color: c.ditolakText }]}
                >
                  <FontAwesomeIcon icon={Icons.triangleExclamation} color={getIconColor('triangleExclamation', scheme)} /> {errors.general}
                </Text>
              </View>
            )}

            {renderField("NIK (16 digit)", "addressCard", "nik", {
              placeholder: "Masukkan 16 digit NIK",
              keyboardType: "numeric",
              maxLength: 16,
              returnKeyType: "next",
            })}

            {renderField("Nama Lengkap", "user", "namaLengkap", {
              placeholder: "Sesuai KTP",
              autoCapitalize: "words",
              returnKeyType: "next",
            })}

            {renderField("Nomor Telepon", "phone", "noTelepon", {
              placeholder: "08xxxxxxxxxx",
              keyboardType: "phone-pad",
              returnKeyType: "next",
            })}

            {renderField(
              "Kata Sandi",
              "lock",
              "password",
              {
                placeholder: "Minimal 6 karakter",
                returnKeyType: "next",
              },
              true,
              showPassword,
              () => setShowPassword((v) => !v),
            )}

            {renderField(
              "Konfirmasi Kata Sandi",
              "lock",
              "konfirmasiPassword",
              {
                placeholder: "Ulangi kata sandi",
                returnKeyType: "done",
                onSubmitEditing: handleSubmit,
              },
              true,
              showKonfirmasi,
              () => setShowKonfirmasi((v) => !v),
            )}

            {/* Submit */}
            <TouchableOpacity
              style={[
                styles.submitButton,
                { backgroundColor: isSubmitting ? c.primaryLight : c.primary },
              ]}
              onPress={handleSubmit}
              activeOpacity={0.85}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <ActivityIndicator color="#FFFFFF" size="small" />
              ) : (
                <Text style={styles.submitButtonText}>Buat Akun</Text>
              )}
            </TouchableOpacity>

            {/* Login Link */}
            <View style={styles.loginRow}>
              <Text style={[styles.loginText, { color: c.textSecondary }]}>
                Sudah punya akun?{" "}
              </Text>
              <Link href="/(auth)/login" asChild>
                <TouchableOpacity activeOpacity={0.7}>
                  <Text style={[styles.loginLink, { color: c.primary }]}>
                    Masuk
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
    paddingTop: Spacing.lg,
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xxl,
    gap: 4,
  },
  backButton: { marginBottom: Spacing.md, alignSelf: "flex-start", padding: 4 },
  headerTitle: {
    fontSize: FontSize.xxl,
    fontWeight: FontWeight.bold,
    color: "#FFFFFF",
  },
  headerSub: { fontSize: FontSize.sm, color: "rgba(255,255,255,0.75)" },
  formCard: {
    marginHorizontal: Spacing.base,
    borderRadius: Radius.xl,
    padding: Spacing.xl,
  },
  errorBanner: {
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
  submitButton: {
    borderRadius: Radius.md,
    paddingVertical: 15,
    alignItems: "center",
    marginTop: Spacing.sm,
    marginBottom: Spacing.lg,
  },
  submitButtonText: {
    fontSize: FontSize.base,
    fontWeight: FontWeight.bold,
    color: "#FFFFFF",
    letterSpacing: 0.3,
  },
  loginRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  loginText: { fontSize: FontSize.sm },
  loginLink: { fontSize: FontSize.sm, fontWeight: FontWeight.semiBold },
});
