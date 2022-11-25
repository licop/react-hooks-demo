// 使用 render props 模式重用 UI 逻辑
// render props是react开发中非常重要的设计模式
// render props 就是把一个 render 函数作为属性传递给某个组件，由这个组件去执行这个函数从而 render 实际的内容。

import { Popover } from "antd";
import data from "./data";

function ListWithMore({ renderItem, data = [], max }) {
  const elements = data.map((item, index) => renderItem(item, index, data));
  const show = elements.slice(0, max);
  const hide = elements.slice(max);
  return (
    <span className="exp-10-list-with-more">
      {show}
      {hide.length > 0 && (
        <Popover content={<div style={{ maxWidth: 500 }}>{hide}</div>}>
          <span className="more-items-wrapper">
            and{" "}
            <span className="more-items-trigger"> {hide.length} more...</span>
          </span>
        </Popover>
      )}
    </span>
  );
}

export default () => {
  return (
    <div className="exp-10-list-with-more">
      <h1>User Names</h1>
      <div className="user-names">
        Liked by:{" "}
        <ListWithMore
          renderItem={(user) => {
            return <span className="user-name">{user.name}</span>;
          }}
          data={data}
          max={3}
        />
      </div>
      <br />
      <br />
      <h1>User List</h1>
      <div className="user-list">
        <div className="user-list-row user-list-row-head">
          <span className="user-name-cell">Name</span>
          <span>City</span>
          <span>Job Title</span>
        </div>
        <ListWithMore
          renderItem={(user) => {
            return (
              <div className="user-list-row">
                <span className="user-name-cell">{user.name}</span>
                <span>{user.city}</span>
                <span>{user.job}</span>
              </div>
            );
          }}
          data={data}
          max={5}
        />
      </div>
    </div>
  );
};
