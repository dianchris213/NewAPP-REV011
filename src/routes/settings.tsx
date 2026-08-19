import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell, TopBar } from "@/components/AppShell";
import { Icon } from "@/components/Icon";
import { useModalA11y } from "@/hooks/use-modal-a11y";
import {
  useApp,
  WALLET_TYPE_LABEL,
  type Language,
  type Settings as SettingsState,
  type TxType,
} from "@/lib/app-store";
import { t } from "@/lib/i18n";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Pengaturan - Catatan Keuangan Mini App" },
      {
        name: "description",
        content: "Atur bahasa, mata uang, tema, notifikasi, keamanan, dan ekspor data keuangan.",
      },
      { property: "og:title", content: "Pengaturan - Catatan Keuangan Mini App" },
      {
        property: "og:description",
        content: "Preferensi aplikasi, keamanan, dan pengelolaan data.",
      },
    ],
  }),
  component: SettingsPage,
});

function Row({
  icon,
  title,
  subtitle,
  trailing,
  onClick,
}: {
  icon: string;
  title: string;
  subtitle?: string;
  trailing: React.ReactNode;
  onClick?: () => void;
}) {
  const Wrapper = onClick ? "button" : "div";
  return (
    <Wrapper
      {...(onClick ? { type: "button" as const, onClick } : {})}
      className="flex w-full items-center gap-3 border-b border-outline-variant/20 py-3 text-left last:border-0 focus-visible:ring-2 focus-visible:ring-primary/60"
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-surface-variant text-primary">
        <Icon name={icon} className="text-[20px]" />
      </span>
      <span className="flex flex-1 flex-col">
        <span className="text-sm font-medium text-on-surface">{title}</span>
        {subtitle ? <span className="text-xs text-on-surface-variant">{subtitle}</span> : null}
      </span>
      {trailing}
    </Wrapper>
  );
}

function Toggle({ id, label }: { id: keyof SettingsState; label: string }) {
  const { settings, toggleSetting } = useApp();
  const on = settings[id];
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={label}
      onClick={() => toggleSetting(id)}
      className={`h-6 w-11 rounded-full border p-0.5 transition-colors ${
        on ? "border-primary bg-primary-container/60" : "border-outline-variant/40 bg-surface-variant"
      }`}
    >
      <span
        className={`block h-5 w-5 rounded-full transition-transform ${
          on ? "translate-x-5 bg-primary" : "translate-x-0 bg-outline"
        }`}
      />
    </button>
  );
}

const LANGUAGES: { value: Language; label: string }[] = [
  { value: "id", label: "ID" },
  { value: "en", label: "EN" },
];

function LanguageToggle() {
  const { language, setLanguage } = useApp();
  return (
    <div
      role="radiogroup"
      aria-label="Bahasa aplikasi"
      data-testid="language-toggle"
      className="flex items-center gap-1 rounded-full bg-surface-container p-1"
    >
      {LANGUAGES.map((l) => {
        const active = language === l.value;
        return (
          <button
            key={l.value}
            type="button"
            role="radio"
            aria-checked={active}
            data-testid={`language-${l.value}`}
            onClick={() => setLanguage(l.value)}
            className={`h-7 min-w-[42px] rounded-full px-3 text-[12px] font-bold transition-colors focus-visible:ring-2 focus-visible:ring-primary/60 ${
              active
                ? "bg-primary-container/40 text-primary"
                : "text-on-surface-variant hover:text-on-surface"
            }`}
          >
            {l.label}
          </button>
        );
      })}
    </div>
  );
}

const Chevron = <Icon name="chevron_right" className="text-[20px] text-on-surface-variant" />;

function Group({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <section className="mt-stack-lg">
      <h2 className="mb-2 text-label uppercase text-primary">{label}</h2>
      <div className="glass-card rounded-[16px] px-4">{children}</div>
    </section>
  );
}

function SettingsPage() {
  const { user, logout, settings, language } = useApp();
  const navigate = useNavigate();
  const copy = t(language);

  return (
    <AppShell topBar={<TopBar eyebrow={copy.settingsEyebrow} title={copy.settingsTitle} />}>
      <div className="gradient-hero flex items-center gap-3 rounded-[24px] p-4">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-surface-variant text-on-surface-variant">
          <Icon name="person" />
        </span>
        <div className="flex flex-1 flex-col">
          <span className="text-base font-semibold text-on-surface">
            {user?.name ?? copy.notSignedIn}
          </span>
          <span className="text-xs text-on-surface-variant">
            {user
              ? `${copy.signedInVia} ${user.provider === "telegram" ? "Telegram" : "Google"}`
              : copy.profileNotLinked}
          </span>
        </div>
        <span className="rounded-full bg-surface-container-high px-4 py-1.5 text-xs font-semibold text-on-surface">
          {user?.handle ?? "-"}
        </span>
      </div>

      <Group label={copy.groupPreferences}>
        <Row
          icon="language"
          title={copy.language}
          subtitle={copy.languageHint}
          trailing={<LanguageToggle />}
        />
        <Row
          icon="dark_mode"
          title={copy.theme}
          subtitle={settings.darkTheme ? copy.themeOn : copy.themeOff}
          trailing={<Toggle id="darkTheme" label={copy.theme} />}
        />
        <Row
          icon="notifications"
          title={copy.notifications}
          subtitle={settings.pushNotifications ? copy.notificationsOn : copy.notificationsOff}
          trailing={<Toggle id="pushNotifications" label={copy.notifications} />}
        />
      </Group>

      <Group label={copy.groupSecurity}>
        <Row
          icon="fingerprint"
          title={copy.appLock}
          subtitle={settings.biometricLock ? copy.appLockOn : copy.appLockOff}
          trailing={<Toggle id="biometricLock" label={copy.appLock} />}
        />
        {settings.biometricLock ? (
          <p className="pb-3 text-[11px] text-on-surface-variant/70">{copy.appLockNote}</p>
        ) : null}
        <Row
          icon="cloud_sync"
          title={copy.cloudSync}
          subtitle={settings.cloudSync ? copy.cloudSyncOn : copy.cloudSyncOff}
          trailing={<Toggle id="cloudSync" label={copy.cloudSync} />}
        />
      </Group>

      <Group label={copy.groupData}>
        <Row
          icon="category"
          title={copy.categories}
          subtitle={copy.categoriesHint}
          trailing={Chevron}
        />
        <Row
          icon="download"
          title={copy.exportData}
          subtitle={copy.exportHint}
          trailing={Chevron}
        />
      </Group>

      <button
        onClick={() => {
          logout();
          navigate({ to: "/login" });
        }}
        className="mt-stack-lg flex w-full items-center justify-center gap-2 rounded-[16px] bg-surface-container-high py-4 text-base font-semibold text-on-surface"
      >
        <Icon name="logout" className="text-[20px]" /> {copy.logout}
      </button>
      <button className="mt-3 flex w-full items-center justify-center gap-2 rounded-[16px] border border-error/30 py-4 text-base font-semibold text-error">
        <Icon name="delete" className="text-[20px]" /> {copy.deleteAccount}
      </button>
    </AppShell>
  );
}
