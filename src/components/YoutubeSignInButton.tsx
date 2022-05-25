import { signIn } from 'next-auth/react';

import ButtonWithIcon from './ButtonWithIcon';

export default function YoutubeSignInButton() {
  return (
    <div onClick={() => signIn('google')}>
      <ButtonWithIcon
        color="bg-redyoutube"
        icon="/images/ytb-icon.svg"
        text="connect to YouTube"
      />
    </div>
  );
}
