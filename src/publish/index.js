import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { createBookThunk } from '../thunks/books-thunks';
import { uploadImageThunk } from '../thunks/image-thunks';
import {
  DEFAULT_LOGO_IMAGE,
  GenerateRandomISBN,
  CATEGORIES,
  FormatArrayTexts,
} from '../shared/helpers';

const generateISBN = GenerateRandomISBN();
const PublishComponent = () => {
  const { currentUser } = useSelector((state) => state.users);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [actualImage, setActualImage] = useState(null);
  const [coverImage, setCoverImage] = useState('default-logo.png');
  const isbn = generateISBN;
  const [publisher, setPublisher] = useState('');
  const [categories, setCategories] = useState([]);
  const [publishDate, setPublishDate] = useState('');
  const [categoriesTitle, setCategoriesTitle] = useState(
    'Selected Categories: '
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handlePublishBtn = () => {
    const values = {
      Title: title,
      Description: description,
      'Cover Image': actualImage,
      Publisher: publisher,
      Categories: categories,
      'Publish Date': publishDate,
    };

    let isReturn = false;

    for (const [key, value] of Object.entries(values)) {
      if (value === '' || value === null || value === '' || value === []) {
        toast.warn(`Please enter a value for ${key}!`);
        isReturn = true;
      }
    }

    if (isReturn) {
      return;
    }

    dispatch(uploadImageThunk(actualImage));
    dispatch(
      createBookThunk({
        title,
        author: currentUser._id,
        description,
        coverImage,
        isbn,
        publisher,
        categories,
        publishDate,
      })
    );

    navigate('/profile');
  };
  return (
    <>
      <div className="d-flex justify-content-center align-items-center pe-0 pt-1 mt-1 pb-2">
        <img src={DEFAULT_LOGO_IMAGE} alt="" width={100} height={100} />
      </div>
      <div className="d-flex justify-content-center align-items-center pt-1 pb-2">
        <div className="row w-50 container-fluid border p-3 pb-1 border-dark rounded">
          <div className="form-group ps-0 pe-0">
            <h6>Title</h6>
            <input
              className="form-control"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              placeholder="Your Book's Title"
              name="title"
              required
            />
          </div>

          <div className="form-group pt-4 ps-0 pe-0">
            <h6>Description</h6>
            <input
              className="form-control"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              type="text"
              placeholder="Short Description of your Book"
              name="description"
              required
            />
          </div>

          <div className="form-group pt-4 ps-0 pe-0">
            <h6>Publisher</h6>
            <input
              className="form-control"
              value={publisher}
              onChange={(e) => setPublisher(e.target.value)}
              type="text"
              placeholder="Publisher"
              name="publisher"
              required
            />
          </div>

          <div className="form-group pt-4 ps-0 pe-0">
            <h6>Publish Date</h6>
            <input
              className="form-control"
              value={publishDate}
              onChange={(e) => setPublishDate(e.target.value)}
              type="date"
              placeholder="Publish Date"
              name="publish-date"
            />
          </div>

          <div className="form-group pt-4 ps-0 pe-0">
            <p className="fs-6 text-md-start">{categoriesTitle}</p>
            <select
              className="form-select"
              onChange={(e) => {
                categories.push(e.target.value);
                setCategories(categories);
                setCategoriesTitle(
                  `Selected Categories: ${FormatArrayTexts(categories)}`
                );
              }}
              defaultValue={CATEGORIES[0]}
            >
              {CATEGORIES.map((category, idx) => (
                <option key={idx} value={category.toUpperCase()}>
                  {category.toUpperCase()}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group pt-4 ps-0 pe-0">
            <h6>Cover Image</h6>
            <form encType="multipart/form-data">
              <input
                className="form-control"
                type="file"
                name="displayImage"
                onChange={(e) => {
                  setActualImage(e.target.files[0]);
                  setCoverImage(e.target.files[0].name);
                }}
              />
            </form>
          </div>
          <div className="form-group pt-4 ps-0 pe-0 justify-content-center text-center">
            <h5> Your ISBN: {isbn}</h5>
          </div>
          <div className="form-group pt-4 ps-0 pe-0 justify-content-center text-center">
            <div className="pb-2">
              <button
                type="button"
                className="btn btn-primary"
                onClick={handlePublishBtn}
              >
                Add Book
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PublishComponent;
