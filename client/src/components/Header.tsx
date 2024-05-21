import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';

export default function Header() {
  return (
    <header>
      <SignedIn>
        <UserButton />
      </SignedIn>
      <SignedOut>
        <SignInButton />
      </SignedOut>
    </header>
  );
}
