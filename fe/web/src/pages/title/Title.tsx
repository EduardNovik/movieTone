import TitleDetails from '../../components/TitleDetails';
// import { useParams } from '@tanstack/react-router';
// import { useParams } from 'react-router-dom';

const Title = ({ id }: { id: string }) => {
  // const { id } = useParams<{ id: string }>();
  return (
    <div>
      <TitleDetails props={id} />;
    </div>
  );
};

export default Title;
