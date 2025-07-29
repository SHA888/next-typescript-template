'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

type User = {
  id: string;
  email: string;
  name: string | null;
  createdAt: string;
};

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/users');
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      const data = await response.json();
      setUsers(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching users:', err);
      setError('Failed to load users. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const createTestUser = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: `test-${Date.now()}@example.com`,
          name: 'Test User',
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create user');
      }

      // Refresh the users list
      await fetchUsers();
    } catch (err) {
      console.error('Error creating user:', err);
      setError('Failed to create user. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Users</h1>
        <Button onClick={createTestUser} disabled={loading}>
          {loading ? 'Creating...' : 'Add Test User'}
        </Button>
      </div>

      {error && (
        <div className="mb-4 rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700">
          {error}
        </div>
      )}

      {loading && users.length === 0 ? (
        <div>Loading users...</div>
      ) : (
        <div className="space-y-4">
          {users.map((user) => (
            <div
              key={user.id}
              className="rounded-lg border p-4 shadow-sm transition-shadow hover:shadow"
            >
              <h3 className="font-semibold">{user.name || 'No name'}</h3>
              <p className="text-sm text-gray-600">{user.email}</p>
              <p className="text-xs text-gray-400">
                Created: {new Date(user.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
          {users.length === 0 && !loading && (
            <p>No users found. Click "Add Test User" to create one.</p>
          )}
        </div>
      )}
    </div>
  );
}
