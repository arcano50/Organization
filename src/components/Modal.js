import React, {useEffect, useState} from 'react'
import Modal from 'react-modal'
import { useForm } from "react-hook-form"

const [isOpen,setIsOpen] = useState(false);

function open(index) {
  setIsOpen(true);
  setIndex(index.split('.'))
}

function initialize() {
  // references are now sync'd and can be accessed.
  //subtitle.style.color = '#f00';
}

function close(){
  setIsOpen(false);
}

export default () =>
  <Modal
    ariaHideApp={false}
    isOpen={isOpen}
    onAfterOpen={initialize}
    onRequestClose={close}
    contentLabel='Nuevo'>
      <UserInformation/>
  </Modal>