import { useEffect, useState } from "react";
import "./App.css";

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
    <div className="container">
      <div className="card">
        <h1>😂 Random Joke</h1>

        <button onClick={loadJoke} disabled={loading}>
          {loading ? "Carregando..." : "Gerar outra piada"}
        </button>

        {error && <p className="error">{error}</p>}

        {joke && (
          <div className="joke">
            <p className="setup">{joke.setup}</p>
            <p className="punchline">{joke.punchline}</p>
          </div>
        )}
      </div>
    </div>
  );
}
