import { useLocation } from 'react-router-dom';

function Recipe() {
  const location = useLocation();
  const { ingredientList } = location.state;
  console.log(ingredientList);

  return <div>레시피</div>;
}

export default Recipe;
