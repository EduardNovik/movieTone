const About = () => {
  return (
    <div className="mt-20 flex flex-col gap-4 justify-center items-center text-center">
      <p className="font-bold text-2xl">Welcome to movieTone!</p>
      <p className="max-w-2xl">
        This website is designed to help you discover popular and beloved movies
        and series while allowing you to curate your personalized watchlist
        across various genres. Additionally, I've created this platform to
        provide valuable information about each title along with trailers to
        enhance your viewing experience.
      </p>
      <p className="max-w-2xl">
        I developed the entire project using turborepo, consolidating the
        backend, frontend, and packages into a single monorepo structure, neatly
        organized into 'be', 'fe', and 'packages' directories. The 'packages'
        directory contains shared resources such as eslint and TypeScript
        configurations, Tailwind configurations, as well as shared UI components
        from Shadcn, and the database schema created with Drizzle.
      </p>
      <p className="max-w-2xl">
        From a technical standpoint, I utilized Express.js with TypeScript for
        the backend, Docker-compose for containerization, and PostgreSQL
        alongside Drizzle ORM for efficient data storage.
      </p>
      <p className="max-w-2xl">
        For user authentication, I implemented Supertokens.
      </p>
      <p className="max-w-2xl">
        On the frontend, I employed React with TypeScript and Zod for type
        validation, utilizing Vite as the builder. Styling is facilitated by
        Tailwind CSS, supplemented by components from Shadcn. Request handling
        to the backend is managed through SWR, Axios, and GraphQL.
      </p>
      <p className="max-w-2xl">
        For state management, I utilized LocalStorage as a persisted store and
        Zustand and Redux Toolkit as global stores.
      </p>
      <p className="max-w-2xl">
        I invite you to explore my implementation on GitHub via the link below:
      </p>
      <a
        href="https://github.com/EduardNovik/movieTone"
        target="_blank"
        className="text-blue-400 font-bold text-2xl hover:scale-125 duration-700 hover:translate-y-[-2px]"
      >
        GITHUB
      </a>
      <p className="max-w-2xl">
        Feel free to reach out to me with any feedback or inquiries. Happy
        browsing and happy watching!
      </p>
    </div>
  );
};

export default About;
