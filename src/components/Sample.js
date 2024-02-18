import React, {useState} from 'react'
import styles from './Landing.module.css'

function Sample() {
    const [modal, setModal] = useState();

    const toggleModal = () =>{
        setModal(!modal);
    }
  return (
    <div>
          
        <div className={styles.modal}>
            <div className={styles.overlay} onClick={toggleModal}>
                <div className={styles.modalcontent} onClick={(e) => e.stopPropagation()}>
                    <p> hello world </p>
                </div>
            </div>
        </div>

      
    </div>
  )
}

export default Sample
