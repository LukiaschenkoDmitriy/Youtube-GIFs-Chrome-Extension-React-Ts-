import GifsPallet from "@Content/components/GifsPallet";
import CommentInput from "@Content/components/CommentInput";
import Comments from "@Content/components/Comments";

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