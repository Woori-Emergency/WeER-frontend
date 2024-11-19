import * as S from '../NoTransfer/NoTrasnfer.styles';

const NoTransfer = () => {
    return (<S.NoTransferAlert>
    <S.AlertIcon>⚠️</S.AlertIcon>
    <S.AlertText>현재 진행중인 이송이 없습니다</S.AlertText>
  </S.NoTransferAlert>
    );
};

export default NoTransfer;