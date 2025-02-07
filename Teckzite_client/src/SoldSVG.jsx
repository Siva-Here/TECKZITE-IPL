const SoldSVG = ({ name, team, color }) => {
    return (
      <div
        className="puff-in-center"
        style={{
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          zIndex: 9999,
        }}
      >
        <svg width="200" height="200">
          <circle cx="100" cy="100" r="90" fill="none" stroke={color} strokeWidth="3" />
          <circle cx="100" cy="100" r="85" fill="none" stroke={color} strokeWidth="2" />
          <circle cx="100" cy="100" r="64" fill="none" stroke={color} strokeWidth="2" />
          <circle cx="100" cy="100" r="60" fill="none" stroke={color} strokeWidth="1" />
          <defs>
            <path
              id="text-path"
              d="M100 180A80 80 0 1 0 100 20a80 80 0 0 0 0 160"
              fill="none"
            />
          </defs>
          <text
            dominantBaseline="middle"
            textAnchor="middle"
            x="50%"
            y="50%"
            fontSize="30"
            fontWeight="700"
            fill="none"
            stroke={color}
            strokeWidth="3"
          >
            {
              team?`sold by ${team}`:"UN SOLD"
            }
          </text>
          <text>
            <textPath
              href="#text-path"
              fontFamily="Manrope3-ExtraBold, Manrope3"
              fontSize="14"
              fontWeight="700"
              fill={color}
              letterSpacing="2.5"
            >
              ★ {team} ★ TECKZITE IPL AUCTION ★ &nbsp; &nbsp; &nbsp;{name}
            </textPath>
          </text>
        </svg>
      </div>
    );
  };
  
  export default SoldSVG;
  