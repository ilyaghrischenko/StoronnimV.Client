import { FC } from "react";

const SpotifyContainer: FC = () => {
    return (
        <div className="spotify-container">
            <iframe
                className="spotify-container__frame"
                src="https://open.spotify.com/embed/artist/5NipqMGsY4AUeb7kGT8aVz?utm_source=generator&theme=0"
                frameBorder="0"
                allowFullScreen
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
            />
        </div>
    );
};

export { SpotifyContainer };