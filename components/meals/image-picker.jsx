'use client'
import { useRef, useState } from 'react'
import classes from './image-picker.module.css'
import Image from 'next/image'
export default function ImagePicker({ label, name }) {
  const imageInput = useRef()
  const [pickedImage, setPickedImage] = useState(null)
  function pickerHandler() {
    imageInput.current.click()
    // instead of using the ugly input picker btn, we used display none to hide it,
    //  then we created our own customized btn that will trigger a the click
    // on the input element using useRef hook
    // using onClick and/or useRef must be coupled with using use client
  }
  function handleImageChange(event) {
    const file = event.target.files[0] // normally the target files have all files selected, in our file input we are not allowing 'multiple' so we only get one
    if (!file) {
      setPickedImage(null) // if no file selected, reset pickedImage value
      return
    } 
    //! the tricky part:
    const fileReader = new FileReader(); // with the help of the FileReader built into JS, we can read the selected file
    fileReader.readAsDataURL(file) // fileReader in use, this method doesn't return anything, on order to get hold of the data we need fileReader.onload method
    fileReader.onload = () => {
        setPickedImage(fileReader.result) // this is how we get hold of that data
    }
  }
  return (
    <div className={classes.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={classes.controls}>
        <div className={classes.preview}>
            {!pickedImage && <p>No image selected yet.</p>}
            {pickedImage && <Image fill src={pickedImage} alt='The image picked by the user.'/>}
        </div>
        <input
          className={classes.input}
          type='file'
          id={name}
          name={name}
          accept='image/png, image/jpeg'
          // we will only accept files of this format
          ref={imageInput}
          onChange={handleImageChange}
          required
        />
        <button
          className={classes.button}
          type='button'
          onClick={pickerHandler}
        >
          Pick An Image
        </button>
        {/* it's very important to set the type of button to button as the default value is submit which will trigger a form submission */}
      </div>
    </div>
  )
}
