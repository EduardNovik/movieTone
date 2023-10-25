import axios from "axios";

export async function getServerSideProps() {
  try {
    const response = await axios.get("http://localhost:4000/api/current");
    const initialSession = response.data || null;
    if (initialSession) {
      return {
        session: {
          session: initialSession,
          expires: initialSession.expires,
        },
      };
    } else {
      return {
        session: null,
      };
    }
  } catch (error) {
    console.error(error);
    return {
      session: null,
    };
  }
}
