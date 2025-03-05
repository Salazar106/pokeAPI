import React, { useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { useRefreshTable } from "../../hooks/refreshTable";

export default function ModalForms({ nameBtn, children, title, table, color, isPreview, onCloseProp }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [backdrop, setBackdrop] = React.useState("opaque");
  const sizeModal = isPreview?"5xl":"xl"
  const {refresh, setRefresh} = useRefreshTable()

  const handleOpen = (backdrop) => {
    setBackdrop(backdrop);
    onOpen();
  };
  
  const handleClose = () => {
    onClose();
  };

  useEffect(() => {
    refresh && onClose()
    setRefresh(false)  
  }, [refresh])
  

  return (
    <>
      <div className="flex flex-wrap gap-3">
        {!table?(<Button
          color={color?color:"primary"}
          onPress={() => handleOpen("blur")}
          className="focus:outline-none hover:border-primary min-w-40"
        >
          {nameBtn}
        </Button>):(
            <div 
                onClick={() => handleOpen("blur")}
                className={`text-${color} bg-transparent p-2 cursor-pointer transition-all duration-200 hover:scale-125`}
                title={title}
            >
                {nameBtn}
            </div>
        )}
        
      </div>
      <Modal
        size={sizeModal}
        backdrop={backdrop}
        isOpen={isOpen}
        onClose={handleClose}
        scrollBehavior={"inside"}
        className=""
      >
        <ModalContent className="pb-5">
          <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
          <ModalBody className="">{children}</ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
