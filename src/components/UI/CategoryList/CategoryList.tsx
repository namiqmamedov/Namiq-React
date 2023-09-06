import { Link } from '@mui/material'
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface Props {
    items: string[];
    checked?: string[];
    onChange: (items: string[]) => void;
}

const updateDocumentTitle = (newTitle:string) => {
  document.title = newTitle;
};

const CategoryList = ({items,checked,onChange}: Props) => {
    const [checkedItems,setCheckedItems] = useState(checked || [])

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
      const urlParams = new URLSearchParams(location.search);
      const categoryIDs = urlParams.getAll('category');

      
      if(categoryIDs.length > 0) {
        setCheckedItems(categoryIDs);
        const categoryTitle = urlParams.get('category');
        updateDocumentTitle(`${categoryTitle} | Namiq`)
      }
  }, [location]);

  function handleChecked(value: string) {
      const urlParams = new URLSearchParams(location.search);
      
      if (checkedItems.includes(value)) {
          urlParams.delete('category');
          setCheckedItems([]);
      } else {
          urlParams.delete('tag');
          urlParams.delete('category');
          urlParams.append('category', value);
          setCheckedItems([value]);
      }

      const categoryParam = urlParams.get('category') ? `category=${urlParams.get('category')}` : '';

      const newURL = `/?${categoryParam}`;
  
      navigate(newURL);
      
      onChange(urlParams.getAll('category'));

        const categoryTitle = urlParams.get('category');
        updateDocumentTitle(categoryTitle ? `${categoryTitle} | Namiq` : "Hack 'em all");
  }

  return (
    <div className="category__item flex flex-column">
    {items.map((item:any) => (
      <Link
        onClick={() => handleChecked(item.categoryName)}
        key={item.categoryID}
        className={`hover-text ${
          checkedItems.includes(item.categoryName) ? 'active' : '' 
        }`}
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