import React from "react";
import { iconUrlFromCode } from "../services/weatherServices";

function Forecase({ title, items }) {
    return (
        <div>
            <div className="flex items-center justify-start my-6">
                <p className="text-white font-medium uppercase">{title}</p>
            </div>
            <hr className="my-2" />

            <div className="flex flex-row items-center justify-between text-white">
                {items.map((item) => (
                    <div key={item.id} className="flex flex-col items-center justify-center">
                        <p className="font-light text-sm">{item.title}</p>

                        <img
                            src={iconUrlFromCode(item.icon)}
                            alt=""
                            className="w-12 my-1"
                        />

                        <p className="font-medium">{`${item.temp.toFixed()}°`}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Forecase;
