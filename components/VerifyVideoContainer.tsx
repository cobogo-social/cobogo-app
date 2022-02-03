import Link from 'next/link';
import Bullet from './Bullet';
import Button from './Button';

export default function VerifyVideoContainer() {
  return (
    <div className="flex flex-col">
      <p className="text-4xl text-white mb-4">video</p>
      <p className="text-xl text-white w-[408px] mb-12">
        almost there! To unlock the stake function on your channel, you need to
        record and post a video to your YouTube channel following these rules:
      </p>

      <div className="mb-5">
        <Bullet text="longer than 2 minutes" />
      </div>
      <div className="mb-5">
        <Bullet text='have the name "cobogo" in the title' />
      </div>
      <div className="mb-10">
        <Bullet text="link to" link="https://cobogo.social/space-official" />
      </div>

      <Link href="/submit/video">
        <a>
          <Button
            width="w-32"
            height="h-9"
            color="bg-blue"
            hoverColor="brightness-90"
            text="verify video"
            fontSize=""
          />
        </a>
      </Link>
    </div>
  );
}
