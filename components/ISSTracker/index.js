import { useEffect, useState } from "react";
import Controls from "../Controls/index";
import Map from "../Map/index";
import useSWR from "swr";

const URL = "https://api.wheretheiss.at/v1/satellites/25544";
const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function ISSTracker() {
  const { data, error } = useSWR(URL, fetcher, { refreshInterval: 5000 });
  const [coords, setCoords] = useState({ longitude: 0, latitude: 0 });

  useEffect(() => {
    if (data) {
      setCoords({ longitude: data.longitude, latitude: data.latitude });
    }
  }, [data]);

  if (error) {
    return <div>failed to load</div>;
  }

  if (!coords.longitude || !coords.latitude) {
    return <div>loading...</div>;
  }

  return (
    <main>
      <Map longitude={coords.longitude} latitude={coords.latitude} />
      <Controls
        longitude={coords.longitude}
        latitude={coords.latitude}
        onRefresh={() => setCoords({ longitude: 0, latitude: 0 })}
      />
    </main>
  );
}
