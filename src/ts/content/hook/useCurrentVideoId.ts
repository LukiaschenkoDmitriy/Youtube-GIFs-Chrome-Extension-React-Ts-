import { useContext } from 'react';
import { VideoContext } from '@Content/provider/VideoProvider';

const useCurrentVideoId = () => {
	return { ...useContext(VideoContext) };
};

export default useCurrentVideoId;
