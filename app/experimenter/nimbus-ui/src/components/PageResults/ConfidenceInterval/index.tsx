/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/* istanbul ignore file */
// TODO: EXP-638 remove this ^

import React from "react";

const BUFFER = 5;

const renderBounds = (
  lower: number,
  upper: number,
  leftPercent: number,
  barWidth: number,
  significance: string,
) => (
  <div
    className="position-absolute"
    style={{
      // Add some buffer to space out the rendered bound values.
      left: `${leftPercent - BUFFER * 2}%`,
      width: `${barWidth + BUFFER * 3}%`,
    }}
  >
    <div
      className={`${significance}-significance text-left p-0 h6 font-weight-normal position-absolute`}
    >
      {lower}%
    </div>
    <div
      className={`${significance}-significance text-right p-0 h6 font-weight-normal`}
    >
      {upper}%
    </div>
  </div>
);

const renderLine = (
  leftPercent: number,
  barWidth: number,
  significance: string,
) => (
  <>
    <div className="position-absolute border-bottom border-dark border-3 w-100" />
    <div
      className={`${significance} position-absolute md-4 ml-md-auto py-2 mt-n2`}
      style={{
        left: `${leftPercent}%`,
        width: `${barWidth}%`,
      }}
    />
  </>
);

const ConfidenceInterval: React.FC<{
  upper: number;
  lower: number;
  range: number;
  significance: string;
}> = ({ upper, lower, range, significance }) => {
  range += BUFFER;
  const fullWidth = range * 2;
  const barWidth = ((upper - lower) / fullWidth) * 100;
  const leftPercent = (Math.abs(lower - range * -1) / fullWidth) * 100;

  const bounds = renderBounds(
    lower,
    upper,
    leftPercent,
    barWidth,
    significance,
  );
  const line = renderLine(leftPercent, barWidth, significance);

  return (
    <div className="container">
      <div className="row w-100 float-right position-relative">{bounds}</div>

      <div
        className="row w-50 float-right mt-4"
        data-testid={`${significance}-block`}
      >
        <div className="position-absolute border-left border-dark border-3 py-2 mt-2" />
      </div>

      <div className="row w-100 float-right position-relative mt-2">{line}</div>
      <div className="row w-100 float-right h6">
        <div className="col d-flex justify-content-center mt-3">control</div>
      </div>
    </div>
  );
};

export default ConfidenceInterval;
