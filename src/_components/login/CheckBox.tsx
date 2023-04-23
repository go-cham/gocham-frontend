/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import react from "react";
import EmptyCheckIcon from "../../images/Login/empty_check_box.png";
import FillCheckIcon from "../../images/Login/fill_check_box.png";
import { AcceptType } from "../../_pages/login/RegisterTerm";

type CheckBoxType = {
  value: boolean;
  setValue: react.Dispatch<any>;
};
const CheckBox = ({ value, setValue }: CheckBoxType) => {
  return (
    <div css={CheckBoxStyle}>
      {value ? (
        <img
          src={FillCheckIcon}
          alt={"fill check box"}
          onClick={() => setValue(!value)}
        />
      ) : (
        <img
          src={EmptyCheckIcon}
          alt={"empty check box"}
          onClick={() => setValue(!value)}
        />
      )}
    </div>
  );
};
export default CheckBox;

const CheckBoxStyle = css`
  margin-right: 1rem;
`;
