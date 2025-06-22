"use client";
import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import UploadTaskCoponent from './UploadTaskCoponent';

const UploadTaskModal= ({userId, }: {userId: string, }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

 
 
  return (
    <>
      <Button type="primary" onClick={showModal}>
       Add New Task
      </Button>
      <Modal 
        title="নতুন কাজ"
        closable={{ 'aria-label': 'Custom Close Button' }}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer = {null}
        style={{ top: 20, }} // Adjust width as needed
        
      >
        <UploadTaskCoponent userId ={userId}  />
      </Modal>
    </>
  );
};

export default UploadTaskModal;