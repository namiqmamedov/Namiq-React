import { Link } from '@mui/material'
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import agent from '../../../api/agent';
import { Blog } from '../../../models/blog';

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
  const [blogsNoFilter, setBlogsNoFilter] = useState<Blog[]>([]); 

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

        if (items.some((item:any) => item.categoryName === categoryTitle)) {
        } else {
          navigate('/not-found')
        }      
      }
  }, [location,items]);

  
  useEffect(() => {
    const fetchBlogsNoFilter = async () => {
      try {
        const response = await agent.Blog.listNoFilter();
        setBlogsNoFilter(response);
      } catch (error) {
        console.error('Error fetching blogs without filters:', error);
      }
    };
    
    fetchBlogsNoFilter();
  }, []);


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

      const categoryParam = urlParams.get('category') ? `category=${urlParams.get('category')}` : '';

      const newURL = `/?${categoryParam}`;
  
      navigate(newURL);
      
      onChange(urlParams.getAll('category'));

      const categoryTitle = urlParams.get('category');
      updateDocumentTitle(categoryTitle ? `${categoryTitle} | Namiq` : "Hack 'em all");
  }

  const urlParams = new URLSearchParams(window.location.search);

  const categoryBlogCounts = items?.map((item:any) => {
    const blogCount = blogsNoFilter.filter((blog) => item.categoryID === blog.categoryID).length;
    return { categoryName: item.categoryName, blogCount };
  });

  return (
    <div className="category__item flex flex-column">
    {categoryBlogCounts?.map((item:any) => (
      item.blogCount > 0 && (
        <Link
          onClick={() => handleChecked(item.categoryName)}
          key={item.categoryName}
        >
          <span 
              className={`hover-text ${
                urlParams.has('category') && checkedItems.includes(item.categoryName.replace(/ /g, '-')) ? 'active' : ''
              }`}
          >
            {item.categoryName}
          </span>
          <span className='ml-2'>({item.blogCount})</span>
        </Link>
      )
    ))}
    </div>
  )
}

export default CategoryList