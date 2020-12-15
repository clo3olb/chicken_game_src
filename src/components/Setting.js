import React from "react";
import { useTracked } from "../state";

import { useState } from "react";

export default function Setting({ setSettingsOpen }) {
  const [state, dispatch] = useTracked();
  const [limit, setLimit] = useState(state.equation.limit);
  const [allowNegative, setAllowNegative] = useState(state.allowNegative);
  function handleLimitChange(event) {
    setLimit(event.target.value);
  }
  function handleAllowNegativeChange(event) {
    setAllowNegative(event.target.checked);
  }

  function handleSubmitClick() {
    if (limit > 0) {
      dispatch({ type: "SET_LIMIT", limit: limit });
      dispatch({
        type: "SET_ALLOW_NEGATIVE",
        allowNegative: parseInt(allowNegative),
      });
      setSettingsOpen(false);
    } else {
      alert("숫자 제한은 양수여야 합니다.");
    }
  }
  return (
    <div className="settings_popup">
      <div className="settings_popup_container">
        <div className="settings_popup_item">
          <div className="item_label">숫자 제한</div>
          <input
            type="number"
            defaultValue={state.equation.limit}
            onChange={handleLimitChange}
          />
        </div>
        <div className="settings_popup_item">
          <div className="item_label">음수 허용</div>
          <input
            type="checkbox"
            onChange={handleAllowNegativeChange}
            defaultChecked={state.allowNegative}
          />
        </div>
        <button className="settings_done" onClick={handleSubmitClick}>
          설정완료
        </button>
      </div>
    </div>
  );
}
