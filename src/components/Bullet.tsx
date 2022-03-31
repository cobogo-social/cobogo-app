interface BulletProps {
  text: string;
  link?: string;
}

export default function Bullet({ text, link }: BulletProps) {
  return (
    <div className="flex items-center">
      <div className="w-[27px] h-[27px] rounded-full border-[2.5px] border-white mr-2" />

      <p className="font-bold text-white text-sm sm:text-base">
        {text} <span className="text-blue">{link}</span>
      </p>
    </div>
  );
}
