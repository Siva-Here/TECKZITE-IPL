const SoldSVG = ({ name, team }) => {
  return (
    <div style={{
     
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      zIndex:9999
    }}>
      <svg width="132" height="132">
        <circle cx="66" cy="66" r="65" fill="none" stroke="#C8102E" strokeWidth="2" />
        <circle cx="66" cy="66" r="65" fill="none" stroke="rgb(200,16,46)" strokeWidth="2" />
        <circle cx="66" cy="66" r="48" fill="none" stroke="#C8102E" strokeWidth="1" />
        <circle cx="66" cy="66" r="46" fill="none" stroke="#C8102E" strokeWidth="1" />
        <defs>
          <path id="text-path" d="M66 126A60 60 0 1 0 66 6a60 60 0 0 0 0 120" fill="none"/>
        </defs>
        <text dominantBaseline="middle" textAnchor="middle" x="50%" y="58%" fontFamily="Manrope3-ExtraBold, Manrope3" fontSize="40" fontWeight="600" fill="none" stroke="#C8102E" strokeWidth="2">
          Sold
        </text>
        <text>
          <textPath href="#text-path" fontFamily="Manrope3-ExtraBold, Manrope3" fontSize="10" fontWeight="600" fill="#C8102E" letterSpacing="2.14">
            ★ {team} ★ TECKZITE IPL AUCTION ★ RCB ★&nbsp; &nbsp; &nbsp;{name}
          </textPath>
        </text>
      </svg>
    </div>
  );
};

export default SoldSVG;
