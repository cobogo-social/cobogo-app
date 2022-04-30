interface BadgeProps {
  title: string;
}

export default function Badge({ title }: BadgeProps) {
  return (
    <div className="flex justify-center items-center px-4 h-[24px] sm:h-[36px] bg-blue2/[0.8]">
      <p className="text-sm font-bold sm:text-base">{title}</p>
    </div>
  );
}
