type Props = {
  title: string;
  description: string;
};
export const Title: React.FC<Props> = ({ title, description }) => {
  return (
    <div className="text-center mt-20 mb-10">
      <h1 className="text-2xl">{title}</h1>
      <p className="pt-3">{description}</p>
    </div>
  );
};
