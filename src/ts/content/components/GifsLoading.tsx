const SKELETON_COUNT = 9;

const GifsLoading = () => {
    return (
        <div className="gifs-loading">
            {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
                <div key={i} className="gifs-loading__item">
                    <div className="gifs-loading__shimmer" />
                </div>
            ))}
        </div>
    );
};

export default GifsLoading;