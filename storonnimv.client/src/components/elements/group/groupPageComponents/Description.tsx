import {FC, useEffect, useRef} from "react";
import {Container} from "react-bootstrap";
import {IGroupInfo} from "../../../../models/group/IGroupInfo";

interface IDescriptionProps {
    groupInfo: IGroupInfo;
}

const Description: FC<IDescriptionProps> = ({groupInfo}) => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            const scrollElement = scrollRef.current;
            const containerElement = containerRef.current;

            if (scrollElement && containerElement) {
                const scrollHeight = scrollElement.scrollHeight;
                const containerHeight = containerElement.clientHeight;
                const distance = scrollHeight - containerHeight;

                const speed = 15; // пикселей в секунду вниз
                const downDuration = distance / speed;
                const upDuration = downDuration / 8; // вверх быстрее
                const totalDuration = downDuration + upDuration;

                scrollElement.animate([
                    { transform: 'translateY(0)', offset: 0 },
                    { transform: `translateY(-${distance}px)`, offset: downDuration / totalDuration },
                    { transform: 'translateY(0)', offset: 1 }
                ], {
                    duration: totalDuration * 1000,
                    iterations: Infinity,
                    easing: 'linear'
                });
            }
        }, 3000);

        return () => clearTimeout(timeoutId);
    }, []);

    return (
        <Container className='description-container'>
            <h1 className='description-container__group-name main-text big-shadow'>СТОРОННІМ В</h1>
            <div className='description-div' ref={containerRef}>
                <div className='scrolling-text' ref={scrollRef}>
                    {/*TODO*/}
                    {/*<p className='description-div__description secondary-text'>{groupInfo.description}</p>*/}
                    <p className='description-div__description secondary-text small-shadow'>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor,
                        dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas
                        ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy molestie,
                        enim est eleifend mi, non fermentum diam nisl sit amet erat. Duis semper. Duis arcu massa, scelerisque
                        vitae, consequat in, pretium a, enim. Pellentesque congue. Ut in risus volutpat libero pharetra tempor.
                        Cras vestibulum bibendum augue.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor,
                        dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas
                        ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy molestie,
                        enim est eleifend mi, non fermentum diam nisl sit amet erat. Duis semper. Duis arcu massa, scelerisque
                        vitae, consequat in, pretium a, enim. Pellentesque congue. Ut in risus volutpat libero pharetra tempor.
                        Cras vestibulum bibendum augue.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor,
                        dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas
                        ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy molestie,
                        enim est eleifend mi, non fermentum diam nisl sit amet erat. Duis semper. Duis arcu massa, scelerisque
                        vitae, consequat in, pretium a, enim. Pellentesque congue. Ut in risus volutpat libero pharetra tempor.
                        Cras vestibulum bibendum augue.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor,
                        dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas
                        ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy molestie,
                        enim est eleifend mi, non fermentum diam nisl sit amet erat. Duis semper. Duis arcu massa, scelerisque
                        vitae, consequat in, pretium a, enim. Pellentesque congue. Ut in risus volutpat libero pharetra tempor.
                        Cras vestibulum bibendum augue.
                    </p>
                </div>
            </div>
        </Container>
    );
}

export {Description};