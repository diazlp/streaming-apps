import _ from "lodash";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "../../HOC";
import { fetchStream, editStream } from "../../actions";
import StreamForm from "./StreamForm";

const StreamEdit = ({ params, stream, editStream, fetchStream }) => {
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

  const onSubmit = (formValues) => {
    editStream(params.id, formValues);
  };

  if (!stream) {
    return <div>Loading... </div>;
  }
  return (
    <div>
      <h3>Edit a Stream</h3>
      {/* initialValues={props.stream} */}
      <StreamForm
        initialValues={_.pick(stream, "title", "description")}
        onSubmit={onSubmit}
      />
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    stream: state.streams[ownProps.params.id],
  };
};

const mapDispatchToProps = {
  editStream,
  fetchStream,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(StreamEdit)
);
