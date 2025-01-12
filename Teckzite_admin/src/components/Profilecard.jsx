// import React from 'react';
// import styled from 'styled-components';

// // Styled component
// const Card = styled.div`
//   width: 350px; /* Reduced size */
//   height: auto;
//   margin-inline: auto;
//   border: 3px solid transparent;
//   background: linear-gradient(#ff00ff, black) border-box; /* Purple & Black Border */
//   border-radius: 15px; /* Reduced border radius */
//   padding: 15px;
//   background-clip: padding-box, border-box;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: flex-start;
// `;

// const CardImage = styled.img`
//   width: 120px; /* Smaller image size */
//   height: 120px;
//   border-radius: 50%;
//   object-fit: cover;
//   border: 3px solid #ff00ff; /* Adjusted border */
//   margin-bottom: 15px;
// `;

// const CardTitle = styled.h2`
//   font-weight: 700;
//   font-size: 1.4rem; /* Reduced font size */
//   color: #fff;
//   margin-bottom: 8px;
//   text-align: center;
// `;

// const CardSubtitle = styled.p`
//   font-size: 0.9rem; /* Reduced font size */
//   color: rgba(255, 255, 255, 0.8);
//   margin-bottom: 15px;
//   text-align: center;
// `;

// const ContainerCard = styled.div`
//   background: #222222; /* Dark background for the details */
//   border-radius: 10px; /* Reduced border radius */
//   padding: 15px;
//   color: white;
//   width: 100%;
//   display: flex;
//   flex-direction: column;
// `;

// const Table = styled.table`
//   width: 100%;
//   border-collapse: collapse;
//   margin-top: 10px;
// `;

// const TableHeader = styled.th`
//   padding: 8px;
//   text-align: left;
//   background-color: #333;
//   color: #ff00ff;
//   font-size: 0.85rem; /* Reduced font size */
// `;

// const TableData = styled.td`
//   padding: 8px;
//   text-align: left;
//   color: white;
//   font-size: 0.85rem; /* Reduced font size */
//   border-bottom: 1px solid #444;
// `;

// const ProfileCard = ({ player }) => {
//   return (
//     <Card>
//       {/* Player Image */}
//       <CardImage src={player.image} alt={player.name} />

//       {/* Player Name */}
//       <CardTitle>{player.name}</CardTitle>

//       {/* Player Role */}
//       <CardSubtitle>{player.role}</CardSubtitle>

//       <ContainerCard>
//         {/* Table for Player Details */}
//         <Table>
//           <thead>
//             <tr>
//               <TableHeader>Detail</TableHeader>
//               <TableHeader>Information</TableHeader>
//             </tr>
//           </thead>
//           <tbody>
//             <tr>
//               <TableData>Nationality</TableData>
//               <TableData>{player.nationality}</TableData>
//             </tr>
//             <tr>
//               <TableData>Age</TableData>
//               <TableData>{player.age}</TableData>
//             </tr>
//             <tr>
//               <TableData>Runs</TableData>
//               <TableData>{player.runs || 'N/A'}</TableData>
//             </tr>
//             <tr>
//               <TableData>Wickets</TableData>
//               <TableData>{player.wickets || 'N/A'}</TableData>
//             </tr>
//             <tr>
//               <TableData>Base Price</TableData>
//               <TableData>${player.basePrice}</TableData>
//             </tr>
//             <tr>
//               <TableData>Strike Rate</TableData>
//               <TableData>{player.strikeRate || 'N/A'}</TableData>
//             </tr>
//             <tr>
//               <TableData>Debut</TableData>
//               <TableData>{player.isDebut ? 'Yes' : 'No'}</TableData>
//             </tr>
//             <tr>
//               <TableData>Sold</TableData>
//               <TableData>{player.isSold ? 'Yes' : 'No'}</TableData>
//             </tr>
//             {player.isSold && (
//               <>
//                 <tr>
//                   <TableData>Sold Team</TableData>
//                   <TableData>{player.soldTeam}</TableData>
//                 </tr>
//                 <tr>
//                   <TableData>Sold Amount</TableData>
//                   <TableData>${player.soldAmount}</TableData>
//                 </tr>
//               </>
//             )}
//           </tbody>
//         </Table>
//       </ContainerCard>
//     </Card>
//   );
// };

// export default ProfileCard;



import React from 'react';
import styled from 'styled-components';

// Styled component
const Card = styled.div`
  width: 350px; /* Default size for larger screens */
  height: auto;
  margin-inline: auto;
  border: 3px solid transparent;
  background: linear-gradient(#ff00ff, black) border-box; /* Purple & Black Border */
  border-radius: 15px; /* Reduced border radius */
  padding: 15px;
  background-clip: padding-box, border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  @media (max-width: 768px) {
    width: 280px; /* Smaller width for tablets */
    padding: 10px;
  }

  @media (max-width: 480px) {
    width: 240px; /* Smaller width for mobile devices */
    padding: 8px;
  }
`;

const CardImage = styled.img`
  width: 120px; /* Default image size */
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #ff00ff;
  margin-bottom: 15px;

  @media (max-width: 480px) {
    width: 100px; /* Smaller image size for mobile */
    height: 100px;
  }
`;

const CardTitle = styled.h2`
  font-weight: 700;
  font-size: 1.4rem; /* Default font size */
  color: #fff;
  margin-bottom: 8px;
  text-align: center;

  @media (max-width: 480px) {
    font-size: 1.2rem; /* Reduced font size for mobile */
  }
`;

const CardSubtitle = styled.p`
  font-size: 0.9rem; /* Default font size */
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 15px;
  text-align: center;

  @media (max-width: 480px) {
    font-size: 0.8rem; /* Reduced font size for mobile */
  }
`;

const ContainerCard = styled.div`
  background: #222222; /* Dark background for the details */
  border-radius: 10px;
  padding: 15px;
  color: white;
  width: 100%;
  display: flex;
  flex-direction: column;

  @media (max-width: 480px) {
    padding: 10px; /* Reduced padding for mobile */
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;

  @media (max-width: 480px) {
    font-size: 0.8rem; /* Smaller font size for mobile */
  }
`;

const TableHeader = styled.th`
  padding: 8px;
  text-align: left;
  background-color: #333;
  color: #ff00ff;
  font-size: 0.85rem;

  @media (max-width: 480px) {
    font-size: 0.75rem; /* Reduced font size for mobile */
  }
`;

const TableData = styled.td`
  padding: 8px;
  text-align: left;
  color: white;
  font-size: 0.85rem;
  border-bottom: 1px solid #444;

  @media (max-width: 480px) {
    font-size: 0.75rem; /* Reduced font size for mobile */
  }
`;

const ProfileCard = ({ player }) => {
  return (
    <Card>
      {/* Player Image */}
      <CardImage src={player.image} alt={player.name} />

      {/* Player Name */}
      <CardTitle>{player.name}</CardTitle>

      {/* Player Role */}
      <CardSubtitle>{player.role}</CardSubtitle>

      <ContainerCard>
        {/* Table for Player Details */}
        <Table>
          <thead>
            <tr>
              <TableHeader>Detail</TableHeader>
              <TableHeader>Information</TableHeader>
            </tr>
          </thead>
          <tbody>
            <tr>
              <TableData>Nationality</TableData>
              <TableData>{player.nationality}</TableData>
            </tr>
            <tr>
              <TableData>Age</TableData>
              <TableData>{player.age}</TableData>
            </tr>
            <tr>
              <TableData>Runs</TableData>
              <TableData>{player.runs || 'N/A'}</TableData>
            </tr>
            <tr>
              <TableData>Wickets</TableData>
              <TableData>{player.wickets || 'N/A'}</TableData>
            </tr>
            <tr>
              <TableData>Base Price</TableData>
              <TableData>${player.basePrice}</TableData>
            </tr>
            <tr>
              <TableData>Strike Rate</TableData>
              <TableData>{player.strikeRate || 'N/A'}</TableData>
            </tr>
            <tr>
              <TableData>Debut</TableData>
              <TableData>{player.isDebut ? 'Yes' : 'No'}</TableData>
            </tr>
            <tr>
              <TableData>Sold</TableData>
              <TableData>{player.isSold ? 'Yes' : 'No'}</TableData>
            </tr>
            {player.isSold && (
              <>
                <tr>
                  <TableData>Sold Team</TableData>
                  <TableData>{player.soldTeam}</TableData>
                </tr>
                <tr>
                  <TableData>Sold Amount</TableData>
                  <TableData>${player.soldAmount}</TableData>
                </tr>
              </>
            )}
          </tbody>
        </Table>
      </ContainerCard>
    </Card>
  );
};

export default ProfileCard;
