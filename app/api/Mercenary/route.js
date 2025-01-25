// pages/heroes.js
import Mercenary from "@/data/Mercenary";

export async function getStaticProps() {
  try {
    if (!Mercenary || Mercenary.length === 0) {
      return {
        notFound: true, // Jika data tidak ada, halaman akan jadi 404
      };
    }

    return {
      props: {
        mercenaries: Mercenary, // Kirimkan data Mercenary ke halaman
      },
    };
  } catch (error) {
    console.error("Error fetching mercenaries:", error);
    return {
      props: {
        mercenaries: [],
        error: "Internal Server Error",
      },
    };
  }
}

const HeroesPage = ({ mercenaries, error }) => {
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Heroes List</h1>
      <ul>
        {mercenaries.length > 0 ? (
          mercenaries.map((hero) => (
            <li key={hero.id}>{hero.name}</li>
          ))
        ) : (
          <li>No mercenaries found</li>
        )}
      </ul>
    </div>
  );
};

export default HeroesPage;
