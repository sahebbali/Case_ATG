import axios from "axios";
import {useState} from "react";
import CollapsiblePanel from "./CollapsiblePanel";
import {fakeWait, prettierDateTime} from "./helpers";
import LoadingSkeleton from "./LoadingSkeleton";

export default function ResultRow({name, id, time}) {
  const [contentIsLoading, setContentIsLoading] = useState(false);
  const [races, setRaces] = useState([]);
  function fetchRaces() {
    setContentIsLoading(true);
    axios.get('games/'+id).then(async (result) => {
      await fakeWait(500);
      setRaces(result?.data?.races);
      setContentIsLoading(false);
    });
  }

  return (
    <CollapsiblePanel labelLeft={name} labelRight={prettierDateTime(time)} onOpen={fetchRaces}>
      {contentIsLoading && (
        <LoadingSkeleton />
      )}
      {!contentIsLoading && (
        <>
          {races.length > 0 && races.map(race => (
            <CollapsiblePanel
              size={'sm'}
              key={race?.id}
              labelLeft={`#${race.number} ${race.name || 'Inget namn'}`}
              labelRight={`${prettierDateTime(race.startTime)}`}
            >
              {race?.starts?.length > 0 && race.starts.map(start => (
                <CollapsiblePanel
                  key={start?.number}
                  size={'sm'}
                  labelLeft={`${start?.number} ${start?.horse?.name} - ${start?.driver?.firstName} ${start?.driver?.lastName}`}
                >
                  <div className="text-purple-200/80">
                    <div>Tränare: {start?.horse?.trainer?.firstName} {start?.horse?.trainer?.lastName}</div>
                    <div>Far: {start?.horse?.pedigree?.father?.name}</div>
                  </div>
                </CollapsiblePanel>
              ))}
            </CollapsiblePanel>
          ))}
        </>
      )}
    </CollapsiblePanel>
  );
}