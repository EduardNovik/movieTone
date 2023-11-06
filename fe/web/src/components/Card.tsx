import React from 'react';
import starIcon from '../assets/iconfinder_star.png';

interface cardProps {
  item: Record<string, any>;
}

const Card = ({ item }: cardProps) => {
  return (
    <div className="w-full flex flex-col items-center md:w-1/2 relative p-4">
      <img
        src={`https://www.themoviedb.org/t/p/original/${item.backdrop_path}`}
        alt="cover_img"
        className="rounded-lg"
      />
      <p className="text-center">{item.title ? item.title : item.name}</p>
      <span className="flex gap-2 absolute top-8 right-8 items-center">
        <p className="text-yellow-500">
          {Math.round(item.vote_average * 10) / 10}
        </p>
        <img src={starIcon} alt="" className="w-4 h-4" />
      </span>
    </div>
  );
};

export default Card;
