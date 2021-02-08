import React from "react";
import Svg from "../../Svg/svg";

const Trails = ({ trails }) => {
  const totalTrails = trails.black + trails.red + trails.blue;

  return (
    <>
      {totalTrails === 0 && <>Empty show website</>}
      {trails.blue > 0 && (
        <>
          <Svg name="blueRun" /> {trails.blue}
        </>
      )}
      {trails.red > 0 && (
        <>
          <Svg name="redRun" /> {trails.red}
        </>
      )}
      {trails.black > 0 && (
        <>
          <Svg name="blackRun" /> {trails.black}
        </>
      )}
    </>
  );
};

export default Trails;
