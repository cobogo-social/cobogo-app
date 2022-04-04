import { signIn } from 'next-auth/react';

import ButtonWithIcon from './ButtonWithIcon';

export default function SignInButton() {
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
