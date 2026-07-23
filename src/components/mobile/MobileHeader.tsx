interface MobileHeaderProps {
  title: string;
  subTitle?: string;
}

export default function MobileHeader({ title, subTitle }: MobileHeaderProps) {
  return (
    <div className="flex-col md:hidden mb-6">
      <h1 className="text-2xl font-bold">{title}</h1>
      <h2>{subTitle}</h2>
    </div>
  );
}
