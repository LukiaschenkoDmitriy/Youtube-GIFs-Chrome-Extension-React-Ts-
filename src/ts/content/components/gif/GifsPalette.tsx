import React, { useEffect, useRef, useState } from 'react';
import Gif from '@Base/dto/Gif';
import EVENTS from '@Base/events';
import { DIServices } from '@Base/di';
import useDIGet from '@Base/hook/useDIGet';
import SearchIcon from '@Content/svg/SearchIcon';
import EventEmitter from '@Base/event/EventEmitter';
import useDebounce from '@Content/hook/useDebounce';
import GifCard from '@Content/components/gif/GifCard';
import GifsLoading from '@Content/components/gif/GifsLoading';
import GifClientProvider from '@Client/runtime/GifClientProvider';

export interface GifsPaletteProps {
	type: 'Default' | 'Answer';
}

const GifsPalette = ({ type }: GifsPaletteProps) => {
	const [gifs, setGifs] = useState<Gif[]>([]);
	const [search, setSearch] = useState('');
	const [focus, setFocus] = useState(false);

	const searchInputRef = useRef<HTMLInputElement>(null);
	const blurTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

	const debounceSearch = useDebounce(search, 1000);
	const emitter = useDIGet<EventEmitter>(DIServices.EventEmitter);

	useEffect(() => {
		setGifs([]);

		if (debounceSearch !== '') GifClientProvider.search(debounceSearch, 0).then(g => setGifs(g ?? []));
		else GifClientProvider.getTrending(0).then(g => setGifs(g ?? []));
	}, [debounceSearch]);

	const handleFocus = () => {
		if (blurTimeout.current) clearTimeout(blurTimeout.current);
		setFocus(true);
	};

	const handleBlur = () => {
		blurTimeout.current = setTimeout(() => setFocus(false), 150);
	};

	const handleSelect = (gif: Gif) => {
		if (type == 'Default') emitter.emit(EVENTS.GIF_SELECTED, gif);
		else emitter.emit(EVENTS.GIF_ANSWER_SELECTED, gif);

		setFocus(false);
		setSearch('');
		searchInputRef?.current?.blur();
	};

	return (
		<>
			<div className={`yt-gif-search${focus ? ' yt-gif-search--focused' : ''}${type == 'Answer' ? ' yt-gif-search-answer' : ' yt-gif-search-default'}`}>
				<SearchIcon />
				<input ref={searchInputRef} value={search} onChange={e => setSearch(e.target.value)} onFocus={handleFocus} onBlur={handleBlur} placeholder="Search GIPHY..." className="yt-gif-search__input" />
			</div>

			<div className={`yt-gif-dropdown${focus ? ' yt-gif-dropdown--visible' : ''}`} onMouseDown={e => e.preventDefault()}>
				{gifs.length > 0 ? (
					<div className="yt-gif-grid">
						{gifs.map((gif: Gif, index: number) => (
							<GifCard key={`gif_card_${index}`} url={gif.url} title={gif.title} onClick={() => handleSelect(gif)} />
						))}
					</div>
				) : (
					<GifsLoading />
				)}
			</div>
		</>
	);
};

export default GifsPalette;
