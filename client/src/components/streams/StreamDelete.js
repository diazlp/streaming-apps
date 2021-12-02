import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Modal from "../Modal";
import StreamList from "./StreamList";
import { fetchStream, deleteStream } from "../../actions";
import { withRouter } from "../../HOC";

const StreamDelete = ({ params, stream, fetchStream, deleteStream }) => {
  const navigate = useNavigate();
  const [dependency, setDependency] = useState(null);
  const [debounceDependency, setDebounceDependency] = useState(params);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebounceDependency(params);
    }, 500);

    return () => {
      clearTimeout(timerId);
    };
  }, [params]);

  useEffect(() => {
    const fetchDependency = async () => {
      await setDependency(debounceDependency);
    };
    fetchDependency();
    fetchStream(params.id);
  }, [params.id, fetchStream, debounceDependency, dependency]);

  const onDelete = () => {
    deleteStream(params.id);
    navigate("/");
  };

  const actions = () => (
    <React.Fragment>
      <button onClick={() => onDelete()} className="ui button negative">
        Delete
      </button>
      <Link to="/" className="ui button">
        Cancel
      </Link>
    </React.Fragment>
  );

  const renderContent = () => {
    if (!stream) {
      return "Are you sure you want to delete this stream?";
    }

    return `Are you sure you want to delete this stream with title: ${stream.title}`;
  };

  return (
    <div>
      <StreamList />
      <Modal
        title="Delete Stream"
        content={renderContent()}
        actions={actions}
        onDismiss={() => navigate("/")}
      />
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    stream: state.streams[ownProps.params.id],
  };
};

export default withRouter(
  connect(mapStateToProps, { fetchStream, deleteStream })(StreamDelete)
);
