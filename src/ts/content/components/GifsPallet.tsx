import Gif from "@Base/dto/Gif";
import GifCard from "@Content/components/GifCard";
import GifsLoading from "@Content/components/GifsLoading";
import React, {useEffect, useRef, useState} from "react";
import useDIGet from "@Base/hook/useDIGet";
import EventEmitter, {EVENTS} from "@Base/event/EventEmitter";
import {SERVICE} from "@Base/di";
import SearchIcon from "@Content/svg/SeachIcon";
import ChromeService from "@Base/service/chrome";
import ENDPOINTS from "@Base/service/client/endpoints";
import useDebounce from "@Content/hook/useDebounce";

export interface GifsPalletProps {
    type: "Default" | "Answer"
}

const GifsPallet = ({ type }: GifsPalletProps) => {
    const [search, setSearch] = useState("");
    const debounceSearch = useDebounce(search, 1000);
    const [gifs, setGifs] = useState([]);
    const [focus, setFocus] = useState(false);
    const blurTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
    const searchInputRef = useRef<HTMLInputElement>(null);

    const emitter = useDIGet<EventEmitter>(SERVICE.EventEmitter);

    const chromeService = useDIGet<ChromeService>(SERVICE.ChromeService);

    useEffect(() => {
        setGifs([]);
        if (search === "") {
            chromeService.fetch(ENDPOINTS.GIPHY.TRENDING.NAME, { offset: 0 }).then(setGifs)
        } else {
            chromeService.fetch(ENDPOINTS.GIPHY.SEARCH.NAME, { search: debounceSearch, offset: 0 }).then(setGifs)
        }
    }, [debounceSearch]);

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