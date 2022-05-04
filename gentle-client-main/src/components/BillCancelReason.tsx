import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useHandleBillCancelMutation } from "../generated/graphql";

interface BillCancelReasonProps {
  billId: number;

  callBack: Function;
}

const BillCancelReason = ({ billId, callBack }: BillCancelReasonProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [reasonText, setReasonText] = useState("");
  const [handleBillCancelMutation] = useHandleBillCancelMutation();
  const toast = useToast();
  const handleBillCancel = async () => {
    const res = await handleBillCancelMutation({
      variables: {
        billId,
        reason: reasonText.trim(),
      },
    });
    if (res.data?.handleBillCancel.success) {
        toast({
        title: "Thông báo",
        description:
          "Cảm ơn quý khách đã ghé thăm cửa hàng, kính chúc quý khách có những giây phút mua sắm thật thoải mái!",
        status: "info",
        isClosable: true,
        duration: 5000,
        position:"top"
      });
      onClose();

      callBack(billId);
    }
    if (res.errors) console.log(res.errors);
  };
  return (
    <>
      <Button onClick={onOpen} className="noneBorder" marginTop={12}>Hủy đơn</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>HỦY ĐƠN</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div>
              <h3>
                Kính mong quý khách cho chúng tôi xin lý do hủy đơn để chúng tôi
                có thể cải thiện chất lượng phục vụ cho quý khách, Thành thật
                cảm ơn quý khách!
              </h3>
              <Textarea
                value={reasonText}
                onChange={(event) => setReasonText(event.target.value)}
              />
            </div>
          </ModalBody>

          <ModalFooter>
            <Button  mr={3} onClick={onClose}>
              Quay lại
            </Button>
            <Button variant="ghost" onClick={handleBillCancel}>
              Hủy
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default BillCancelReason;
