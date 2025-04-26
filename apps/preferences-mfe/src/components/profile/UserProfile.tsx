'use client';

import { User } from '@healthcare-portal/shared-library';

interface UserProfileProps {
  user: User | null;
}

export default function UserProfile({ user }: UserProfileProps) {
  if (!user) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Loading profile information...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Profile Information</h2>
        <p className="mt-1 text-sm text-gray-500">
          Manage your personal information and account settings
        </p>
      </div>

      <div className="bg-white shadow rounded-lg p-6 space-y-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <div className="mt-1 text-sm text-gray-900">{user.name}</div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <div className="mt-1 text-sm text-gray-900">{user.email}</div>
          </div>
        </div>

        {/* OAuth/OIDC Profile Fields */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">Provider</label>
            <div className="mt-1 text-sm text-gray-900">OAuth/OIDC</div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Last Updated</label>
            <div className="mt-1 text-sm text-gray-900">
              {new Date().toLocaleDateString()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 