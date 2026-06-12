import React, {useState, useEffect} from "react";
import PageHeader from '../shared/components/PageHeader/PageHeader'
import Button from '../shared/components/Butoon/Button'
import {  Bell, Check, Save } from 'lucide-react'
import SectionCard from '../shared/components/SectionCard/SectionCard';
import { Globe, Monitor, Palette, Shield, User } from 'lucide-react';
import {useTheme} from "../providers/ThemeProvider";
import './style/settings.css';



function SettingsPage() {

    const {theme, toggleTheme} = useTheme();

    useEffect(() => {
        console.log(theme);
    }, []);


     const [settings, setSettings] = useState({
         fullName: "Oday saad",
         email: "odaysaad2003@gmail.com",
         role: "Company Manager",
         emailNotifications: true,
         pushNotifications: true,
         weeklyReports: false,
         twoFactorAuth: true,
     });
     

        function updateSetting(key, value) {
            setSettings((prevSettings) => ({
                ...prevSettings,
                [key]: value,
            }));
        }
         function handleSave() {
             console.log("Saved settings:", settings);
         }

    return (
        <>
            <PageHeader
                eyebrow="Settings"
                title="Manage your workspaces"
                description="Manage your account settings and preferences."
                action={
                    <Button icon={Check} onClick={() => {}}>
                        Save Changes
                    </Button>
                }
            />

            <div className="settings-layout">
                <div className="settings-main">
                    <SectionCard title="Profile Settings">
                        <div className="settings-section-header">
                            <div className="settings-icon blue">
                                <User size={20} />
                            </div>
                            <div>
                                <h4>Personal Information</h4>
                                <p>Update your basic account details.</p>
                            </div>
                        </div>

                        <div className="settings-form-grid">
                            <div className="settings-field">
                                <label>Full Name</label>
                                <input
                                    value={settings.fullName}
                                    onChange={(e) => updateSetting("fullName", e.target.value)}
                                />
                            </div>

                            <div className="settings-field">
                                <label>Email Address</label>
                                <input
                                    value={settings.email}
                                    onChange={(e) => updateSetting("email", e.target.value)}
                                />
                            </div>

                            <div className="settings-field full-width">
                                <label>Role</label>
                                <input value={settings.role} onChange={(e) => updateSetting("role", e.target.value)} />
                            </div>
                        </div>
                    </SectionCard>

                    <SectionCard title="Preferences">
                        <div className="settings-section-header">
                            <div className="settings-icon purple">
                                <Palette size={20} />
                            </div>
                            <div>
                                <h4>Appearance and Localization</h4>
                                <p>Control the system language and visual mode.</p>
                            </div>
                        </div>

                        <div className="settings-options-grid">
                            <div className="preference-card">
                                <Globe size={22} />
                                <div>
                                    <strong>Language</strong>
                                    <span>Choose your interface language.</span>
                                </div>

                                <select>
                                    <option value="en">English</option>
                                    <option value="ar">Arabic</option>
                                </select>
                            </div>

                            <div className="preference-card">
                                <Monitor size={22} />
                                <div>
                                    <strong>Theme Mode</strong>
                                    <span>Use light, dark, or system theme.</span>
                                </div>

                                <select value={theme} onChange={(e) => toggleTheme(e.target.value)}>
                                    <option value={theme}>Light</option>
                                    <option value={theme}>Dark</option>
                                    <option value={theme}>System</option>
                                </select>
                            </div>
                        </div>
                    </SectionCard>

                    <SectionCard title="Notifications">
                        <div className="settings-section-header">
                            <div className="settings-icon orange">
                                <Bell size={20} />
                            </div>
                            <div>
                                <h4>Notification Preferences</h4>
                                <p>Choose what updates you want to receive.</p>
                            </div>
                        </div>

                        <div className="settings-list">
                            <SettingToggle
                                title="Email Notifications"
                                description="Receive important updates by email."
                                checked={settings.emailNotifications}
                                onChange={(value) => updateSetting("emailNotifications", value)}
                            />

                            <SettingToggle
                                title="Push Notifications"
                                description="Get instant alerts inside the dashboard."
                                checked={settings.pushNotifications}
                                onChange={(value) => updateSetting("pushNotifications", value)}
                            />

                            <SettingToggle
                                title="Weekly Reports"
                                description="Receive weekly performance summaries."
                                checked={settings.weeklyReports}
                                onChange={(value) => updateSetting("weeklyReports", value)}
                            />
                        </div>
                    </SectionCard>

                    <SectionCard title="Security">
                        <div className="settings-section-header">
                            <div className="settings-icon green">
                                <Shield size={20} />
                            </div>
                            <div>
                                <h4>Account Security</h4>
                                <p>Protect your account and company data.</p>
                            </div>
                        </div>

                        <div className="settings-list">
                            <SettingToggle
                                title="Two-Factor Authentication"
                                description="Require a second verification step when signing in."
                                checked={settings.twoFactorAuth}
                                onChange={(value) => updateSetting("twoFactorAuth", value)}
                            />

                            <div className="security-action">
                                <div>
                                    <strong>Password</strong>
                                    <span>Last changed 21 days ago.</span>
                                </div>

                                <button className="secondary-button">Change Password</button>
                            </div>
                        </div>
                    </SectionCard>
                </div>

                <aside className="settings-sidebar">
                    <SectionCard title="Account Summary">
                        <div className="account-summary">
                            <div
                                style={{display: "flex", alignItems: "center", justifyContent: "center"}}
                                className="img"
                            >
                                <img src="../../../public/portfolio-modified.png" width={120} alt="" />
                            </div>
                            <h4>{settings.fullName}</h4>
                            <p>{settings.email}</p>
                            <span>{settings.role}</span>
                        </div>
                    </SectionCard>

                    <SectionCard title="System Info">
                        <div className="system-info-list">
                            <InfoItem label="Plan" value="Business Pro" />
                            <InfoItem label="Workspace" value="Nexora HQ" />
                            <InfoItem label="Language" value={settings.language} />
                            <InfoItem label="Theme" value={settings.theme} />
                            <InfoItem label="Devices" value="3 Active" />
                        </div>
                    </SectionCard>

                    <button className="save-settings-button" onClick={() => {}}>
                        <Save size={18} />
                        Save All Changes
                    </button>
                </aside>
            </div>
        </>
    );
}

export default SettingsPage


function SettingToggle({title, description, checked, onChange}) {
    return (
        <div className="setting-toggle-row">
            <div>
                <strong>{title}</strong>
                <span>{description}</span>
            </div>

            <button
                className={checked ? "toggle-switch active" : "toggle-switch"}
                onClick={() => onChange(!checked)}
                type="button"
            >
                <span />
            </button>
        </div>
    );
}


function InfoItem({label, value}) {
    return (
        <div className="info-item">
            <span>{label}</span>
            <strong>{value}</strong>
        </div>
    );
}