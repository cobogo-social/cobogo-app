interface BadgeProps {
  title: string;
}

export default function Badge({ title }: BadgeProps) {
  return (
    <div className="flex justify-center items-center px-4 h-[24px] sm:h-[36px] bg-bluelight/[0.8]">
      <p className="text-sm font-bold text-white sm:text-base">{title}</p>
    </div>
  );
}
