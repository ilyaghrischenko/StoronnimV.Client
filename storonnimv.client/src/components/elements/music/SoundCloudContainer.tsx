import {FC} from "react";
import ReactPlayer from 'react-player/soundcloud';

const SoundCloudContainer: FC = () => {
    return (
        <div className='soundcloud-container'>
            <h2>Слухайте нашу музику на SoundCloud</h2>
            <ReactPlayer
                url="https://soundcloud.com/apostolkremenchug"
                width="100%"
                height="166"
                playing={false}
                controls={true}
            />
        </div>
    );
};

export {SoundCloudContainer};