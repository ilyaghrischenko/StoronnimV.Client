import {FC, useContext, useEffect} from "react";
import {MusicContext} from "../../contexts/MusicContext";
import {Loading} from "../shared/Loading";
import {Container} from "react-bootstrap";

const SoundCloudContainer: FC = () => {
    const musicContext = useContext(MusicContext);

    if (!musicContext) {
        throw new Error("MusicContext must be used within a MusicContextProvider");
    }

    const {loading, fetchEmbedData, embedHtml} = musicContext;

    useEffect(() => {
        fetchEmbedData();
    }, []);

    if (loading) {
        return (
            <Loading />
        );
    }

    return (
        <Container className='soundcloud-container'>
            <Container
                className="soundcloud-container__embed"
                dangerouslySetInnerHTML={{ __html: embedHtml}}/>
        </Container>
    );
};

export {SoundCloudContainer};