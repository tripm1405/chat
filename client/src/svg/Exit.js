import React from 'react';

function Exit(props) {
  return (
    <svg width={props.width || '20px'} height={props.height || '20px'} viewBox="0 0 512.000000 512.000000">
      <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)" fill={props.fill || '#FFFFFF'} stroke="none">
        <path d="M552 5109 c-259 -34 -478 -230 -536 -479 -14 -57 -16 -307 -16 -2070
        0 -2225 -5 -2063 68 -2210 50 -103 168 -221 272 -273 154 -76 83 -72 1230 -72
        804 0 1033 3 1061 13 41 14 93 62 117 106 10 20 16 55 17 96 0 85 -34 147
        -103 187 l-47 28 -1020 5 c-935 5 -1023 6 -1051 22 -44 24 -91 81 -103 125
        -15 53 -15 3893 0 3946 12 44 59 101 103 125 28 16 116 17 1051 22 l1020 5 47
        28 c69 40 103 102 103 187 -1 71 -15 107 -62 154 -63 65 2 61 -1093 62 -547 1
        -1024 -2 -1058 -7z"/>
        <path d="M3525 4031 c-22 -10 -51 -29 -64 -41 -58 -56 -77 -168 -42 -245 12
        -28 162 -183 485 -502 l467 -463 -1258 -2 -1258 -3 -40 -22 c-77 -41 -115
        -105 -115 -193 0 -88 38 -152 115 -193 l40 -22 1258 -3 1258 -2 -467 -463
        c-323 -319 -473 -474 -485 -502 -35 -77 -16 -189 42 -245 62 -59 167 -76 247
        -40 62 28 1374 1326 1396 1381 20 50 20 128 0 178 -22 55 -1334 1353 -1396
        1381 -54 25 -131 25 -183 1z"/>
      </g>
    </svg>
  );
}

export default Exit;