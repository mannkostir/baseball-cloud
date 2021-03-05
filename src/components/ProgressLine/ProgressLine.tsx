import React, { SVGProps } from 'react';

interface IProgressLineProps {
  progressPercents?: number;
}

const ProgressLine = ({
  progressPercents = 100,
  ...props
}: IProgressLineProps & SVGProps<SVGSVGElement>) => {
  return (
    <svg
      className="rc-progress-line "
      viewBox="0 0 100 1"
      preserveAspectRatio="none"
      {...props}
      style={{ height: '4px', maxWidth: '100%' }}
    >
      <path
        className="rc-progress-line-trail"
        d="M 0.5,0.5
           L 99.5,0.5"
        strokeLinecap="round"
        stroke="#eff1f3"
        strokeWidth="1"
        fillOpacity="0"
      ></path>
      <path
        className="rc-progress-line-path"
        d="M 0.5,0.5
           L 99.5,0.5"
        strokeLinecap="round"
        stroke="#ffd01a"
        strokeWidth="1"
        fillOpacity="0"
        style={{
          strokeDasharray: `${progressPercents}, 100px`,
          strokeDashoffset: '0px',
          transition:
            'stroke-dashoffset 0.3s ease 0s, stroke-dasharray 0.3s ease 0s, stroke 0.3s linear 0s, 0.06s',
        }}
      ></path>
    </svg>
  );
};

export default ProgressLine;
