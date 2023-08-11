import { Link } from '@mui/material'
import { useState } from 'react';

interface Props {
    items: string[];
    checked?: string[];
    onChange: (items: string[]) => void;
}

const TagList = ({items,checked,onChange}: Props) => {

    const [checkedItems,setCheckedItems] = useState(checked || [])

    function handleChecked(value: string) {
      const currentIndex = checkedItems.findIndex((item: any) => item.tagID === value);
      let newChecked: string[];
  
      if (currentIndex === -1) {
          // If the clicked item is not already in checkedItems, replace the array with the new value
          newChecked = [value];
      } else {
          // If the clicked item is already in checkedItems, remove it from the array
          newChecked = [];
      }
  
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