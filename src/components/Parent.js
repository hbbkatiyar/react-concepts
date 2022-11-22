import React, { useRef } from "react";
import Modal from './Modal';

const ParentComponent = () => {
    const childRef = useRef(null);

    const handleOpenModal = (value) => {
        console.log('here...', value);

        childRef.current.openModal(value)
    };

    return (
        <div>
            <p>This is a parent controller</p>

            <Modal ref={childRef} />

            <button onClick={() => handleOpenModal(true)}>Open Modal</button>
        </div>
    );
};

export default ParentComponent;