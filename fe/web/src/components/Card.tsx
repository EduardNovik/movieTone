import starIcon from '../assets/iconfinder_star.png';
import { useNavigate } from '@tanstack/react-router';
import { Button, useToast } from '@movieTone/ui';
import axios from 'axios';
import { Plus, ScrollText } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuGroup,
} from '@movieTone/ui';

import useUserWatchlistsSWR from '../api/SWR/useUserWatchlistsSWR';
import { useRef } from 'react';

interface CardProps {
  item: Record<string, any>;
}

interface Watchlist {
  id: string;
  name: string;
  ganre: string;
  userId: string;
}

const Card = ({ item }: CardProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { data } = useUserWatchlistsSWR();

  const addTitleToWatchlist = async (watchlist: Watchlist) => {
    try {
      await axios.post(`${window.origin}/api/watchlist/addTitle`, {
        id: item.id,
        name: item.title ? item.title : item.name,
        img: item.backdrop_path,
        imdb: item.vote_average,
        year: parseInt(item.release_date.replace(/-/g, '')),
        description: item.overview,
        watchlistid: watchlist.id,
      });
      toast({ title: 'Title added' });
    } catch (error: any) {
      toast({ variant: 'destructive', title: 'Something went wrong.' });
      console.log(error);
    }
  };

  // const addTitleAndCreateWatchlist = async (watchlist: Watchlist) => {
  //   try {
  //     await axios.post(`${window.origin}/api/watchlist/addTitle`, {
  //       id: item.id,
  //       name: item.title ? item.title : item.name,
  //       img: item.backdrop_path,
  //       imdb: item.vote_average,
  //       year: parseInt(item.release_date.replace(/-/g, '')),
  //       description: item.overview,
  //       watchlistid: watchlist.id,
  //     });
  //     toast({ title: 'Title added' });
  //   } catch (error: any) {
  //     toast({ variant: 'destructive', title: 'Something went wrong.' });
  //     console.log(error);
  //   }
  // };

  const ref = useRef<HTMLDivElement>(null);

  const showCurtain = () => {
    const currentElement = ref.current;
    if (currentElement) {
      currentElement.style.opacity = '50%';
    }
  };

  const hideCurtain = () => {
    const currentElement = ref.current;
    if (currentElement) {
      currentElement.style.opacity = '0%';
    }
  };

  return (
    <div
      className="content w-full flex flex-col items-center lg:w-1/3  ease-in-out duration-300 cursor-pointer hover:scale-105 p-3"
      onMouseEnter={showCurtain}
      onMouseLeave={hideCurtain}
    >
      <div className="relative dark:shadow-2xl hover:drop-shadow-2xl drop-shadow-md rounded-md dark:hover:shadow-myViolet ease-in-out duration-300">
        <img
          src={`https://www.themoviedb.org/t/p/original/${item.backdrop_path}`}
          alt="cover_img"
          className="rounded-lg"
          loading="lazy"
          onClick={() =>
            navigate({ to: '/title/$id', params: { id: item.id } })
          }
        />
        <p className="text-center absolute top-4 left-8 text-white">
          {item.title ? item.title : item.name}
        </p>
        <span className="flex gap-2 absolute top-4 right-8 items-center">
          <p className="text-yellow-500">
            {Math.round(item.vote_average * 10) / 10}
          </p>
          <img src={starIcon} alt="" className="w-4 h-4" />
        </span>
        <div
          ref={ref}
          className="opacity-0 absolute bottom-0 left-0 right-0 bg-black h-10 z-20 rounded-b-lg transition-all duration-300"
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-white">{item.title ? item.title : item.name}</p>
          </div>
        </div>

        {Array.isArray(data) && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="py-0 px-2">
                <ScrollText size={15} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="max-w-xs">
              <DropdownMenuGroup>
                {data?.map((watchlist: Watchlist) => {
                  return (
                    <DropdownMenuItem
                      key={watchlist.id}
                      className="cursor-pointer hover:bg-gray-200"
                      onClick={() => addTitleToWatchlist(watchlist)}
                    >
                      {watchlist.name}
                      <DropdownMenuShortcut>
                        <Plus size={15} />
                      </DropdownMenuShortcut>
                    </DropdownMenuItem>
                  );
                })}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
  );
};

export default Card;

// For the future ==========================================================

// const contentRef = useRef(null);

// // Callback function when the content element enters the viewport
// const handleIntersection = (
//   entries: any[],
//   observer: { unobserve: (arg0: any) => void },
// ) => {
//   entries.forEach(entry => {
//     if (entry.isIntersecting) {
//       // Add a CSS class to trigger the animation
//       if (contentRef.current !== null) {
//         contentRef.current.classList.add('animate-in');
//         observer.unobserve(entry.target); // Stop observing once animation is triggered
//       }
//     }
//   });
// };

// maybe add infinit scroll+++++++++++++++++++

// useEffect(() => {
//   const options = {
//     root: null,
//     rootMargin: '0px',
//     threshold: 0.5, // Adjust this threshold as needed
//   };

//   const observer = new IntersectionObserver(handleIntersection, options);

//   if (contentRef.current) {
//     observer.observe(contentRef.current); // Start observing the content element
//   }

//   return () => {
//     if (contentRef.current) {
//       observer.unobserve(contentRef.current); // Cleanup
//     }
//   };
// }, []);
