import useCountHook from "./useCountHook";

const Count = () => {
  const { count, increase, decrease } = useCountHook();
  return (
    <>
      <button onClick={increase} className="btn-increase">
        Increase
      </button>
      <button onClick={decrease} className="btn-decrease">
        Decrease
      </button>
      <div className="count-display">{count}</div>
    </>
  );
};

export default Count;
