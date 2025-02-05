// const SoldSVG = ({ name, team ,color}) => {
  
//   return (
//     <div  className="bounce-top"   style={{
     
//       justifyContent: 'center',
//       alignItems: 'center',
//       height: '100vh',
//       zIndex:9999
//     }}>
//       <svg width="154" height="154">
//         <circle cx="66" cy="66" r="65" fill="none" stroke={color} strokeWidth="2" />
//         <circle cx="66" cy="66" r="65" fill="none" stroke={color} strokeWidth="2" />
//         <circle cx="66" cy="66" r="48" fill="none" stroke={color} strokeWidth="1" />
//         <circle cx="66" cy="66" r="46" fill="none" stroke={color} strokeWidth="1" />
//         <defs>
//           <path id="text-path" d="M66 126A60 60 0 1 0 66 6a60 60 0 0 0 0 120" fill="none"/>
//         </defs>
//         <text dominantBaseline="middle" textAnchor="middle" x="50%" y="50%"  fontSize="25" fontWeight="600" fill="none" stroke={color} strokeWidth="2">
//           Sold by {team}
//         </text>
//         <text>
//           <textPath href="#text-path" fontFamily="Manrope3-ExtraBold, Manrope3" fontSize="10" fontWeight="600" fill={color} letterSpacing="2.14">
//             ★ {team} ★ TECKZITE IPL AUCTION ★ &nbsp; &nbsp; &nbsp;{name}
//           </textPath>
//         </text>
//       </svg>
//     </div>
//   );
// };

// export default SoldSVG;
const SoldSVG = ({ name, team, color }) => {
    return (
      <div
        className="bounce-top"
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
            Sold by {team}
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
  