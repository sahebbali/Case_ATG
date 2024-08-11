import axios from "axios";
import {useEffect, useState} from "react";
import BetTypeSelect from "./BetTypeSelect";
import {fakeWait} from "./helpers";
import LoadingSkeleton from "./LoadingSkeleton";
import ResultRow from "./ResultRow";
import {options as betTypes} from "./BetTypeSelect";

axios.defaults.baseURL = 'https://www.atg.se/services/racinginfo/v1/api/';

function App() {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [betType, setBetType] = useState(betTypes?.[0]);
  useEffect(() => {
    setIsLoading(true);
    axios.get('products/'+betType).then(async (result) => {
      await fakeWait(500);
      setResults(result.data?.results);
      setIsLoading(false);
    });
  }, [betType]);
  return (
    <main className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="uppercase text-5xl text-center font-bold bg-gradient-to-br from-purple-600 to-sky-400 bg-clip-text text-transparent from-40%">Horse betting results</h1>
      <div className="mt-6">
        <BetTypeSelect value={betType} onChange={e => setBetType(e.target.value)} />
      </div>
      <div className="mt-6">
        {isLoading && (
          <LoadingSkeleton />
        )}
        {!isLoading && results?.length > 0 && results.map(result => (
          <ResultRow
            key={result?.id}
            name={result?.tracks?.map(t => t.name).join(', ')}
            id={result?.id}
            time={result?.startTime}
          />
        ))}
      </div>
    </main>
  );
}

export default App;
