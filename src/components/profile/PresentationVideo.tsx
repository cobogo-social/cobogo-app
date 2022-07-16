import '@vime/core/themes/default.css';

import { DefaultUi, Player, Youtube } from '@vime/react';

interface PresentationVideoProps {
  videoId: string;
}

export default function PresentationVideo(props: PresentationVideoProps) {
  return (
    <div className="w-[480px] h-[268px]">
      <Player>
        <Youtube videoId={props.videoId} />
        <DefaultUi />
      </Player>
    </div>
  );
}
