import Gif from "@Base/dto/Gif";
import GifCard from "@Content/components/GifCard";
import GifsLoading from "@Content/components/GifsLoading";
import React, {useEffect, useRef, useState} from "react";
import gifsData from "./data.json";
import useDIGet from "@Base/hook/useDIGet";
import EventEmitter, {EVENTS} from "@Base/event/EventEmitter";
import {SERVICE} from "@Base/di";
import SearchIcon from "@Content/svg/SeachIcon";

export interface GifsPalletProps {
    type: "Default" | "Answer"
}

const GifsPallet = ({ type }: GifsPalletProps) => {
    const [search, setSearch] = useState("");
    const [gifs, setGifs] = useState([]);
    const [focus, setFocus] = useState(false);
    const blurTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
    const searchInputRef = useRef<HTMLInputElement>(null);

    const emitter = useDIGet<EventEmitter>(SERVICE.EventEmitter);

    // const chromeService = di.get(ChromeService.DI_ID) as ChromeService;

    // const processData = (data: any) => {
    //     console.log(data);
    //     if (data instanceof ErrorResponse) {
    //         console.error(data);
    //         return;
    //     }
    //     setGifs(data);
    // }

    useEffect(() => {
        setGifs(gifsData.map(struct => new Gif(struct)) as any);
        // setGifs([]);
        // if (search === "") {
        //     chromeService.fetch(GC_ENDPOINTS.GIPHY_TRENDING.url, { offset: 0 }).then(processData)
        // } else {
        //     chromeService.fetch(GC_ENDPOINTS.GIPHY_SEARCH.url, { search, offset: 0 }).then(processData)
        // }
    }, [search]);

    const handleFocus = () => {
        if (blurTimeout.current) clearTimeout(blurTimeout.current);
        setFocus(true);
    };

    const handleBlur = () => {
        blurTimeout.current = setTimeout(() => setFocus(false), 150);
    };

    const handleSelect = (gif: Gif) => {
        if (type === "Default") {
            emitter.emit(EVENTS.GIF_SELECTED, gif);
        } else {
            emitter.emit(EVENTS.GIF_ANSWER_SELECTED, gif);
        }
        setFocus(false);
        setSearch("");
        searchInputRef?.current?.blur();
    };

    return (
        <>
            <div className={`yt-gif-search${focus ? " yt-gif-search--focused" : ""}${type == "Answer" ? " yt-gif-search-answer" : " yt-gif-search-default"}`}>
                <SearchIcon />
                <input
                    ref={searchInputRef}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    placeholder="Search GIPHY..."
                    className="yt-gif-search__input"
                />
            </div>

            <div
                className={`yt-gif-dropdown${focus ? " yt-gif-dropdown--visible" : ""}`}
                onMouseDown={(e) => e.preventDefault()}
            >
                {gifs.length > 0 ? (
                    <div className="yt-gif-grid">
                        {gifs.map((gif: Gif, index: number) => (
                            <GifCard
                                key={`gif_card_${index}`}
                                url={gif.url}
                                title={gif.title}
                                onClick={() => handleSelect(gif)}
                            />
                        ))}
                    </div>
                ) : <GifsLoading />}
            </div>
        </>
    );
}

export default GifsPallet;