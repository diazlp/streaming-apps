import { useParams, useLocation, useMatch } from "react-router";

// to pass props with hooks
export const withRouter = (Child) => {
  return (props) => {
    const location = useLocation();
    // const navigate = useNavigate();
    const params = useParams();
    const match = useMatch("/streams/edit/:id");
    return (
      <Child
        {...props}
        params={params}
        // navigate={navigate}
        location={location}
        match={match}
      />
    );
  };
};
