import { signIn } from 'next-auth/react';

import ButtonWithIcon from './ButtonWithIcon';

export default function TwitterSignInButton() {
  return (
    <div onClick={() => signIn('twitter')}>
      <ButtonWithIcon
        color="bg-bluetwitter"
        icon="/images/twitter-icon.svg"
        text="connect to Twitter"
      />
    </div>
  );
}
