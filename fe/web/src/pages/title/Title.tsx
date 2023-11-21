import TitleDetails from '../../components/TitleDetails';
// import { useParams } from '@tanstack/react-router';
// import { useParams } from 'react-router-dom';

const Title = ({ ...props }) => {
  // const { id } = useParams<{ id: string }>();
  console.log(props?.id);
  console.log(props);

  return (
    <div>
      <TitleDetails />;
    </div>
  );
};

export default Title;
