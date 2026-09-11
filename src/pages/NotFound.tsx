import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const NotFound = () => (
  <main className="not-found">
    <span>404</span>
    <p className="eyebrow eyebrow-light"><span />PAGE NOT FOUND</p>
    <h1>This path does not lead to a machine.</h1>
    <p>The page may have moved, or the address may be incomplete.</p>
    <Link to="/" className="button button-accent"><ArrowLeft />Return home</Link>
  </main>
);

export default NotFound;
