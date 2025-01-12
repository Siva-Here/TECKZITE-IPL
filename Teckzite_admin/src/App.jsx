
import AddTeam from './Pages/AddTeam'
import Login from './Pages/Login'
import Carousel from './Pages/Carousel';
import Homepage from './Pages/Homepage';
const images = [
  'https://cdn.siasat.com/wp-content/uploads/2020/02/Royal-Challengers-Bangalore.jpg',
 'https://wallpapercave.com/wp/wp4166466.jpg',
 'https://th.bing.com/th/id/OIP.Do9YjX3cnThK3R1EiwP7mwHaFj?rs=1&pid=ImgDetMain',
 'https://th.bing.com/th/id/OIP.8nbexGYH865s1maVpPOf9gHaEK?rs=1&pid=ImgDetMain',
 'https://play-lh.googleusercontent.com/zJo5zcc3EF4DmdMDMj4CTqppNa5XyRFvw6t0ZFE-ucmPS5qBRcughNUTOCJoH-wnbQ',
];

const App = () => {
  return (
    // <Carousel images={images} interval={3000}/>
    <Homepage/>
  )
}

export default App