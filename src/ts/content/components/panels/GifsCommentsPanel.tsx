import Comments from '@Content/components/comment/Comments';
import GifsPallet from '@Content/components/gif/GifsPallet';
import CommentInput from '@Content/components/input/CommentInput';
import useOAuth from '@Base/hook/useOAuth';
import LoginPrompt from '@Content/components/LoginPrompt';
import { useEffect } from 'react';

const GifsCommentsPanel = () => {
	const { user } = useOAuth();

	return (
		<div className="yt-gifs-panel">
			{user ? (
				<>
					<GifsPallet type={'Default'} />
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
