import { signIn } from 'next-auth/react';

import ButtonWithIcon from './ButtonWithIcon';

export default function DiscordSignInButton() {
  return (
    <div onClick={() => signIn('discord')}>
      <ButtonWithIcon
        color="bg-violetdiscord"
        icon="/images/discord-icon.svg"
        text="connect to Discord"
      />
    </div>
  );
}
