import React, { useState, useContext } from "react";
import Panel from "./panel";
import ProfilePic from "../../images/placeholder-profile-pic.svg";
import TextareaAutosize from "react-autosize-textarea";
import {
  Dropdown,
  DropdownOnSearchChangeData,
  DropdownItemProps,
} from "semantic-ui-react";
import api, { invokeApiHub } from "../../api";
import { SignalRContext } from "../providers/signalr-provider";
import { addPendingMessage } from "../../utils";
import { toast } from "react-toastify";
import Loading from "./loading";

interface ICreatePostPopupProps {
  displayName: string;
  group: FormValue<string>;
  selectGroup?: boolean;
  onCancel: () => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  title: FormValue<string>;
  body: FormValue<string>;
  onChange: (name: string, value: string) => void;
  loading: boolean;
  defaultOptions?: DropdownItemProps[];
}

const CreatePostPopup: React.FC<ICreatePostPopupProps> = ({
  displayName,
  group,
  selectGroup,
  onCancel,
  onSubmit,
  title,
  body,
  onChange,
  loading,
  defaultOptions = [],
}) => {
  const connection = useContext(SignalRContext);
  const [options, setOptions] = useState<DropdownItemProps[]>(defaultOptions);
  const [isFetching, setIsFetching] = useState(false);

  const handleSearchChange = (
    _: React.SyntheticEvent<HTMLElement>,
    { searchQuery }: DropdownOnSearchChangeData,
  ) => {
    invokeApiHub<IPayloadEvent<NamedEntity[]>>(
      connection,
      "SearchGroups",
      (response) => {
        if (response.errors) {
          toast.error(response.errors);
          setIsFetching(false);
          return;
        }

        if (response.payload) {
          const nextOptions = response.payload.map((r) => {
            return { key: r.id, value: r.id, text: r.name };
          });

          setOptions(nextOptions);
        }

        setIsFetching(false);
      },
      () => setIsFetching(false),
      searchQuery,
    );

    setIsFetching(true);
  };

  return (
    <Panel className="create-post">
      {loading && <Loading dimmer />}
      <header>
        <img src={ProfilePic} alt="profile" />
        <div className="post-user">
          <p>
            Posting as <a className="user">{displayName}</a>
          </p>
        </div>
      </header>
      <form onSubmit={onSubmit}>
        <div className="body">
          {title.error && <span className="error">{title.error}</span>}
          <TextareaAutosize
            placeholder="Title"
            className="title-input"
            required
            rows={1}
            maxLength={200}
            onChange={(e) => onChange("title", e.currentTarget.value)}
            value={title.value}
          />
          <TextareaAutosize
            placeholder="(Optional) Write more..."
            className="more-input"
            rows={1}
            maxLength={2000}
            onChange={(e) => onChange("body", e.currentTarget.value)}
            value={body.value}
          />
        </div>
        {group.error && <span className="error">{group.error}</span>}
        <footer>
          {selectGroup && (
            <Dropdown
              placeholder="Select Group"
              fluid
              search
              error={group.error ? true : false}
              selection
              value={group.value}
              options={options}
              onSearchChange={handleSearchChange}
              onChange={(_, { value }) => onChange("group", `${value}`)}
              loading={isFetching}
            />
          )}
          <button className="btn-secondary" onClick={onCancel}>
            Cancel
          </button>
          <button className="btn-primary" type="submit">
            Post
          </button>
        </footer>
      </form>
    </Panel>
  );
};

export default CreatePostPopup;
