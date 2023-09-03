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
      const tagIDs = urlParams.getAll('tag');

      setCheckedItems(tagIDs);
  }, [location]);

  function handleChecked(value: string) {
    const urlParams = new URLSearchParams(location.search);

    if (checkedItems.includes(value)) {
        urlParams.delete('tag');
        setCheckedItems([]);
    } else {
        urlParams.delete('tag');
        urlParams.delete('category');
        urlParams.append('tag', value);
        setCheckedItems([value]);
    }

    const tagParam = urlParams.get('tag') ? `tag=${urlParams.get('tag')}` : '';

    // Yeni URL oluşturun
    const newURL = `/?${tagParam}`;

    // Yeni URL'ye yönlendirin
    navigate(newURL);
    
    onChange(urlParams.getAll('tag'));
}

  return (
    <div className="tag__item flex flex-wrap gap-1">
    {items.map((item:any) => (
      <Link
        onClick={() => handleChecked(item.tagName) }
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