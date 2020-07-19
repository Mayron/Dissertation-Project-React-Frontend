import React from "react";
import ReactTooltip from "react-tooltip";

interface IQuestionTooltipProps {
  id: string;
  text?: string;
}

const QuestionTooltip: React.FC<IQuestionTooltipProps> = ({ id, text, children }) => {
  return (
    <div data-tip data-for={id}>
      <ReactTooltip id={id} type="light" effect="solid" className="q-tooltip">
        <div>
          {text && <p>{text}</p>}
          {children}
        </div>
      </ReactTooltip>
    </div>
  );
};

export default QuestionTooltip;
