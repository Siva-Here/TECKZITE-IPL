import React from 'react';
import styled from 'styled-components';

// Styled component

const Card = styled.div`
  width: 550px; /* Adjusted size */
  height: auto;
  margin-inline: auto;
  border: 5px solid transparent;
  background: linear-gradient(#ff00ff, black) border-box; /* Purple & Black Border */
  border-radius: 20px;
  padding: 20px;
  background-clip: padding-box, border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

const CardImage = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  object-fit: cover;
  border: 5px solid #ff00ff;
  margin-bottom: 20px;
`;

const CardTitle = styled.h2`
  font-weight: 700;
  font-size: 1.6rem;
  color: #fff;
  margin-bottom: 10px;
  text-align: center;
`;

const CardSubtitle = styled.p`
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 20px;
  text-align: center;
`;

const ContainerCard = styled.div`
  background: #222222; /* Dark background for the details */
  border-radius: 15px;
  padding: 20px;
  color: white;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

const TableHeader = styled.th`
  padding: 10px;
  text-align: left;
  background-color: #333;
  color: #ff00ff;
`;

const TableData = styled.td`
  padding: 10px;
  text-align: left;
  color: white;
  border-bottom: 1px solid #444;
`;

const player = 
  {
    name: 'Virat Kohli',
    nationality: 'India',
    age: 34,
    role: 'Batsman',
    runs: 12000,
    wickets: 0,
    isDebut: false,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Virat_Kohli_portrait.jpg/800px-Virat_Kohli_portrait.jpg',
    basePrice: 100000,
    strikeRate: '150.25',
    isSold: true,
    soldTeam: 'Royal Challengers Bangalore',
    soldAmount: 250000,
  };

const ProfileCard = () => {
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
