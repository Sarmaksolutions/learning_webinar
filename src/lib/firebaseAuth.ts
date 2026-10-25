import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  updateProfile,
  type User,
} from 'firebase/auth';

import { auth } from './firebase';

/**
 * Register a new user and send an email verification link.
 * Registration argument order: name, email, password.
 */
export async function registerWithEmail(
  name: string,
  email: string,
  password: string,
): Promise<void> {
  const normalizedName = name.trim();
  const normalizedEmail = email.trim();

  if (!normalizedName) {
    throw new Error('Please enter your full name.');
  }

  if (!normalizedEmail) {
    throw new Error('Please enter your email address.');
  }

  if (password.length < 6) {
    throw new Error('Password must contain at least 6 characters.');
  }

  const credential = await createUserWithEmailAndPassword(
    auth,
    normalizedEmail,
    password,
  );

  try {
    await updateProfile(credential.user, {
      displayName: normalizedName,
    });

    await sendEmailVerification(credential.user);
  } finally {
    // Keep the newly registered, unverified user signed out.
    await signOut(auth);
  }
}

/**
 * Sign in only if the user's email address has been verified.
 */
export async function loginWithEmail(
  email: string,
  password: string,
): Promise<User> {
  const normalizedEmail = email.trim();

  if (!normalizedEmail) {
    throw new Error('Please enter your email address.');
  }

  if (!password) {
    throw new Error('Please enter your password.');
  }

  const credential = await signInWithEmailAndPassword(
    auth,
    normalizedEmail,
    password,
  );

  const user = credential.user;

  if (!user.emailVerified) {
    try {
      await sendEmailVerification(user);
    } catch {
      // The original verification error should not prevent sign-out.
    } finally {
      await signOut(auth);
    }

    throw new Error(
      'Your email is not verified. Check your inbox for the verification link, then log in again.',
    );
  }

  return user;
}

/**
 * Send a password-reset email.
 */
export async function resetPassword(
  email: string,
): Promise<void> {
  const normalizedEmail = email.trim();

  if (!normalizedEmail) {
    throw new Error('Please enter your email address.');
  }

  await sendPasswordResetEmail(auth, normalizedEmail);
}

/**
 * Sign out the current Firebase user.
 */
export async function logoutFirebase(): Promise<void> {
  await signOut(auth);
}