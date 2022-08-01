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
            const message = query.q ? query.q : "Current location.";

            toast.info("Fetching weather for " + message);

            await getFormattedWeatherData({
                ...query,
                units,
            }).then((data) => {
                toast.success(
                    "Successfully fetched weather for " + data.country
                );

                setWeather(data);
            });
        };

        fetchWeather();
    }, [query, units]);

    const formatBackground = () => {
        const threshold = units === "metric" ? 20 : 60;

        if (!weather || weather.temp <= threshold) {
            return "from-cyan-700 to-blue-700";
        }

        return "from-yellow-700 to-orange-700";
    };

    return (
        <div className="body py-8 h-fit">
            <div
                className={`mx-auto max-w-screen-md py-5 px-32 bg-gradient-to-br from-cyan-700 to-blue-700 shadow-md shadow-gray-400 rounded-xl ${formatBackground()}`}
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
                    autoClose={3000}
                    theme="colored"
                    newestOnTop={true}
                />
            </div>
            <DarkMode />
        </div>
    );
}

export default App;
