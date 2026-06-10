interface GifCardProps {
	url: string;
	title: string;
	onClick: () => void;
}

const GifCard = ({ url, title, onClick }: GifCardProps) => {
	return (
		<div className={`yt-gif-card yt-gif-card`} onClick={() => onClick()}>
			<img loading={'lazy'} src={url} alt={title} />
		</div>
	);
};

export default GifCard;
