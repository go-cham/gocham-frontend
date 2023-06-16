import { useState } from 'react';
import Dropdown from '../../images/Common/dropdown.svg';
import XButton from '../../images/Common/x_button.svg';
import styled from '@emotion/styled';
import palette from '../../style/color';
import { categoryOptions, OptionType } from '../../constants/Options';
const MultiPickerComponent = ({
  categoryOptions,
  selectedValue,
  clickAction,
}: {
  categoryOptions: OptionType[];
  selectedValue: OptionType[];
  clickAction: (item: any) => void;
}) => {
  // console.log(categoryOptions);
  const [openOptionListMenu, setOpenOptionListMenu] = useState(false);
  const handleOption = (value: any, type: string) => {
    if (type === 'add') {
      // 4개까지 선택가능임.
      if (selectedValue.length < 4) {
        // 이미 있는거면 중복안되도록 처리
        const existingItem = selectedValue.find(
          (element) => element.value === value.value
        );
        if (!existingItem) {
          // 이미 존재하는 아니면 추가
          const newItems = [...selectedValue, value];
          clickAction(newItems);
        }
      }
    } else if (type === 'remove') {
      const newItems = selectedValue.filter(
        (element) => element.value !== value.value
      );
      clickAction(newItems);
    }
  };
  return (
    <MultiPickerWrap>
      {/*선택창 컨포넌트*/}
      <MultiPickerBox
        openOptionListMenu={openOptionListMenu}
        onClick={() => setOpenOptionListMenu(!openOptionListMenu)}
      >
        <p>최대 4개 선택가능</p>
        <img src={Dropdown} alt={'드롭다운'} />
      </MultiPickerBox>
      {/*  옵션리스트 메뉴  */}
      {openOptionListMenu && (
        <OptionListMenuWrap>
          {categoryOptions?.map((item) => {
            return (
              <OptionBox onClick={() => handleOption(item, 'add')}>
                {item.label}
              </OptionBox>
            );
          })}
        </OptionListMenuWrap>
      )}
      {/*  선택된 아이들 뿌려줄 친구들*/}
      <SelectedOptionWrap>
        {selectedValue?.map((item) => {
          return (
            <SelectedOptionBox>
              {item.label}
              <img
                src={XButton}
                alt={'X'}
                onClick={() => handleOption(item, 'remove')}
              />
            </SelectedOptionBox>
          );
        })}
      </SelectedOptionWrap>
    </MultiPickerWrap>
  );
};
export default MultiPickerComponent;

const SelectedOptionBox = styled.p`
  //display: inline-block;
  display: flex;
  align-items: center;
  padding: 0.7rem 0.6rem 0.7rem 1rem;
  background-color: ${palette.Secondary};
  border-radius: 0.7rem;
  color: white;
  & img {
    margin-left: 0.2rem;
  }
`;

const OptionBox = styled.div`
  margin: 1.7rem 1.5rem;
  text-align: right;
  font-size: 1.2rem;
  letter-spacing: -0.03em;
  font-weight: 500;
`;

const SelectedOptionWrap = styled.div`
  margin-top: 1.1rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.7rem;
`;

const MultiPickerWrap = styled.div`
  position: relative;
`;

const OptionListMenuWrap = styled.div`
  width: 15.5rem;
  height: 13.1rem;
  background: #ffffff;
  box-shadow: 0 0 2.5rem rgba(42, 45, 55, 0.1);
  border-radius: 1.2rem;
  position: absolute;
  right: 0;
  top: 6rem;
  overflow-y: scroll;
`;

const MultiPickerBox = styled.div<{ openOptionListMenu: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background: rgba(0, 0, 0, 0);
  //border: 0;
  box-sizing: border-box;
  height: 5.5rem;
  font-size: 1.2rem;
  color: rgba(42, 45, 55, 0.7);
  border-radius: 0;
  transition: border-width 0.1s ease-in-out;
  border-bottom: ${({ openOptionListMenu }) =>
    openOptionListMenu
      ? `0.4rem solid ${palette.Gray1}`
      : `0.2rem solid ${palette.Gray1}`}}
`;

// { {
//     openOptionListMenu
// } = >( {
//     `openOptionListMenu ? `0.4rem solid ${palette.Gray1}` : `0.2rem solid ${palette.Gray1}})
//     `
