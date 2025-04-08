import './Root.css';

export const Root = ({ children }) => {
  return (
    <div className="Root-container">
      <div className="Root-content">{children}</div>
    </div>
  );
};
