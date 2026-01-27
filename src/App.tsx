import { useEffect, useState } from "react";

type Joke = {
  id: number;
  type: string;
  setup: string;
  punchline: string;
};

export default function App() {
  const [joke, setJoke] = useState<Joke | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function loadJoke() {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        "https://official-joke-api.appspot.com/random_joke"
      );

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data: Joke = await response.json();
      setJoke(data);
    } catch (err) {
      console.error(err);
      setError("Não foi possível carregar uma piada agora.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadJoke();
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Teste da "Official Joke API"</h1>

      <button onClick={loadJoke} disabled={loading} style={{ marginBottom: 16 }}>
        {loading ? "Carregando..." : "Gerar outra piada"}
      </button>

      {error && <p style={{ color: "crimson" }}>{error}</p>}

      {joke ? (
        <>
          <p>
            <strong>{joke.setup}</strong>
          </p>
          <p>{joke.punchline}</p>
        </>
      ) : (
        !error && <p>Nenhuma piada carregada ainda.</p>
      )}
    </div>
  );
}
