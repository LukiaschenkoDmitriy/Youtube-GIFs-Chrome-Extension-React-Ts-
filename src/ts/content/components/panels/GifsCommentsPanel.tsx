import Comments from '@Content/components/comment/Comments';
import GifsPalette from '@Content/components/gif/GifsPalette';
import CommentInput from '@Content/components/input/CommentInput';
import useOAuth from '@Base/hook/useOAuth';
import LoginPrompt from '@Content/components/LoginPrompt';

const GifsCommentsPanel = () => {
	const { user } = useOAuth();

	return (
		<div className="yt-gifs-panel">
			{user ? (
				<>
					<GifsPalette type={'Default'} />
					<CommentInput />
				</>
			) : (
				<LoginPrompt />
			)}

			<Comments />
		</div>
	);
};

export default GifsCommentsPanel;
