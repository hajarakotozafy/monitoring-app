import React from 'react';
import { LeftSide, Overlay, PopupContainer, PopupForm, PopupInner, RightSide } from './Popup.styled';
import Button from '../Button';
import Image from '../../assets/images/account_image.png'

const Popup = ({displayPopup, setDisplayPopup}) => {
    return(
        <PopupContainer>
            <PopupInner>
                <LeftSide>
                    <img src={Image}/>
                </LeftSide>
                <RightSide>

                <h1>NOUVEAU CLIENT</h1>
                <PopupForm>
                    <div className='form-control'>
                        <p>Client numéro: 000008</p>
                        <input type="number" value="000008" disabled hidden/>
                    </div>
                    <div className='form-control'>
                        <label htmlFor="">Nom du Client :</label>
                        <input type="text" placeholder='Nom du client' required/>
                    </div>
                    <div className='form-control'>
                        <label htmlFor="">Montant :</label>
                        <input type="number" placeholder='Montant'required/>
                    </div>
                    <Button onClick={()=> setDisplayPopup(!displayPopup)} type='btn--primary'>Enregistrer</Button>
                </PopupForm>
                </RightSide>
            </PopupInner>
            <Overlay onClick={()=> setDisplayPopup(!displayPopup)}/>
        </PopupContainer>
    )
}

export default Popup;