interface MobileGraphHeaderProps {
  heading: string;
}

export const MobileGraphHeader = ({ heading }: MobileGraphHeaderProps) => {
  return <div className="lg:hidden block text-blue-400 text-xl text-center mb-5 font-medium">{heading}</div>;
};
