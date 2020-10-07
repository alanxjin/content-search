import React from "react";
import { Badge } from "react-bootstrap";
import "./List.css";

const List = ({ label, items, variant = "primary" }) => {
  return items.length > 0 ? (
    <div className="list">
      <div className="font-weight-light">{label}</div>
      <span className="items">
        {items.map((item) => (
          <Badge className="item" variant={variant} key={item}>
            {item}
          </Badge>
        ))}
      </span>
    </div>
  ) : (
    ""
  );
};

export default List;
