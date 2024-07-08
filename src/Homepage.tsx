// Importing: Hooks.
import { useNavigate } from "react-router-dom";

export default function Homepage() {
  const navigate = useNavigate();

  return (
    <>
      <div className="homepage">
        <button onClick={() => navigate("/foobar")}>FOOBAR</button>
        <button onClick={() => navigate("/rockScissorsPaper")}>
          CARTA
          <br />
          <br />
          <br />
          FORBICE
          <br />
          <br />
          <br />
          SASSO
        </button>
      </div>
    </>
  );
}
