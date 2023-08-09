import { FormControlLabel,FormGroup ,Checkbox, Link } from '@mui/material'
import { useState } from 'react';

interface Props {
    items: string[];
    checked?: string[];
    onChange: (items: string[]) => void
}

const CategoryList = ({items,checked,onChange}: Props) => {

    const [checkedItems,setCheckedItems] = useState(checked || [])

    function handleChecked(value: string){
        const currentIndex = checkedItems.findIndex(item => item === value);
        let newChecked: string[] = [];
        if(currentIndex ===  -1) newChecked = [...checkedItems, value]
        else newChecked = checkedItems.filter(item => item !== value)

        setCheckedItems(newChecked);
        onChange(newChecked);
    }
  return (
    <div className="category__item flex flex-column">
    {/* <Link to={''}>
     Hacking
     </Link>
     <Link to={''}>
     Humour
     </Link>
     <Link to={''}>
     Lockpicking
     </Link> */}
    <FormGroup>
    {items.map(item => (
      <FormControlLabel 
          control={<Checkbox  checked={checkedItems.indexOf(item) !== -1}
          onClick={() => handleChecked(item)} />} label={item} key={item} 
       />
    ))}
  </FormGroup>
    </div>
  )
}

export default CategoryList