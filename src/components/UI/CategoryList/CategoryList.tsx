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
      setCheckedItems(categoryIDs);

      if (categoryIDs.length > 0) {
        const categoryTitle = urlParams.get('category')?.replace(/-/g, " ");
        updateDocumentTitle(`${categoryTitle} | Namiq`);
        setCheckedItems(categoryIDs);
      }
  }, [location]);

   function handleChecked(value: string) {
      const urlParams = new URLSearchParams(location.search);
      const formattedValue = value.replace(/\s+/g, '-');

      if (checkedItems.includes(formattedValue)) {
          urlParams.delete('category');
          setCheckedItems([]);
      } else {
          urlParams.delete('category');
          urlParams.delete('tag');
          urlParams.append('category', formattedValue);
          setCheckedItems([formattedValue]);
      }

      const newURL = `/?${urlParams.toString()}`;
  
      navigate(newURL);
      
      onChange(urlParams.getAll('category'));

      const categoryTitle = urlParams.get('category');
      updateDocumentTitle(categoryTitle ? `${categoryTitle} | Namiq` : "Hack 'em all");
  }

  const urlParams = new URLSearchParams(window.location.search);

  return (
    <div className="category__item flex flex-column">
    {items.map((item:any) => (
      <Link
        onClick={() => handleChecked(item.categoryName)}
        key={item.categoryID}
        >
        <span 
        className={`hover-text ${urlParams.has('category') && checkedItems.includes(item.categoryName) ? 'active' : ''}`}
        >{item.categoryName }</span>
        <span className='ml-2'>
        ( {item.count} )
        </span>
      </Link>
    ))}
    </div>
  )
}

export default CategoryList