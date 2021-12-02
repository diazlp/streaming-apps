import React, { useEffect, useRef } from "react";
import flv from "flv.js";
import { connect } from "react-redux";
import { withRouter } from "../../HOC";
import { fetchStream } from "../../actions";

const StreamShow = ({ params, stream, fetchStream }) => {
  const videoRef = useRef();

  useEffect(() => {
    fetchStream(params.id);
    const player = flv.createPlayer({
      type: "flv",
      url: `http://localhost:8000/live/${params.id}.flv`,
    });

    player.attachMediaElement(videoRef.current);
    player.load();
    player.play();

    return () => {
      player.destroy();
    };
  }, [params.id, fetchStream]);

  if (!stream) {
    return <div>Wait...</div>;
  }
  return (
    <div>
      <video ref={videoRef} style={{ width: "100%" }} controls />
      <h1>{stream.title}</h1>
      <h5>{stream.description}</h5>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    stream: state.streams[ownProps.params.id],
  };
};

export default withRouter(
  connect(mapStateToProps, { fetchStream })(StreamShow)
);
