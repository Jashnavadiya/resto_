import React, { useEffect, useState } from 'react';
import Popup from '../components/Popup';
import axios from 'axios'
import toast from 'react-hot-toast';
import './designpage.css'

const DesignPage = () => {


  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [items, setItems] = useState([]);

  const [maincategory, setMaincategory] = useState([]
  //   [{
  //   name: 'indian',
  //   subcategory: [{ name: "hi", items: [{ name: 'hi1' }, { name: 'hi2' }] }, { name: "hi1", items: [{ name: 'hi3' }, { name: 'hi4' }] }]
  // },
  // {
  //   name: 'italians',
  //   subcategory: [{ name: "hi2", items: [{ name: 'hi5' }, { name: 'hi6' }] }, { name: "hi3", items: [{ name: 'hi7' }, { name: 'hi8' }] }]

  // }]
)

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  const [showCategoryPopup, setShowCategoryPopup] = useState(false);
  const [showSubCategoryPopup, setShowSubCategoryPopup] = useState(false);
  const [showItemPopup, setShowItemPopup] = useState(false);

  const [newCategory, setNewCategory] = useState('');
  const [newSubCategory, setNewSubCategory] = useState('');
  const [itemDetails, setItemDetails] = useState({
    name: '',
    description: '',
    images: ""
  });

  const [editingCategoryIndex, setEditingCategoryIndex] = useState(null);
  const [editingSubCategoryIndex, setEditingSubCategoryIndex] = useState(null);
  const [editingItemIndex, setEditingItemIndex] = useState(null);

  const handleAddCategory = () => {
    setNewCategory('');
    setEditingCategoryIndex(null);
    setShowCategoryPopup(true);
  };

  const handleAddSubCategory = () => {
    setNewSubCategory('');
    setEditingSubCategoryIndex(null);
    setShowSubCategoryPopup(true);
  };

  const handleAddItem = () => {
    setItemDetails({
      name: '',
      description: '',
      images: ""
    });
    setEditingItemIndex(null);
    setShowItemPopup(true);
  };

  const handleEditCategory = (index) => {
    setNewCategory(categories[index]);
    setEditingCategoryIndex(index);
    setShowCategoryPopup(true);
  };

  const handleEditSubCategory = (index) => {
    setNewSubCategory(subCategories[index]);
    setEditingSubCategoryIndex(index);
    setShowSubCategoryPopup(true);
  };

  
  const handleEditItem = (index) => {
    console.log(items[index]);
    
    setItemDetails({
      name: items[index].name,
      description: items[index].description, // Populate if available
      images: items[index].images
    });
    setEditingItemIndex(index);
    setShowItemPopup(true);
  };

  const handleSaveCategory = async() => {
    if (newCategory.trim()) {
      if (editingCategoryIndex !== null) {
        const updatedCategories = [...categories];
        updatedCategories[editingCategoryIndex].name = newCategory ;
        let response=await axios.put(`http://localhost:5000/api/v1/category/${updatedCategories[editingCategoryIndex]._id}/updateCategory`,
          {...updatedCategories[editingCategoryIndex],name:newCategory})
          toast.success('category suceesfully edited');
          setCategories(prevCategories => {
            const updatedCategories = [...prevCategories];
            updatedCategories[editingCategoryIndex] = response.data;
            return updatedCategories;
        });
        setEditingCategoryIndex(null);
      } else {
        let response=await axios.post('http://localhost:5000/api/v1/category/createCategory',{
          name: newCategory,
          subcategory: []
        })
        
        setCategories([...categories, response.data]);
        toast.success('category suceesfully added')
      }
      setNewCategory('');
      setShowCategoryPopup(false);
    }
  };

  const handleSaveSubCategory = async() => {
    if (newSubCategory.trim()) {
      if (editingSubCategoryIndex !== null) {
        const updatedSubCategories = [...subCategories];
        // updatedSubCategories[editingSubCategoryIndex].name = newSubCategory;
        let response=await axios.put(`http://localhost:5000/api/v1/category/${selectedCategory._id}/subcategories/${updatedSubCategories[editingSubCategoryIndex]._id}`,{...updatedSubCategories[editingSubCategoryIndex],name:newSubCategory})

console.log(editingSubCategoryIndex);
      setSubCategories(response.data.subcategories);
        setEditingSubCategoryIndex(null);
      } else {
        let response=await axios.post(`http://localhost:5000/api/v1/category/${selectedCategory._id}/createsubcategories`,{ name: newSubCategory, items: [] })
        console.log(response.data);
        
       setSubCategories([...subCategories,response.data]);
      
      }
      setNewSubCategory('');
      setShowSubCategoryPopup(false);
    }
  };

    const handleSaveItem = async() => {
      if (itemDetails.name.trim()) {
        if (editingItemIndex !== null) {
          const updatedItems = [...items];
          console.log(itemDetails,updatedItems[editingItemIndex]);
          
          let response=await axios.put(`http://localhost:5000/api/v1/category/${selectedCategory._id}/subcategories/${selectedSubCategory._id}/items/${updatedItems[editingItemIndex]._id}`,itemDetails);
          let [hiiii]=[...response.data.subcategories.filter((ele)=>ele.name === selectedSubCategory.name)]
          console.log(hiiii.items);
          
          setItems(hiiii.items);
          setEditingItemIndex(null);
        } else {
          
          let response= await axios.post(`http://localhost:5000/api/v1/category/${selectedCategory._id}/subcategories/${selectedSubCategory._id}/createitems`,itemDetails)
          console.log(response.data);
          
          
          setItems([...items,response.data]);
        }
        setShowItemPopup(false);
      }
    };

  const handleRemoveCategory = async(index,_id) => {
    const updatedCategories = [...categories];
    updatedCategories.splice(index, 1);
    setCategories(updatedCategories);
    await axios.delete(`http://localhost:5000/api/v1/category/deleteCategory/${_id}`)
  };

  const handleRemoveSubCategory = async (index, _id) => {
    try {
      // Make the delete request first
      await axios.delete(`http://localhost:5000/api/v1/category/${selectedCategory._id}/subcategory/${_id}/del`);
      console.log(`http://localhost:5000/api/v1/category/${selectedCategory._id}/subcategory/${_id}/del`);
      
      // If the request is successful, update the state
      const updatedSubCategories = [...subCategories];
      updatedSubCategories.splice(index, 1);
      setSubCategories(updatedSubCategories);
    } catch (error) {
      console.error('Error deleting subcategory:', error);
      // Optionally show an error message to the user
    }
  };
  
  const handleRemoveItem = async(index,_id) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
    await axios.delete(`http://localhost:5000/api/v1/category/${selectedCategory._id}/subcategory/${selectedSubCategory._id}/item/${_id}/del`)
  };

  const handleChangeItemDetail = (field, value) => {
    setItemDetails({ ...itemDetails, [field]: value });
  };

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    const imageUrls = files.map(file => {
      const reader = new FileReader();
      return new Promise((resolve) => {
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(file);
      });
    });
    Promise.all(imageUrls).then(urls => {
      setItemDetails(prev => ({ ...prev, images: urls }));
    });
  };


  useEffect(() => {
    if (selectedCategory) {
      let hi = categories.filter((ele) => ele.name == selectedCategory.name);
      if (hi.length > 0) {
        setSubCategories(hi[0].subcategories)
        setSelectedSubCategory(null)
      }
     
    }
    else {
    }

  }, [selectedCategory])

  useEffect(() => {
    if(selectedSubCategory){
      const heliso1 = subCategories.filter((ele) => ele.name == selectedSubCategory.name)
    if (heliso1.length > 0) {
      setItems(heliso1[0].items)
      
    }
    }
    
    
  }, [selectedSubCategory])

 
  useEffect(() => {
    
  const hi=async()=>{
    let data=await axios.get('http://localhost:5000/api/v1/category/getAllCategories')
    await setCategories(data.data)
  }
  hi()
    if (maincategory) {
      
    }
    
  }, [])
  
  useEffect(() => {
    if (subCategories&&selectedCategory) {
      setCategories(categories.map(category =>
        category.name === selectedCategory.name
          ? { ...category,  subcategories: subCategories }
          : category
      ));
    }
  }, [subCategories])



  useEffect(() => {
    if (selectedSubCategory && selectedCategory) {
      setCategories(categories.map(category =>
        category.name === selectedCategory.name
          ? {
              ...category,
              subcategories: category.subcategories.map(sub =>
                sub.name === selectedSubCategory.name
                  ? { ...sub, items: items }
                  : sub
              )
            }
          : category
      ));
    }
    if(items&&selectedSubCategory){
      setSubCategories(subCategories.map(subcategory =>
        subcategory.name === selectedSubCategory.name
          ? { ...subcategory,  items: items }
          : subcategory
      ));
    }
  }, [items]);
  
 

  useEffect(() => {
    console.log(subCategories, categories, items);
    console.log(maincategory);
    setMaincategory(categories)
  }, [subCategories, categories, items])
  
  return (
    <div className="app-container">
      {/* Category Section */}
      <div className="category-container">
        <div className="header">
          <h3>Category</h3>
          <button onClick={handleAddCategory} className="add-btn">Add +</button>
        </div>
        <ul>
          {categories.map((category, index) => (
            <li
              key={index}
              className={selectedCategory === category ? 'selected' : ''}
              onClick={() => setSelectedCategory(category)}
            >
              <span>{category.name}</span>
              <div>
                <button
                  className="edit-btn"
                  onClick={(e) => { e.stopPropagation(); handleEditCategory(index,category._id); }}
                >✏️</button>
                <button
                  className="remove-btn"
                  onClick={(e) => { e.stopPropagation(); handleRemoveCategory(index,category._id); }}
                >🗑️</button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* SubCategory Section */}
      <div className="subcategory-container">
        {
          selectedCategory == null ? "Please Select An Category First" : <>
            <div className="header">
              <h3>Sub Category</h3>
              <button onClick={handleAddSubCategory} className="add-btn">Add +</button>
            </div>
            <ul>
              {subCategories && subCategories.map((subCategory, index) => (
                <li
                  key={index}
                  className={selectedSubCategory === subCategory ? 'selected' : ''}
                  onClick={() => setSelectedSubCategory(subCategory)}
                >
                  
                  <span>{subCategory.name}</span>
                  <div>
                    <button
                      className="edit-btn"
                      onClick={(e) => { e.stopPropagation(); handleEditSubCategory(index); }}
                    >✏️</button>
             
                    <button
                      className="remove-btn"
                      onClick={(e) => { e.stopPropagation(); handleRemoveSubCategory(index,subCategory._id); }}
                    >🗑️</button>
                  </div>
                </li>
              ))}
            </ul>
          </>
        }
      </div>

      {/* Items Section */}
      <div className="item-container">
        {
          selectedSubCategory == null ? "Please Selcet Subcategory first" : <>
            <div className="header">
              <h3>Items</h3>
              <button onClick={handleAddItem} className="add-btn">Add +</button>
            </div>
            <ul>
              {items.map((item, index) => (
                <li
                  key={index}
                  className={selectedItem === item ? 'selected' : ''}
                  onClick={() => setSelectedItem(item)}
                >
                  <span>{item.name}</span>
                  <div>
                    <button
                      className="edit-btn"
                      onClick={(e) => { e.stopPropagation(); handleEditItem(index); }}
                    >✏️</button>
                    <button
                      className="remove-btn"
                      onClick={(e) => { e.stopPropagation(); handleRemoveItem(index,item._id); }}
                    >🗑️</button>
                  </div>
                </li>
              ))}
            </ul>
          </>
        }
      </div>

      {/* Popups for Adding/Editing */}
      {showCategoryPopup && (
        <Popup
          title={editingCategoryIndex !== null ? "Edit Category" : "Add New Category"}
          onClose={() => setShowCategoryPopup(false)}
        >
          
          <input
            type="text"
            placeholder="Category name"
            value={newCategory.name}
            onChange={(e) => setNewCategory(e.target.value)}
          />
          <button onClick={handleSaveCategory} className="save-btn">Save</button>
          <button onClick={() => setShowCategoryPopup(false)} className="close-btn">Close</button>
        </Popup>
      )}

      {showSubCategoryPopup && (
        <Popup
          title={editingSubCategoryIndex !== null ? "Edit SubCategory" : "Add New SubCategory"}
          onClose={() => setShowSubCategoryPopup(false)}
        >
          <input
            type="text"
            placeholder="SubCategory name"
            value={newSubCategory.name}
            onChange={(e) => setNewSubCategory(e.target.value)}
          />
          <button onClick={handleSaveSubCategory} className="save-btn">Save</button>
          <button onClick={() => setShowSubCategoryPopup(false)} className="close-btn">Close</button>
        </Popup>
      )}

      {showItemPopup && (
        <Popup
          title={editingItemIndex !== null ? "Edit Item" : "Add New Item"}
          onClose={() => setShowItemPopup(false)}
        >
          {console.log(itemDetails)
          }
          <input
            type="text"
            placeholder="Item name"
            value={itemDetails.name}
            onChange={(e) => handleChangeItemDetail('name', e.target.value)}
          />
          <textarea
            placeholder="Description"
            value={itemDetails.description}
            onChange={(e) => handleChangeItemDetail('description', e.target.value)}
          />
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageUpload}
          />
          <div className="image-previews">


            {/* {itemDetails.images.map((image, index) => (
              <div key={index} className="image-preview">
                <img src={image} alt={`Preview ${index}`} style={{ width: '100px', height: 'auto' }} />
              </div>
            ))} */}
          </div>
          <button onClick={handleSaveItem} className="save-btn">Save</button>
          {/* <button onClick={() => setShowItemPopup(false)} className="close-btn">Close</button> */}
        </Popup>
      )}
      {/* <button onClick={checking}>Chekinggggggggggggggggggggggggggggggg</button> */}
    </div>
  );
};

export default DesignPage;






