import starIcon from '../assets/iconfinder_star.png';
import { useNavigate } from '@tanstack/react-router';

interface cardProps {
  item: Record<string, any>;
}

const Card = ({ item }: cardProps) => {
  const navigate = useNavigate();
  return (
    <div className="content w-full flex flex-col items-center md:w-1/2 relative p-4 ease-in-out duration-300 cursor-pointer">
      <img
        src={`https://www.themoviedb.org/t/p/original/${item.backdrop_path}`}
        alt="cover_img"
        className="rounded-lg"
        loading="lazy"
        onClick={() => navigate({ to: '/title/$id', params: { id: item.id } })}
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
