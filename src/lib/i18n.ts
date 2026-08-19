import type { Language } from "./app-store";

type Dict = {
  settingsEyebrow: string;
  settingsTitle: string;
  notSignedIn: string;
  profileNotLinked: string;
  signedInVia: string;
  groupPreferences: string;
  groupSecurity: string;
  groupData: string;
  language: string;
  languageHint: string;
  theme: string;
  themeOn: string;
  themeOff: string;
  notifications: string;
  notificationsOn: string;
  notificationsOff: string;
  appLock: string;
  appLockOn: string;
  appLockOff: string;
  appLockNote: string;
  cloudSync: string;
  cloudSyncOn: string;
  cloudSyncOff: string;
  categories: string;
  categoriesHint: string;
  exportData: string;
  exportHint: string;
  logout: string;
  deleteAccount: string;
};

const dictionaries: Record<Language, Dict> = {
  id: {
    settingsEyebrow: "Konfigurasi",
    settingsTitle: "Pengaturan",
    notSignedIn: "Belum masuk",
    profileNotLinked: "Profil belum tersambung",
    signedInVia: "Masuk via",
    groupPreferences: "Preferensi Aplikasi",
    groupSecurity: "Keamanan",
    groupData: "Data",
    language: "Bahasa Aplikasi",
    languageHint: "Bahasa Indonesia · IDR",
    theme: "Tema Tampilan",
    themeOn: "Mode gelap aktif",
    themeOff: "Mode terang aktif",
    notifications: "Notifikasi Push",
    notificationsOn: "Pengingat transaksi aktif",
    notificationsOff: "Nonaktif",
    appLock: "Kunci Aplikasi / Biometrik",
    appLockOn: "Aktif — minta verifikasi saat dibuka",
    appLockOff: "Nonaktif",
    appLockNote: "Pratinjau: verifikasi perangkat menyusul.",
    cloudSync: "Sinkronisasi Cloud",
    cloudSyncOn: "Tersinkronisasi",
    cloudSyncOff: "Belum tersinkronisasi",
    categories: "Kategori Transaksi",
    categoriesHint: "Kelola kategori",
    exportData: "Ekspor Data Keuangan",
    exportHint: "Unduh laporan",
    logout: "Keluar Akun",
    deleteAccount: "Hapus Akun & Data",
  },
  en: {
    settingsEyebrow: "Configuration",
    settingsTitle: "Settings",
    notSignedIn: "Not signed in",
    profileNotLinked: "Profile not linked",
    signedInVia: "Signed in via",
    groupPreferences: "App Preferences",
    groupSecurity: "Security",
    groupData: "Data",
    language: "App Language",
    languageHint: "English · IDR",
    theme: "Appearance",
    themeOn: "Dark mode on",
    themeOff: "Light mode on",
    notifications: "Push Notifications",
    notificationsOn: "Transaction reminders on",
    notificationsOff: "Off",
    appLock: "App Lock / Biometrics",
    appLockOn: "On — verify on every launch",
    appLockOff: "Off",
    appLockNote: "Preview: device verification coming soon.",
    cloudSync: "Cloud Sync",
    cloudSyncOn: "Synced",
    cloudSyncOff: "Not synced yet",
    categories: "Transaction Categories",
    categoriesHint: "Manage categories",
    exportData: "Export Financial Data",
    exportHint: "Download report",
    logout: "Sign Out",
    deleteAccount: "Delete Account & Data",
  },
};

export const t = (lang: Language): Dict => dictionaries[lang];
