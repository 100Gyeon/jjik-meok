import { useLocation } from 'react-router-dom';

function Menu() {
  const location = useLocation();
  const { ingredientList } = location.state;
  console.log(ingredientList);
  return <div>메뉴 추천</div>;
}

export default Menu;
