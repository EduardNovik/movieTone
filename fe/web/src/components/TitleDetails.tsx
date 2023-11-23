import { useParams } from '@tanstack/react-router';
import React from 'react';

const TitleDetails = ({ id }: { id: string }) => {
  // const { id } = useParams(props);

  console.log(id);
  // console.log(otherProps);
  return <div>Details</div>;
};

export default TitleDetails;
