import Button from './Button';

export default function VerifiedVideo() {
  return (
    <div className="flex flex-col">
      <p className="text-4xl text-green mb-4">verified!</p>

      <p className="text-xl text-white w-[408px] mb-12">
        there is a video on your channel that meet the rules.
      </p>

      <a href="/submit/connect-wallet">
        <Button
          width="w-28"
          height="h-9"
          color="bg-blue"
          hoverColor="brightness-90"
          text="next step"
        />
      </a>
    </div>
  );
}
