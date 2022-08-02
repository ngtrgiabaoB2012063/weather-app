import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./App.css";
import DarkMode from "./components/DarkMode";
import Forecase from "./components/Forecase";
import Inputs from "./components/Inputs";
import TemperatureAndDetails from "./components/TemperatureAndDetails";
import TimeAndLocation from "./components/TimeAndLocation";
import TopButtons from "./components/TopButtons";
import getFormattedWeatherData from "./services/weatherServices";

function App() {
    const [query, setQuery] = useState({ q: "berlin" });
    const [units, setUnits] = useState("metric");
    const [weather, setWeather] = useState(null);

    useEffect(() => {
        const fetchWeather = async () => {
            const message = query.q ? query.q : "current location.";

            toast.info("Fetching weather for " + message);

            await getFormattedWeatherData({ ...query, units }).then((data) => {
                toast.success(
                    `Successfully fetched weather for ${data.name}, ${data.country}.`
                );

                setWeather(data);
            });
        };

        fetchWeather();
    }, [query, units]);

    const formatBackground = () => {
        if (!weather) return "from-cyan-700 to-blue-700";
        const threshold = units === "metric" ? 20 : 60;
        if (weather.temp <= threshold) return "from-cyan-700 to-blue-700";

        return "from-yellow-700 to-orange-700";
    };

    return (
        <div className="grid place-items-center max-w-full sm:p-0 body">
            <div
                className={`my-5 py-5 px-32 sm:px-4 sm:my-0 bg-gradient-to-br from-cyan-700 to-blue-700 shadow-md shadow-gray-400 rounded-xl sm:rounded-none ${formatBackground()} `}
            >
                <TopButtons setQuery={setQuery} />
                <Inputs setQuery={setQuery} units={units} setUnits={setUnits} />

                {weather && (
                    <>
                        <TimeAndLocation weather={weather} />
                        <TemperatureAndDetails weather={weather} />

                        <Forecase
                            title="hourly forecast"
                            items={weather.hourly}
                        />
                        <Forecase
                            title="daily forecast"
                            items={weather.daily}
                        />
                    </>
                )}
                <ToastContainer
                    autoClose={5000}
                    theme="colored"
                    newestOnTop={true}
                />
                <DarkMode />
            </div>
        </div>
    );
}

export default App;
