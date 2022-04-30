interface BulletProps {
  text: string;
  link?: string;
}

export default function Bullet({ text, link }: BulletProps) {
  return (
    <div className="flex items-center">
      <div className="w-[27px] h-[27px] rounded-full border-[2.5px] border-white mr-2" />

      <p className="text-sm font-bold sm:text-base">
        {text} <span className="text-blue">{link}</span>
      </p>
    </div>
  );
}
