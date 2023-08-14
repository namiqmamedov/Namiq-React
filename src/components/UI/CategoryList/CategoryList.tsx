import { Link } from '@mui/material'
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface Props {
    items: string[];
    checked?: string[];
    onChange: (items: string[]) => void;
}

const CategoryList = ({items,checked,onChange}: Props) => {
    const [checkedItems,setCheckedItems] = useState(checked || [])

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
      const urlParams = new URLSearchParams(location.search);
      const categoryIDs = urlParams.getAll('categoryID');
  
      setCheckedItems(categoryIDs);
    }, [location]);

    function handleChecked(value: string) {
      const currentIndex = checkedItems.indexOf(value);
      let newChecked: string[];
    
      if (currentIndex === -1) {
        newChecked = [value];
      } else {
        newChecked = [value];
      }
  
      const urlParams = new URLSearchParams(location.search);
  
      // Remove any existing categoryID before adding the updated one
      urlParams.delete('categoryID');
      
      newChecked.forEach((item) => urlParams.append('categoryID', item));
    
      navigate({ search: urlParams.toString() });
    
      setCheckedItems(newChecked);
      onChange(newChecked);
  }
  return (
    <div className="category__item flex flex-column">
    {items.map((item:any) => (
      <Link
        onClick={() => handleChecked(item.categoryID)}
        key={item.categoryID}
      >
        {item.categoryName }
        <span className='ml-2'>
        ( {item.count} )
        </span>
      </Link>
    ))}
    </div>
  )
}

export default CategoryList