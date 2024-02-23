import React from 'react';
import { Overlay, PopupContainer, PopupForm, PopupInner } from './Popup.styled';
import Button from '../Button';

const Popup = ({displayPopup, setDisplayPopup}) => {
    return(
        <PopupContainer>
            <PopupInner>
                <h1>NOUVEAU CLIENT</h1>
                <PopupForm>
                    <div className='form-control'>
                        <p>Client numéro: 000008</p>
                        <label htmlFor="">Numéro de Compte :</label>
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
            </PopupInner>
            <Overlay onClick={()=> setDisplayPopup(!displayPopup)}/>
        </PopupContainer>
    )
}

export default Popup;