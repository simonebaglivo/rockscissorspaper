// Importing: Router.
import { useNavigate } from "react-router-dom";

// Importing: Dependencies.
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Importing: Fontawesome icons.
import { faHome } from "@fortawesome/free-solid-svg-icons";

export default function BackHomeButton() {
  const navigate = useNavigate();

  return (
    <>
      <button className="foobar__button" onClick={() => navigate("/")}>
        <FontAwesomeIcon icon={faHome} style={{ marginRight: 10 }} /> TORNA ALLA
        HOME
      </button>
    </>
  );
}
