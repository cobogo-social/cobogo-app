import MobileStepItem from './MobileStepItem';

interface MobileStepsProps {
  open: boolean;
}

export default function MobileSteps({ open }: MobileStepsProps) {
  return (
    <div
      className={`bg-secondary p-8 pt-20 h-screen fixed sm:hidden ${
        open ? 'w-[193px]' : 'w-[52px]'
      } ${open ? '' : 'flex'} flex-col justify-start items-center`}
    >
      <MobileStepItem
        number="1"
        text="connect"
        href="/submit/connect"
        open={open}
      />

      <MobileStepItem
        number="2"
        text="create profile"
        href="/submit/create-profile"
        open={open}
      />

      <MobileStepItem
        number="3"
        text="video"
        href="/submit/video"
        open={open}
      />

      <MobileStepItem
        number="4"
        text="invite"
        href="/submit/invite"
        open={open}
      />

      <MobileStepItem
        number="5"
        text="success"
        href="/submit/success"
        open={open}
      />
    </div>
  );
}
