import { AppMode, UserAccount } from '../types';

const USERS_STORAGE_KEY = 'ai_content_studio_users_v1';
const SESSION_STORAGE_KEY = 'ai_content_studio_active_session_v1';

export const DEMO_USERS: UserAccount[] = [
  {
    id: 'user-organizer-demo',
    name: 'Rohan Sharma',
    email: 'organizer@aicontent.studio',
    password: 'password123',
    role: 'organizer',
    organization: 'Campus Tech Board & IEEE Student Branch',
    collegeOrCompany: 'Institute of Technology',
    bio: 'Lead organizer for hackathons and annual college tech symposia.',
    createdAt: new Date(Date.now() - 86400000 * 30).toISOString(),
  },
  {
    id: 'user-participant-demo',
    name: 'Priya Sharma',
    email: 'user@aicontent.studio',
    password: 'password123',
    role: 'participant',
    organization: 'AI Club Builder',
    collegeOrCompany: 'Department of Computer Science',
    bio: 'Avid hackathon builder, open-source enthusiast, and student developer.',
    createdAt: new Date(Date.now() - 86400000 * 15).toISOString(),
  },
];

export function getStoredUsers(): UserAccount[] {
  try {
    const raw = localStorage.getItem(USERS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(DEMO_USERS));
      return DEMO_USERS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : DEMO_USERS;
  } catch (err) {
    console.error('Error fetching stored users:', err);
    return DEMO_USERS;
  }
}

export function getCurrentUser(): UserAccount | null {
  try {
    const raw = localStorage.getItem(SESSION_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading current user session:', err);
    return null;
  }
}

export function setCurrentUser(user: UserAccount | null): void {
  try {
    if (user) {
      localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(SESSION_STORAGE_KEY);
    }
  } catch (err) {
    console.error('Error writing user session:', err);
  }
}

export function logoutUser(): void {
  try {
    localStorage.removeItem(SESSION_STORAGE_KEY);
  } catch (err) {
    console.error('Error during logout:', err);
  }
}

export function loginUser(email: string, password: string): { success: boolean; user?: UserAccount; error?: string } {
  const users = getStoredUsers();
  const normalizedEmail = email.trim().toLowerCase();

  const user = users.find(
    (u) => u.email.toLowerCase() === normalizedEmail && u.password === password
  );

  if (!user) {
    return {
      success: false,
      error: 'Invalid email or password. You can also try our 1-click demo logins.',
    };
  }

  // Set active session
  setCurrentUser(user);
  return { success: true, user };
}

export function registerUser(params: {
  name: string;
  email: string;
  password: string;
  role: AppMode;
  organization?: string;
  collegeOrCompany?: string;
}): { success: boolean; user?: UserAccount; error?: string } {
  const users = getStoredUsers();
  const normalizedEmail = params.email.trim().toLowerCase();

  // Check if email already registered
  const existing = users.find((u) => u.email.toLowerCase() === normalizedEmail);
  if (existing) {
    return {
      success: false,
      error: 'This email is already registered. Please sign in instead.',
    };
  }

  const newUser: UserAccount = {
    id: `user-${Date.now()}`,
    name: params.name.trim(),
    email: normalizedEmail,
    password: params.password,
    role: params.role,
    organization: params.organization?.trim(),
    collegeOrCompany: params.collegeOrCompany?.trim(),
    createdAt: new Date().toISOString(),
  };

  const updatedUsers = [newUser, ...users];
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(updatedUsers));
  setCurrentUser(newUser);

  return { success: true, user: newUser };
}
