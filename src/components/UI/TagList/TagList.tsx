import { Link } from '@mui/material'
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface Props {
    items: string[];
    checked?: string[];
    onChange: (items: string[]) => void;
}

const TagList = ({items,checked,onChange}: Props) => {

    const [checkedItems,setCheckedItems] = useState(checked || [])

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
      const urlParams = new URLSearchParams(location.search);
      const tagIDs = urlParams.getAll('tagID');
  
      setCheckedItems(tagIDs);
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
      urlParams.delete('tagID');
      
      newChecked.forEach((item) => urlParams.append('tagID', item));
    
      navigate({ search: urlParams.toString() });
    
      setCheckedItems(newChecked);
      onChange(newChecked);
  }
  return (
    <div className="category__item flex gap-1">
    {items.map((item:any) => (
      <Link
        onClick={() => handleChecked(item.tagID)}
        key={item.tagID}
      >
            <span className="badge bg-dark">
            {item.tagName }
            </span>
      </Link>
    ))}
    </div>
  )
}

export default TagList