import {FC} from "react";
import {Container} from "react-bootstrap";
import {IGroupInfo} from "../../../../models/group/IGroupInfo";

interface IDescriptionProps {
    groupInfo: IGroupInfo;
}

const Description: FC<IDescriptionProps> = ({groupInfo}) => {

    return (
        <Container className='description-container'>
            <h1 className='description-container__group-name main-text big-shadow'>СТОРОННІМ В</h1>
            <div className='description-div'>
                {/*TODO*/}
                {/*<p className='description-div__description secondary-text'>{groupInfo.description}</p>*/}
                <p className='description-div__description secondary-text small-shadow'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor,
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
                    Cras vestibulum bibendum augue.</p>
            </div>
        </Container>
    );
}

export {Description};