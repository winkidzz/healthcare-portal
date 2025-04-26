'use client';

import React from 'react';
import { PreferencesLayout } from '../components/layout/PreferencesLayout';
import { PreferencesContent } from '../components/preferences/PreferencesContent';

export default function PreferencesPage() {
  return (
    <PreferencesLayout>
      <PreferencesContent />
    </PreferencesLayout>
  );
} 