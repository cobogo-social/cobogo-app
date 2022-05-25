import { signIn } from 'next-auth/react';

import ButtonWithIcon from './ButtonWithIcon';

export default function TwitchSignInButton() {
  return (
    <div onClick={() => signIn('twitch')}>
      <ButtonWithIcon
        color="bg-violettwitch"
        icon="/images/twitch-icon.svg"
        text="connect to Twitch"
      />
    </div>
  );
}
