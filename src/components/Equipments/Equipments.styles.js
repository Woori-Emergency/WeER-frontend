import styled from 'styled-components';

export const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

export const Modal = styled.div`
    background: white;
    padding: 20px;
    border-radius: 8px;
    min-width: 300px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

export const ModalTitle = styled.h2`
    margin-bottom: 20px;
    text-align: center;
    font-size: 1.5rem;
    color: #333;
`;

export const ModalContent = styled.div`
    margin-bottom: 20px;
`;

export const EquipmentGrid = styled.div`
    display: grid;
    gap: 15px;
`;

export const EquipmentItem = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    background-color: #f8f9fa;
    border-radius: 4px;
`;

export const EquipmentLabel = styled.span`
    font-weight: bold;
    color: #495057;
`;

export const EquipmentStatus = styled.span`
    color: ${props => props.available ? '#28a745' : '#dc3545'};
    font-weight: 500;
`;

export const CloseButton = styled.button`
    width: 100%;
    padding: 8px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-weight: 500;
    transition: background-color 0.2s;

    &:hover {
        background-color: #0056b3;
    }

    &:active {
        background-color: #004085;
    }
`;