import videoBg from "../video/waves-bg.mp4";
import "../style/video-bg.scss";

const VideoBG = () => {
  return (
    <>
      <div className="position-absolute top-0 video-bg">
        <video
          src={videoBg}
          autoPlay
          muted
          loop
          id="myVideo"
          className="w-100 z-0 video"
        ></video>
        <div className="position-absolute top-0 w-100 h-100 video-bg-shadow z-index-0"></div>
      </div>
    </>
  );
};

export default VideoBG;
