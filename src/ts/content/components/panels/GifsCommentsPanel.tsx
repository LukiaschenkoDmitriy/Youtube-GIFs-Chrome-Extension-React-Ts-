import Comments from "@Content/components/comment/Comments";
import GifsPallet from "@Content/components/gif/GifsPallet";
import CommentInput from "@Content/components/input/CommentInput";

const GifsCommentsPanel = () => {
    return (
        <div className="yt-gifs-panel">
            <GifsPallet type={"Default"}/>
            <CommentInput/>
            <Comments />
        </div>
    );
}

export default GifsCommentsPanel;