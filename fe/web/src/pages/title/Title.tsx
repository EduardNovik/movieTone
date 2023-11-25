import TitleDetails from '../../components/TitleDetails';
import TitleTrailer from '../../components/TitleTrailer';

const Title = ({ id }: { id: string }) => {
  return (
    <div>
      <TitleDetails id={id} />
      <TitleTrailer id={id} />
    </div>
  );
};

export default Title;
