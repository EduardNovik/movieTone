import TitleDetails from '../../components/TitleDetails';

const Title = ({ id }: { id: string }) => {
  return (
    <div>
      <TitleDetails id={id} />
    </div>
  );
};

export default Title;
